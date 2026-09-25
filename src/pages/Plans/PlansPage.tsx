import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Consent, Field } from '../../components/Forms/Forms'
import { Pill } from '../../components/Pill/Pill'
import { contact, paths, softwareOptions } from '../../data/site'
import { sendEmail } from '../../lib/sendEmail'
import forms from '../../styles/Forms.module.css'
import styles from '../../styles/Plans.module.css'

type PlanId = 'basic' | 'pro'
type Billing = 'monthly' | 'yearly'

const formatTotal = (billing: Billing, qty: number) => (billing === 'yearly' ? `USD ${6 * qty}K` : `USD ${50 * qty}`)

export function PlansPage() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('plan')
  const [plan, setPlan] = useState<PlanId | null>(initial === 'basic' || initial === 'pro' ? initial : null)
  const [billing, setBilling] = useState<Billing>('monthly')
  const [qty, setQty] = useState(1)
  const [software, setSoftware] = useState(softwareOptions[0])
  const [submitted, setSubmitted] = useState(false)
  const detailsRef = useRef<HTMLElement>(null)

  const choose = (next: PlanId) => {
    setPlan(next)
    setSubmitted(false)
    setParams({ plan: next }, { replace: true })
    window.setTimeout(() => detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const person: [string, string][] = [
      ['Name', String(data.get('name') ?? '')],
      ['Email', String(data.get('email') ?? '')],
      ['Phone', String(data.get('phone') ?? '')],
      ['Software', software],
    ]
    if (plan === 'pro') {
      sendEmail('Sigtrack Professional plan order', [
        ['Plan', 'Professional'],
        ...person,
        ['Billing', billing === 'yearly' ? 'USD 6K / Yearly' : 'USD 50 / Monthly'],
        ['Quantity', String(qty)],
        ['Total', formatTotal(billing, qty)],
      ])
    } else {
      sendEmail('Sigtrack Basic plan download request', [['Plan', 'Basic (free)'], ...person])
    }
    setSubmitted(true)
  }

  const step3 = plan === 'basic' ? 'Download' : 'Pay'

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroHead}>
          <span className="chip chip--dark">Get Sigtrack</span>
          <h1 className={styles.title}>
            Pick your <br className="show-mobile" />
            <em className="serif">plan.</em>
          </h1>
        </div>
        <div className={styles.heroAside}>
          <p>Unlock the full potential of Sigtrack by selecting a plan that suits your needs.</p>
          <ol className={`${styles.steps} hide-mobile`} aria-label="Progress">
            <li data-state="done">01 Plan</li>
            <li data-state={plan ? (submitted ? 'done' : 'current') : 'todo'}>02 Details</li>
            <li data-state={submitted ? 'current' : 'todo'}>03 {step3}</li>
          </ol>
        </div>
      </section>

      <section className={styles.choose}>
        <div className={styles.cards} role="radiogroup" aria-label="Choose a plan">
          <button
            type="button"
            role="radio"
            aria-checked={plan === 'basic'}
            className={`${styles.card} ${styles.basic}`}
            onClick={() => choose('basic')}
          >
            <span className={styles.cardHead}>
              <span className={styles.cardLabel}>Basic plan</span>
              <span className={styles.tick} aria-hidden="true">
                {plan === 'basic' && '✓'}
              </span>
            </span>
            <span className={styles.priceRow}>
              <span className={styles.price}>Free</span>
              <span className={`${styles.priceSide} show-mobile`}>
                USD 0 / Monthly
                <br />
                USD 0 / Yearly
              </span>
            </span>
            <span className={`${styles.rates} hide-mobile`}>
              <span>
                Monthly <b>USD 0</b>
              </span>
              <span>
                Yearly <b>USD 0</b>
              </span>
            </span>
            <span className={`${styles.fakePill} ${styles.fakeDark}`}>
              Download <span>↓</span>
            </span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={plan === 'pro'}
            className={`${styles.card} ${styles.pro}`}
            onClick={() => choose('pro')}
          >
            <span className={styles.cardHead}>
              <span className={styles.cardLabel}>Professional plan</span>
              <span className={styles.tick} aria-hidden="true">
                {plan === 'pro' && '✓'}
              </span>
            </span>
            <span className={styles.priceRow}>
              <span className={styles.price}>
                <span className={`${styles.currency} hide-mobile`}>USD</span>$50
                <em className="serif hide-mobile">.00</em>
              </span>
              <span className={`${styles.priceSide} show-mobile`}>
                USD 50 / Monthly
                <br />
                USD 6K / Yearly
              </span>
            </span>
            <span className={`${styles.rates} hide-mobile`}>
              <span>
                Monthly <b>USD 50</b>
              </span>
              <span>
                Yearly <b>USD 6K</b>
              </span>
            </span>
            <span className={`${styles.fakePill} ${styles.fakeLight}`}>
              Choose plan <span>↗</span>
            </span>
          </button>
        </div>
      </section>

      <section id="details" ref={detailsRef} className={styles.details} aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {!plan && (
            <motion.div key="none" className={styles.empty} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Select a plan above to continue.
            </motion.div>
          )}

          {plan && submitted && (
            <motion.div
              key="done"
              className={styles.done}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <span className={styles.stepLabel}>03 · {plan === 'pro' ? 'Payment' : 'Download'}</span>
              <h2 className={styles.formTitle}>
                Almost <em className="serif">there.</em>
              </h2>
              <p>
                Your email app should now open with your {plan === 'pro' ? 'order' : 'request'} addressed to Sigtrack.
                Send it and Sigtrack will reply with {plan === 'pro' ? 'payment details and your license key' : 'your download'}.
              </p>
              <p>
                If nothing opened, write to <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{' '}
                <a href={contact.phoneHref}>{contact.phoneDisplay}</a>.
              </p>
              <div className={styles.doneActions}>
                <Pill type="button" variant="outline" onClick={() => setSubmitted(false)}>
                  Edit details
                </Pill>
                <Pill to={paths.home} variant="dark">
                  Back to home
                </Pill>
              </div>
            </motion.div>
          )}

          {plan && !submitted && (
            <motion.div
              key={plan}
              className={styles.detailsGrid}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <form id="plan-form" className={styles.form} onSubmit={onSubmit}>
                <div className={styles.formHead}>
                  <span className={styles.stepLabel}>02 · {plan === 'pro' ? 'Professional plan' : 'Basic plan'}</span>
                  <h2 className={styles.formTitle}>
                    {plan === 'pro' ? (
                      <>
                        Your <em className="serif">details.</em>
                      </>
                    ) : (
                      <>
                        Get the <em className="serif">free download.</em>
                      </>
                    )}
                  </h2>
                  <p>
                    {plan === 'pro'
                      ? 'Please fill this form to make payment for your Sigtrack Software.'
                      : 'Tell us where to send your download.'}
                  </p>
                </div>

                <Field label="Enter your name">
                  <input className={forms.input} name="name" type="text" autoComplete="name" required />
                </Field>
                <div className={styles.twoCol}>
                  <Field label="Enter your email">
                    <input className={forms.input} name="email" type="email" autoComplete="email" required />
                  </Field>
                  <Field label="Enter your phone number">
                    <input className={forms.input} name="phone" type="tel" autoComplete="tel" required />
                  </Field>
                </div>
                <Field
                  label={plan === 'pro' ? 'Select the Sigtrack software you want to purchase' : 'Select the Sigtrack software you want'}
                >
                  <select className={forms.input} value={software} onChange={(e) => setSoftware(e.target.value)}>
                    {softwareOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                {plan === 'pro' ? (
                  <>
                    <div className={forms.field}>
                      <span id="billing-label">Billing type</span>
                      <div className={styles.billing} role="radiogroup" aria-labelledby="billing-label">
                        <button type="button" role="radio" aria-checked={billing === 'monthly'} onClick={() => setBilling('monthly')}>
                          USD 50 / Monthly
                        </button>
                        <button type="button" role="radio" aria-checked={billing === 'yearly'} onClick={() => setBilling('yearly')}>
                          USD 6K / Yearly
                        </button>
                      </div>
                    </div>
                    <div className={`${forms.field} ${styles.qtyField}`}>
                      <span id="qty-label">Enter quantity</span>
                      <div className={styles.stepper} role="group" aria-labelledby="qty-label">
                        <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                          −
                        </button>
                        <span aria-live="polite">{qty}</span>
                        <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                          +
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Consent />
                )}
              </form>

              {plan === 'pro' ? (
                <aside className={`${styles.summary} ${styles.summaryDark}`} aria-label="Order summary">
                  <span className={styles.summaryLabel}>Order summary</span>
                  <dl className={styles.summaryRows}>
                    <div>
                      <dt>Plan</dt>
                      <dd>Professional</dd>
                    </div>
                    <div>
                      <dt>Software</dt>
                      <dd>{software}</dd>
                    </div>
                    <div>
                      <dt>Billing</dt>
                      <dd>{billing === 'yearly' ? 'USD 6K / Yearly' : 'USD 50 / Monthly'}</dd>
                    </div>
                    <div>
                      <dt>Quantity</dt>
                      <dd>× {qty}</dd>
                    </div>
                  </dl>
                  <div className={styles.total}>
                    <span>Total</span>
                    <strong>{formatTotal(billing, qty)}</strong>
                  </div>
                  <button type="submit" form="plan-form" className={styles.payButton}>
                    Pay Now
                    <span aria-hidden="true">↗</span>
                  </button>
                  <p className={styles.summaryNote}>
                    Payments are made via encrypted SSL/TLS connections. See the <Link to={paths.privacy}>Privacy Policy</Link>.
                  </p>
                </aside>
              ) : (
                <aside className={styles.summary} aria-label="Summary">
                  <span className={styles.summaryLabel}>Summary</span>
                  <dl className={styles.summaryRows}>
                    <div>
                      <dt>Plan</dt>
                      <dd>Basic</dd>
                    </div>
                    <div>
                      <dt>Price</dt>
                      <dd>USD 0</dd>
                    </div>
                  </dl>
                  <div className={styles.total}>
                    <span>Total</span>
                    <strong>Free</strong>
                  </div>
                  <button type="submit" form="plan-form" className={`${styles.payButton} ${styles.downloadButton}`}>
                    Download Sigtrack
                    <span aria-hidden="true">↓</span>
                  </button>
                </aside>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
