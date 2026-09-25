import { useState, type FormEvent } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { sendEmail } from '../../lib/sendEmail'
import styles from '../../styles/Forms.module.css'
import demo from '../../styles/DemoForm.module.css'
import { Pill, type PillVariant } from '../Pill/Pill'
import { Consent, SentNote, SentenceInput } from './Forms'

interface DemoFormProps {
  product: string
  tone?: 'light' | 'signal'
  /** "Hi, I’m" on Sigtrack Web; "I’m" elsewhere. */
  casual?: boolean
  /** Starts the feedback sentence, e.g. "After trying the demo," */
  feedbackLead: string
  /** Label for the feedback box on phones. */
  mobileFeedbackLabel: string
  button: PillVariant
}

/** "Give the demo a try and provide your feedback" — a conversational form (Foundations v2). */
export function DemoForm({ product, tone = 'light', casual = false, feedbackLead, mobileFeedbackLabel, button }: DemoFormProps) {
  const [sent, setSent] = useState(false)
  const phone = useMediaQuery('(max-width: 767px)')
  const dark = tone === 'signal'
  const inputTone = dark ? 'dark' : 'light'

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    sendEmail(`${product} demo feedback`, [
      ['Name', String(data.get('name') ?? '')],
      ['Email', String(data.get('email') ?? '')],
      ['Feedback', String(data.get('feedback') ?? '')],
    ])
    setSent(true)
  }

  return (
    <section id="demo" className={`${demo.section} ${dark ? demo.signal : ''}`} aria-labelledby="demo-title">
      <h2 id="demo-title" className={dark ? demo.monoTitle : 'chip'}>
        Give the demo a try and provide your feedback
      </h2>
      <form className={demo.form} onSubmit={onSubmit}>
        <p>
          {casual ? 'Hi, I’m ' : 'I’m '}
          <SentenceInput name="name" label="Your name" placeholder="your name" autoComplete="name" required width={casual ? 300 : 290} tone={inputTone} />
          {casual ? '. You can reach me at ' : ', at '}
          <SentenceInput
            name="email"
            label="Your email"
            type="email"
            placeholder="email address"
            autoComplete="email"
            required
            width={casual ? 420 : 400}
            tone={inputTone}
          />
          .
        </p>
        {phone ? (
          <label className={demo.mobileFeedback}>
            {mobileFeedbackLabel}
            <textarea name="feedback" rows={4} required className={`${styles.softArea} ${dark ? demo.darkArea : ''}`} />
          </label>
        ) : (
          <p>
            {feedbackLead}{' '}
            <SentenceInput name="feedback" label="Feedback" placeholder="here’s what I think…" required width={720} tone={inputTone} />
          </p>
        )}
        <div className={demo.footer}>
          <Consent tone={inputTone} short={phone} />
          <Pill type="submit" variant={button} size="lg" block={phone}>
            Send feedback
          </Pill>
        </div>
        <SentNote sent={sent} tone={inputTone} />
      </form>
    </section>
  )
}
