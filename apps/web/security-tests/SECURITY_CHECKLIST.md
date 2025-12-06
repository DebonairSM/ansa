# ANSA Brasil Security Checklist

Pre-deployment security verification for public web deployment.

## How to Run Security Tests

```bash
# Start the application first
cd apps/web && npm run dev

# In another terminal, run the security tests
cd apps/web
node security-tests/run-tests.js http://localhost:4545

# For production testing
node security-tests/run-tests.js https://your-production-url.com
```

## Security Measures Implemented

### 1. Security Headers (next.config.ts)

| Header | Value | Purpose |
|--------|-------|---------|
| X-Content-Type-Options | nosniff | Prevents MIME type sniffing |
| X-Frame-Options | DENY | Prevents clickjacking |
| X-XSS-Protection | 1; mode=block | Legacy XSS protection |
| Referrer-Policy | strict-origin-when-cross-origin | Controls referrer information |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Restricts browser features |
| Content-Security-Policy | See config | Prevents XSS and injection |

### 2. API Security (apps/api/src/index.ts)

- **CORS Restriction**: Only allows requests from specified origins
- **Rate Limiting**: 10 requests/minute per IP on contact endpoint
- **Input Validation**: Zod schema with length limits
- **Body Size Limit**: 10KB maximum request body
- **Error Handling**: Internal errors not exposed to clients
- **Header Security**: X-Powered-By disabled

### 3. Next.js Image Security

- Remote images restricted to trusted domains only
- Prevents SSRF through image loading

## Manual Security Checks

### Before Deployment

- [ ] Environment variables not exposed in client-side code
- [ ] No hardcoded secrets or API keys in source code
- [ ] `.env` files in `.gitignore`
- [ ] HTTPS enforced in production
- [ ] Database credentials properly secured
- [ ] Third-party dependencies updated (`npm audit`)

### After Deployment

- [ ] SSL/TLS certificate valid and properly configured
- [ ] HSTS header active (handled by hosting platform)
- [ ] All security headers present (use securityheaders.com to verify)
- [ ] No sensitive files exposed (/.env, /.git, /package.json)
- [ ] Error pages don't expose stack traces
- [ ] Rate limiting working correctly

## Common Vulnerabilities Tested

| Vulnerability | Status | Notes |
|---------------|--------|-------|
| Path Traversal | Protected | Next.js routing prevents file system access |
| XSS (Cross-Site Scripting) | Protected | React auto-escapes, CSP configured |
| Clickjacking | Protected | X-Frame-Options: DENY |
| CORS Misconfiguration | Fixed | Restricted to allowed origins |
| Rate Limiting | Implemented | 10 req/min on sensitive endpoints |
| Information Disclosure | Protected | Error handling, no directory listing |
| SSRF | Mitigated | Image domains restricted |

## Severity Levels

- **CRITICAL**: Must fix before any deployment
- **HIGH**: Fix before production deployment  
- **MEDIUM**: Should fix, acceptable risk for soft launch
- **LOW**: Nice to have, fix when convenient

## Production Recommendations

1. **Use a CDN** (Cloudflare, Vercel, etc.) for additional DDoS protection
2. **Enable WAF** (Web Application Firewall) if available
3. **Monitor logs** for suspicious activity patterns
4. **Set up alerts** for error rate spikes
5. **Regular dependency updates** via `npm audit fix`
6. **Implement HTTPS-only** redirect at hosting level
7. **Add rate limiting at infrastructure level** (Redis-based for scaling)

## Contact Form Security

The contact form currently simulates submission. Before enabling real submission:

1. Implement CAPTCHA (reCAPTCHA, hCaptcha) to prevent spam
2. Add email verification if storing user data
3. Implement proper email sending with a service (SendGrid, Resend, etc.)
4. Log submissions for audit trail

## Testing Commands

```bash
# Full security test suite
node security-tests/run-tests.js

# Test specific URL
node security-tests/run-tests.js https://ansa-web.onrender.com

# Check npm vulnerabilities
npm audit

# Update vulnerable packages
npm audit fix
```

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:
- Email: associacaonsraa@gmail.com
- Do not disclose publicly until fixed

