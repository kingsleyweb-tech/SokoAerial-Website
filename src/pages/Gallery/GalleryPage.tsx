import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { ArrowIcon, ArrowLeftIcon, ExpandIcon } from '../../components/Icons/Icons'
import { Lightbox } from '../../components/Lightbox/Lightbox'
import { Reveal } from '../../components/Reveal/Reveal'
import { galleryCategoryLabels, galleryItems, type GalleryCategory } from '../../data/content'
import styles from '../../styles/Gallery.module.css'

type Filter = 'all' | Exclude<GalleryCategory, 'field'>
const filters: Filter[] = ['all', 'web', 'mobile', 'desktop']
const collections: Exclude<GalleryCategory, 'field'>[] = ['web', 'mobile', 'desktop']
const widths = [420, 300, 520, 360]
const pad = (n: number) => String(n).padStart(2, '0')

export function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [index, setIndex] = useState(0)
  const [viewerOpen, setViewerOpen] = useState(false)
  const viewerRef = useRef<HTMLElement>(null)

  const list = useMemo(() => galleryItems.filter((x) => filter === 'all' || x.category === filter), [filter])
  const safeIndex = Math.min(index, list.length - 1)
  const current = list[safeIndex]

  const choose = (f: Filter, i = 0) => {
    setFilter(f)
    setIndex(i)
  }
  const step = (d: number) => setIndex((safeIndex + d + list.length) % list.length)

  const openFromCollection = (category: Filter, src: string) => {
    const items = galleryItems.filter((x) => x.category === category)
    choose(category, Math.max(0, items.findIndex((x) => x.src === src)))
    setViewerOpen(true)
  }

  return (
    <>
      <section ref={viewerRef} className={styles.hero} aria-label="Gallery viewer">
        <div className={styles.heroHead}>
          <motion.h1
            className={`serif ${styles.title}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          >
            Gallery
          </motion.h1>
          <div className={styles.filters} role="tablist" aria-label="Filter">
            {filters.map((f) => (
              <button key={f} type="button" role="tab" aria-selected={f === filter} onClick={() => choose(f)}>
                {f === 'all' ? 'All' : galleryCategoryLabels[f]}
                <sup className="mono hide-mobile">
                  {pad(f === 'all' ? galleryItems.length : galleryItems.filter((x) => x.category === f).length)}
                </sup>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.featured} topo`}
          onClick={() => setViewerOpen(true)}
          aria-label={`Open ${current.caption} full screen`}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
          <span className={styles.featuredShade} />
          <span className={`${styles.counterChip} show-mobile`}>
            {pad(safeIndex + 1)} / {pad(list.length)}
          </span>
          <span className={styles.featuredText}>
            <span className={styles.category}>{galleryCategoryLabels[current.category]}</span>
            <span className={styles.caption}>{current.caption}</span>
          </span>
          <span className={`${styles.expand} hide-mobile`}>
            Open full screen <ExpandIcon />
          </span>
        </button>

        <div className={styles.strip}>
          <button type="button" className={`${styles.round} hide-mobile`} aria-label="Previous image" onClick={() => step(-1)}>
            <ArrowLeftIcon />
          </button>
          <div className={styles.thumbs}>
            {list.map((it, i) => (
              <button
                key={it.src}
                type="button"
                className={`${styles.thumb} topo`}
                aria-label={`Show ${it.caption}`}
                aria-current={i === safeIndex ? 'true' : undefined}
                onClick={() => setIndex(i)}
              >
                <img src={it.src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <span className={`${styles.counter} hide-mobile`}>
            {pad(safeIndex + 1)} / {pad(list.length)}
          </span>
          <button
            type="button"
            className={`${styles.round} ${styles.roundSolid} hide-mobile`}
            aria-label="Next image"
            onClick={() => step(1)}
          >
            <ArrowIcon />
          </button>
        </div>
      </section>

      <section className={styles.collections} aria-label="Collections">
        {collections.map((c, k) => {
          const shots = galleryItems.filter((x) => x.category === c)
          return (
            <Reveal key={c} className={styles.collection}>
              <div className={styles.collectionHead}>
                <span className={styles.collectionName}>
                  <span className="label hide-mobile">Collection {pad(k + 1)}</span>
                  <span className={styles.collectionTitle}>
                    {galleryCategoryLabels[c]} <em className="serif">{pad(shots.length)}</em>
                  </span>
                </span>
                <button
                  type="button"
                  className={`${styles.viewIn} hide-mobile`}
                  onClick={() => {
                    choose(c)
                    viewerRef.current?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  View in viewer ↑
                </button>
              </div>
              <div className={styles.shots}>
                {shots.map((s, j) => (
                  <button
                    key={s.src}
                    type="button"
                    className={`${styles.shot} topo photo photo--zoom`}
                    style={{ '--w': widths[j % 4] } as CSSProperties}
                    aria-label={`Open ${s.caption}`}
                    onClick={() => openFromCollection(c, s.src)}
                  >
                    <img src={s.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </Reveal>
          )
        })}
      </section>

      <Lightbox items={list} open={viewerOpen} index={safeIndex} onChange={setIndex} onClose={() => setViewerOpen(false)} />
    </>
  )
}
