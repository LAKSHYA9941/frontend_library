import { Link } from 'react-router-dom'

const pages = [
  {
    title: 'Olive Marketing',
    subtitle: 'Digital Marketing Agency',
    tag: 'Marketing',
    link: '/olive_marketing/',
    color: '#60a5fa',
    accent: '#1e40af',
    image:
      '/olive_marketing/63c6b953a2c1a5706f63bbe1_project-03-thumb.webp',
  },
  {
    title: 'Portfolio Challenge',
    subtitle: 'Personal Portfolio Template',
    tag: 'Portfolio',
    link: '/portfoliochallenge/',
    color: '#f43f5e',
    accent: '#7f1d1d',
    image:
      '/portfoliochallenge/profile.png',
  },
  {
    title: 'Pikachu UI',
    subtitle: 'Pokémon Gen I Fan Page',
    tag: 'Pokemon',
    link: '/pikachu/',
    color: '#f5c542',
    accent: '#2a1a00',
    image:
      'https://images.unsplash.com/photo-1542779283-429940ce8336?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Insect UI',
    subtitle: 'Entomology Collection Shop',
    tag: 'Nature',
    link: '/insect/',
    color: '#4ade80',
    accent: '#052e16',
    image:
      'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Puffer Jacket',
    subtitle: 'Aurora™ Winter Collection',
    tag: 'Fashion',
    link: '/jacket/',
    color: '#93c5fd',
    accent: '#0c1a2e',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Loome Shop',
    subtitle: 'Organic Cotton Fashion',
    tag: 'Fashion',
    link: '/loomeshop/',
    color: '#f9a8d4',
    accent: '#2d0a1a',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Pokédex',
    subtitle: 'Pokémon Explorer App',
    tag: 'Pokemon',
    link: '/pokedex/',
    color: '#fb923c',
    accent: '#2a0e00',
    image:
      'https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'ScaleX Blog',
    subtitle: 'SaaS Insights & Articles',
    tag: 'Blog',
    link: '/scalex/',
    color: '#a78bfa',
    accent: '#1a0a2e',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Skull Wire',
    subtitle: 'Art Work',
    tag: 'Art',
    link: '/skullwire/',
    color: '#f9a8d4',
    accent: '#2d0a1a',
    image:
      '/skullwire/uiimg.jpg',
  },
  {
    title: 'Shinsei Village',
    subtitle: 'NFT Collection',
    tag: 'Crypto',
    link: '/monkeyking/',
    color: '#8e2de2',
    accent: '#4a00e0',
    image:
      '/monkeyking/monkey.png',
  },
  {
    title: 'Astro Studio',
    subtitle: 'Space-themed Game Studio',
    tag: 'Game UI',
    link: '/astro/',
    color: '#0f172a',
    accent: '#38bdf8',
    image:
      '/astro/future-soldier.webp',
  },


]

export default function Home() {
  return (
    <div className="showcase-root">

      {/* HERO */}
      <header className="hero">
        <div className="hero-badge">11 UI Projects</div>
        <h1 className="hero-title">
          UI <span className="hero-accent">Showcase</span>
        </h1>
        <p className="hero-sub">
          A curated collection of hand-crafted HTML &amp; CSS interfaces.
          Click any card to explore the live page.
        </p>
      </header>

      {/* GRID */}
      <main className="card-grid">
        {pages.map((page, i) => (
          <a
            key={page.title}
            href={page.link}
            className="card"
            style={{ '--clr': page.color, '--acc': page.accent, animationDelay: `${i * 80}ms` }}
          >
            {/* Image */}
            <div className="card-img-wrap">
              <img src={page.image} alt={page.title} className="card-img" />
              <div className="card-img-overlay" />
              <span className="card-tag">{page.tag}</span>
            </div>

            {/* Body */}
            <div className="card-body">
              <h2 className="card-title">{page.title}</h2>
              <p className="card-subtitle">{page.subtitle}</p>

              <div className="card-cta">
                <span>View Project</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </main>

      <footer className="showcase-footer">
        <p>Built with HTML · CSS · React · Vite</p>
      </footer>
    </div>
  )
}