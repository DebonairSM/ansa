import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Security: Restrict CORS to allowed origins
const allowedOrigins = [
  'http://localhost:4545',
  'http://localhost:3000',
  'https://ansa-web.onrender.com',
  'https://ansa-brasil.org',
  'https://www.ansa-brasil.org',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Security: Limit request body size
app.use(express.json({ limit: '10kb' }));

// Security: Basic rate limiting (in-memory, use Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per IP

function rateLimit(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return next();
  }

  if (record.count >= RATE_LIMIT_MAX) {
    res.setHeader('Retry-After', Math.ceil((record.resetTime - now) / 1000));
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    });
  }

  record.count++;
  return next();
}

// Security: Remove sensitive headers
app.disable('x-powered-by');

// Security headers middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.get('/health', (_req, res) => res.json({ ok: true }));

// Contact endpoint with rate limiting and validation
app.post('/api/contact', rateLimit, (req, res) => {
  const schema = z.object({
    name: z.string().min(1).max(100).trim(),
    email: z.string().email().max(254),
    subject: z.string().max(200).optional(),
    message: z.string().min(1).max(5000).trim(),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  // TODO: Implement actual email sending or database storage
  // For now, just acknowledge receipt
  console.log('Contact form submission:', {
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject,
    messageLength: parsed.data.message.length,
    timestamp: new Date().toISOString(),
  });

  return res.json({ ok: true, message: 'Message received' });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler - don't expose internal errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API listening on ${port}`));
