// Input sanitization utilities

/**
 * Basic HTML entity escaping to prevent XSS
 */
export function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char] || char);
}

/**
 * Strip potentially dangerous characters from user input
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Validate that input doesn't exceed maximum length
 */
export function validateLength(input: string, maxLength: number): boolean {
  return input.length <= maxLength;
}

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return input.slice(0, maxLength - 3) + '...';
}
