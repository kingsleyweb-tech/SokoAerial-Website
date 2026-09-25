import { Link } from 'react-router-dom'
import { logo } from '../../data/media'
import { contact, footerColumns, paths } from '../../data/site'
import styles from '../../styles/Footer.module.css'
import { Pill } from '../Pill/Pill'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.intro}>
          <Link to={paths.home} className={styles.brand} aria-label="Sigtrack home">
            <img src={logo} alt="" width={56} height={58} />
            <span>Sigtrack</span>
          </Link>
          <p className={styles.slogan}>
            Empowering emergency response <em className="serif">anywhere.</em>
          </p>
        </div>
        <Pill to={paths.contact} variant="light" className="hide-mobile">
          Talk to Sigtrack
        </Pill>
      </div>

      <div className={styles.grid}>
        <address className={styles.reach}>
          <span className={styles.heading}>Reach us</span>
          <span>{contact.address}</span>
          <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </address>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title} className={styles.column} data-column={column.title}>
            <span className={styles.heading}>{column.title}</span>
            {column.links.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
            {column.title === 'Get Sigtrack' && (
              <span className={`${styles.legal} hide-mobile`}>
                <Link to={paths.legal}>Legal Notice</Link>
                <Link to={paths.privacy}>Privacy</Link>
              </span>
            )}
          </nav>
        ))}
      </div>

      <div className={`${styles.mobileLegal} show-mobile`}>
        <Link to={paths.legal}>Legal Notice</Link>
        <Link to={paths.privacy}>Privacy</Link>
        <span>© {contact.site}</span>
      </div>

      <div className={styles.wordmark} aria-hidden="true">
        Sigtrack
      </div>
      <span className={`${styles.copyright} hide-mobile`}>© {contact.site} · Web · Android · Windows</span>
    </footer>
  )
}
