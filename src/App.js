import { useEffect, useMemo, useState } from 'react';
import './App.css';

const properties = [
  {
    id: 1,
    title: 'The Altitude Estate',
    city: 'Mumbai',
    type: 'Sea-facing Villa',
    price: '₹18.4 Cr',
    amount: 184000000,
    beds: 5,
    area: '8,200 sq.ft.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Private pool', 'Virtual tour', 'AI match 98%'],
  },
  {
    id: 2,
    title: 'Lutyens Sky Residence',
    city: 'Delhi',
    type: 'Penthouse',
    price: '₹31.2 Cr',
    amount: 312000000,
    beds: 4,
    area: '6,450 sq.ft.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    tags: ['Concierge', 'Terrace deck', 'Compare ready'],
  },
  {
    id: 3,
    title: 'Palm Grove Sanctuary',
    city: 'Goa',
    type: 'Beach Villa',
    price: '₹12.8 Cr',
    amount: 128000000,
    beds: 6,
    area: '9,600 sq.ft.',
    image:
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    tags: ['Rental yield', 'Wellness spa', 'Saved by 420'],
  },
];

const categories = ['Luxury Villas', 'Penthouses', 'Smart Apartments', 'Farm Estates'];
const testimonials = [
  {
    quote:
      'UrbanNest made the private buying process feel discreet, precise, and astonishingly simple.',
    name: 'Aarav Mehta',
    role: 'Founder, Auric Labs',
  },
  {
    quote:
      'Their property intelligence surfaced homes we would never have found through a traditional search.',
    name: 'Naina Kapoor',
    role: 'Investor',
  },
  {
    quote:
      'The virtual tour and comparison workflow helped our family choose with total confidence.',
    name: 'Dev & Mira Rao',
    role: 'Homeowners',
  },
];

const gallery = [
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=900&q=80',
];

function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [intent, setIntent] = useState('Buy');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [saved, setSaved] = useState([1]);
  const [compare, setCompare] = useState([1, 2]);
  const [loan, setLoan] = useState(6);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  useReveal();

  useEffect(() => {
    const timer = setInterval(
      () => setActiveTestimonial((current) => (current + 1) % testimonials.length),
      4200
    );
    return () => clearInterval(timer);
  }, []);

  const emi = useMemo(() => {
    const principal = loan * 10000000;
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;
    const value =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(value).toLocaleString('en-IN');
  }, [loan, rate, years]);

  const filteredProperties = properties.filter((property) =>
    selectedCity === 'All India' ? true : property.city === selectedCity
  );

  const toggleSaved = (id) =>
    setSaved((current) =>
      current.includes(id) ? current.filter((propertyId) => propertyId !== id) : [...current, id]
    );

  const toggleCompare = (id) =>
    setCompare((current) =>
      current.includes(id)
        ? current.filter((propertyId) => propertyId !== id)
        : [...current.slice(-1), id]
    );

  return (
    <main className={`site-shell ${theme}`}>
      <nav className="navbar">
        <a className="brand" href="#hero" aria-label="UrbanNest Realty home">
          <span>UrbanNest</span>
          <small>Realty</small>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#properties">Properties</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </button>
      </nav>

      <section className="hero" id="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-house-with-a-pool-in-the-evening-34557-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay" />
        <div className="hero-content reveal">
          <p className="eyebrow">Private luxury property advisory across India</p>
          <h1>Discover Extraordinary Living Spaces</h1>
          <p className="hero-copy">Connecting You With Premium Properties Across India</p>
          <div className="search-panel">
            <div className="intent-switch" role="group" aria-label="Property intent">
              {['Buy', 'Rent'].map((item) => (
                <button
                  className={intent === item ? 'active' : ''}
                  key={item}
                  onClick={() => setIntent(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <label>
              Location
              <select value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)}>
                <option>All India</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Goa</option>
              </select>
            </label>
            <label>
              Property Type
              <select>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Apartment</option>
                <option>Estate</option>
              </select>
            </label>
            <label>
              Budget
              <select>
                <option>₹10 Cr - ₹20 Cr</option>
                <option>₹20 Cr - ₹35 Cr</option>
                <option>₹35 Cr+</option>
              </select>
            </label>
          </div>
          <div className="hero-actions">
            <a className="button primary" href="#properties">Explore Properties</a>
            <a className="button ghost" href="#contact">Schedule a Visit</a>
          </div>
        </div>
        <div className="stats-card reveal">
          {[
            ['₹9,200 Cr+', 'Luxury inventory'],
            ['2,800+', 'Private clients'],
            ['14', 'Indian cities'],
          ].map(([value, label]) => (
            <span key={label}>
              <strong>{value}</strong>
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="section" id="properties">
        <div className="section-heading reveal">
          <p className="eyebrow">Featured properties</p>
          <h2>Curated residences for rare lives.</h2>
          <p>Animated cards, AI recommendations, virtual tours, saved homes, and live comparison tools in one premium search flow.</p>
        </div>
        <div className="property-grid">
          {filteredProperties.map((property) => (
            <article className="property-card reveal" key={property.id}>
              <img src={property.image} alt={property.title} />
              <div className="property-content">
                <div>
                  <p className="city">{property.city} • {property.type}</p>
                  <h3>{property.title}</h3>
                </div>
                <strong>{property.price}</strong>
                <div className="property-meta">
                  <span>{property.beds} beds</span>
                  <span>{property.area}</span>
                </div>
                <div className="tags">
                  {property.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="card-actions">
                  <button onClick={() => toggleSaved(property.id)}>
                    {saved.includes(property.id) ? 'Saved' : 'Save'}
                  </button>
                  <button onClick={() => toggleCompare(property.id)}>
                    {compare.includes(property.id) ? 'Comparing' : 'Compare'}
                  </button>
                  <button>Tour</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-band reveal">
        <div className="map-card">
          <div className="map-pin pin-one" />
          <div className="map-pin pin-two" />
          <div className="map-pin pin-three" />
          <span className="map-label">Interactive map view</span>
        </div>
        <div className="calculator">
          <p className="eyebrow">Mortgage / EMI calculator</p>
          <h2>Plan the purchase before the private tour.</h2>
          <label>Loan value: ₹{loan} Cr<input type="range" min="3" max="30" value={loan} onChange={(event) => setLoan(Number(event.target.value))} /></label>
          <label>Interest rate: {rate}%<input type="range" min="6" max="12" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} /></label>
          <label>Tenure: {years} years<input type="range" min="5" max="30" value={years} onChange={(event) => setYears(Number(event.target.value))} /></label>
          <div className="emi">Estimated EMI <strong>₹{emi}</strong><span>/ month</span></div>
        </div>
      </section>

      <section className="section split" id="about">
        <div className="reveal">
          <p className="eyebrow">Why choose us</p>
          <h2>Discreet advisory, intelligent matching, white-glove execution.</h2>
          <p>UrbanNest blends local market depth with data-led recommendations for luxury buyers, investors, and families relocating across India.</p>
        </div>
        <div className="why-grid">
          {['AI-powered property recommendations', 'Advanced property filters', 'Virtual property tours', 'Property comparison tool'].map((item, index) => (
            <div className="why-card reveal" key={item}>
              <span>0{index + 1}</span>
              <h3>{item}</h3>
              <p>Designed to reduce uncertainty and move high-value decisions forward with confidence.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section categories">
        <div className="section-heading reveal">
          <p className="eyebrow">Property categories</p>
          <h2>Every lifestyle, impeccably sourced.</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => <button className="category-card reveal" key={category}>{category}</button>)}
        </div>
      </section>

      <section className="testimonial-section reveal">
        <div>
          <p className="eyebrow">Client stories</p>
          <h2>Trusted by buyers who value privacy and precision.</h2>
        </div>
        <blockquote>
          “{testimonials[activeTestimonial].quote}”
          <cite>{testimonials[activeTestimonial].name}<span>{testimonials[activeTestimonial].role}</span></cite>
        </blockquote>
        <div className="carousel-dots">
          {testimonials.map((item, index) => (
            <button
              aria-label={`Show testimonial from ${item.name}`}
              className={activeTestimonial === index ? 'active' : ''}
              key={item.name}
              onClick={() => setActiveTestimonial(index)}
            />
          ))}
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="section-heading reveal">
          <p className="eyebrow">Masonry gallery</p>
          <h2>Spaces that make the first impression effortless.</h2>
        </div>
        <div className="masonry">
          {gallery.map((image, index) => <img className="reveal" src={image} alt={`Luxury UrbanNest interior ${index + 1}`} key={image} />)}
        </div>
      </section>

      <section className="compare-strip reveal">
        <div>
          <p className="eyebrow">Compare shortlist</p>
          <h2>{compare.length} premium homes selected</h2>
        </div>
        <div className="compare-list">
          {compare.map((id) => {
            const property = properties.find((item) => item.id === id);
            return property ? <span key={id}>{property.title} • {property.price}</span> : null;
          })}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="reveal">
          <p className="eyebrow">Schedule a visit</p>
          <h2>Tell us the life you want. We will find the address.</h2>
        </div>
        <form className="contact-form reveal">
          <input aria-label="Name" placeholder="Name" />
          <input aria-label="Email" placeholder="Email" type="email" />
          <input aria-label="Phone" placeholder="Phone" />
          <textarea aria-label="Message" placeholder="Preferred city, budget, and viewing window" />
          <button className="button primary" type="button">Request Private Consultation</button>
        </form>
      </section>

      <footer>
        <strong>UrbanNest Realty</strong>
        <span>Luxury homes, private advisory, premium property intelligence.</span>
        <a href="mailto:hello@urbannestrealty.in">hello@urbannestrealty.in</a>
      </footer>

      <a className="whatsapp" href="https://wa.me/919999999999" aria-label="Chat with UrbanNest Realty on WhatsApp">
        WhatsApp
      </a>
    </main>
  );
}

export default App;
