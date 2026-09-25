import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { Consent, SentNote, SentenceInput } from '../../components/Forms/Forms'
import { ArrowUpRightIcon } from '../../components/Icons/Icons'
import { Pill } from '../../components/Pill/Pill'
import { Reveal } from '../../components/Reveal/Reveal'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { sendEmail } from '../../lib/sendEmail'
import { contact } from '../../data/site'
import styles from '../../styles/Contact.module.css'
import demo from '../../styles/DemoForm.module.css'
import forms from '../../styles/Forms.module.css'

const interests = ['Sigtrack Web', 'Sigtrack Mobile', 'Sigtrack Desktop', 'Radios', 'Plans', 'A demo']
const mapQuery = encodeURIComponent(`Burma Camp, Accra, Ghana`)

const rows = [
  { label: 'Call', value: contact.phoneDisplay, href: contact.phoneHref },
  { label: 'Write', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Visit', value: contact.address, href: '#map' },
]

export function ContactPage() {
  const [picked, setPicked] = useState<string[]>([])
  const [sent, setSent] = useState(false)
  const phone = useMediaQuery('(max-width: 767px)')

  const toggle = (x: string) => setPicked((p) => (p.includes(x) ? p.filter((y) => y !== x) : [...p, x]))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    sendEmail('Message from sigtrackapp.com', [
      ['Name', String(data.get('name') ?? '')],
      ['Interested in', picked.join(', ')],
      ['Email', String(data.get('email') ?? '')],
      ['Phone', String(data.get('phone') ?? '')],
      ['Message', String(data.get('message') ?? '')],
    ])
    setSent(true)
  }

  return (
    <>
      <section className={styles.hero}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        >
          Let’s <em className="serif">talk.</em>
        </motion.h1>
        <ul className={styles.rows}>
          {rows.map((r) => (
            <li key={r.label}>
              <a className={styles.row} href={r.href}>
                <span className={styles.rowLabel}>{r.label}</span>
                <span className={styles.rowValue}>{r.value}</span>
                <span className={styles.rowArrow} aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.message} aria-labelledby="message-title">
        <h2 id="message-title" className="chip">
          Or send a message
        </h2>
        <form className={`${demo.form} ${styles.form}`} onSubmit={onSubmit}>
          <p>
            Hello Sigtrack, I’m{' '}
            <SentenceInput name="name" label="Your name" placeholder="your name" autoComplete="name" required width={320} />.
          </p>
          <div className={styles.interests}>
            <span>I’m interested in</span>
            <div className={styles.toggles}>
              {interests.map((x) => (
                <button key={x} type="button" aria-pressed={picked.includes(x)} onClick={() => toggle(x)}>
                  {x}
                </button>
              ))}
            </div>
          </div>
          <p>
            Reach me at{' '}
            <SentenceInput
              name="email"
              label="Your email"
              type="email"
              placeholder="email address"
              autoComplete="email"
              required
              width={380}
            />{' '}
            or{' '}
            <SentenceInput name="phone" label="Your phone (optional)" type="tel" placeholder="phone" autoComplete="tel" width={240} />
            <span className={styles.optional}> (phone optional)</span>.
          </p>
          <label className={styles.more}>
            Anything else?
            <textarea name="message" rows={phone ? 4 : 5} className={forms.softArea} />
          </label>
          <div className={demo.footer}>
            <Consent short={phone} />
            <Pill type="submit" variant="signal" size="lg" block={phone}>
              Send message
            </Pill>
          </div>
          <SentNote sent={sent} />
        </form>
      </section>

      <section id="map" className={styles.mapSection} aria-label="Map">
        <Reveal className={styles.map}>
          <iframe
            title="Sigtrack location — Burma Camp, Accra"
            src={`https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className={styles.mapCard}>
            <span className="label">Sigtrack</span>
            <span className={styles.mapAddress}>{contact.address}</span>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">
              Open in Google Maps <ArrowUpRightIcon />
            </a>
          </div>
        </Reveal>
      </section>
    </>
  )
}
