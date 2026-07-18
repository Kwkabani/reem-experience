# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability, please report it responsibly.

## Security Measures

### Content Security Policy (CSP)
- Script sources limited to self
- Style sources limited to self and Google Fonts
- Font sources limited to self and Google Fonts.gstatic.com
- Image sources limited to self, threejs.org, and data URIs
- Object sources disabled
- Frame ancestors disabled

### HTTP Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

### Input Validation
- Textarea inputs have maxLength limits
- User input is sanitized before processing
- HTML angle brackets are stripped from input

### Build Security
- No source maps in production
- No debug code in production builds
- Dependencies should be audited before major updates using `npm audit`
