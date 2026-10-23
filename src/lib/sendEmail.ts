import { contact } from '../data/site'

export function sendEmail(subject: string, lines: [label: string, value: string][]) {
  const body = lines.map(([label, value]) => `${label}: ${value.trim() || '—'}`).join('\n')
  window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
