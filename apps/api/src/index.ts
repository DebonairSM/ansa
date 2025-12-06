import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/contact', (req, res) => {
  const schema = z.object({ name: z.string().min(1), email: z.string().email(), message: z.string().min(1) });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });
  return res.json({ ok: true });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API listening on ${port}`));
