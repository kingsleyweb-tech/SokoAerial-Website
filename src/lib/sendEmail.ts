import { contact } from '../data/site'

/**
 * The site has no form backend, so forms prepare an email to Sigtrack in the
 * visitor's mail app containing what they entered.
 */
export function sendEmail(subject: string, lines: [label: string, value: string][]) {
  const body = lines.map(([label, value]) => `${label}: ${value.trim() || '—'}`).join('\n')
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
