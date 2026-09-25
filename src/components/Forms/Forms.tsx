import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { contact, paths } from '../../data/site'
import styles from '../../styles/Forms.module.css'

interface SentenceInputProps {
  name: string
  label: string
  placeholder: string
  type?: 'text' | 'email' | 'tel'
  autoComplete?: string
  required?: boolean
  /** Width on the desktop artboard, in px; inputs go full width on small screens. */
  width: number
  tone?: 'light' | 'dark'
}

/** Conversational field: serif italic input on a single underline, set inside a sentence. */
export function SentenceInput({ name, label, placeholder, type = 'text', autoComplete, required, width, tone = 'light' }: SentenceInputProps) {
  return (
    <label className={styles.inline}>
      <span className="visually-hidden">{label}</span>
      <input
        className={`${styles.sentence} ${tone === 'dark' ? styles.sentenceDark : ''}`}
        style={{ '--w': `${width}px` } as CSSProperties}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  )
}

export function Consent({ tone = 'light', short = false }: { tone?: 'light' | 'dark'; short?: boolean }) {
  return (
    <label className={`${styles.consent} ${tone === 'dark' ? styles.consentDark : ''}`}>
      <input type="checkbox" name="consent" required />
      <span>
        I have read{short ? ' ' : ' and understand '}the <Link to={paths.privacy}>privacy policy</Link>
      </span>
    </label>
  )
}

/** Shown after submit: the form prepares an email because the site has no form backend. */
export function SentNote({ sent, tone = 'light' }: { sent: boolean; tone?: 'light' | 'dark' }) {
  return (
    <p className={`${styles.note} ${tone === 'dark' ? styles.noteDark : ''}`} role="status">
      {sent && (
        <>
          Your email app should now open with your message. If it doesn’t, write to{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </>
      )}
    </p>
  )
}

export function Field({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <label className={[styles.field, className].filter(Boolean).join(' ')}>
      <span>{label}</span>
      {children}
    </label>
  )
}
