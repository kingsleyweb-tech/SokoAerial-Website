import { Link } from 'react-router-dom'
import { LegalHero } from '../../components/LegalHero/LegalHero'
import { Reveal } from '../../components/Reveal/Reveal'
import { contact, paths } from '../../data/site'
import styles from '../../styles/Legal.module.css'

export function LegalPage() {
  return (
    <>
      <LegalHero lead="Legal" accent="notice." />
      <section className={styles.body}>
        <div className={styles.operator}>
          <span className="label">Website operator</span>
          <span className={styles.site}>{contact.site}</span>
          <p>
            How we handle your data is described in our <Link to={paths.privacy}>privacy policy</Link>.
          </p>
        </div>
        <Reveal as="div">
          <dl className={styles.list}>
            <div>
              <dt>Address</dt>
              <dd>{contact.address}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                <a href={contact.phoneHref}>{contact.phoneLegal}</a>
              </dd>
            </div>
            <div>
              <dt>E-mail</dt>
              <dd>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>
    </>
  )
}
