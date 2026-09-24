import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Check, ChevronDown, Mail, MapPin, Menu, MessageCircle, Phone, Send, ShieldCheck, Sparkles, X } from 'lucide-react';
import './styles.css';
import { productCatalog } from './productCatalog.js';

const products = [
  { name: 'Kids Modular Sofa', nameZh: '儿童模块沙发', image: 'https://sc04.alicdn.com/kf/H1a07a9f9713d47bc9247d25b2699c9fet.jpg', summary: 'Soft, rearrangeable seating for playrooms, nurseries and family spaces.' },
  { name: 'Foam Climber Block', nameZh: '泡沫攀爬块', image: 'https://sc04.alicdn.com/kf/H49e69da433e24a2baa5faf648217ac61Z.jpg', summary: 'Modular foam forms that turn movement into open-ended play.' },
  { name: 'Ball Pit', nameZh: '儿童球池', image: 'https://sc04.alicdn.com/kf/H2425833ae7544f818cf41db93d7abddcU.jpg', summary: 'A soft-play staple designed for indoor play areas and retail collections.' },
  { name: 'Baby sofa', nameZh: '婴儿沙发', image: 'https://sc04.alicdn.com/kf/H68b1c495ff5045919e0e47b774445a8cg.jpg', summary: 'Compact soft seating with a calm, nursery-friendly silhouette.' },
  { name: 'Hot-selling sofa bed', nameZh: '热销沙发床', image: 'https://sc04.alicdn.com/kf/H2d0b6fccb5d1487b9ec0bea36bfad9f5M.png', summary: 'A flexible rest-and-play format for children’s rooms and hospitality.' },
  { name: 'Kids Lazy Sofa', nameZh: '儿童懒人沙发', image: 'https://sc04.alicdn.com/kf/H0e29b6b7f7b04ab995e03960123df5a9w.png', summary: 'Relaxed, lightweight seating that is easy to style and reposition.' },
];

const certifications = ['BSCI', 'OEKO-TEX', 'ISO 9001', 'ISO 14001', 'REACH', 'ROHS'];
const regions = [['North America', 20], ['Western Europe', 15], ['Southern Europe', 15], ['Northern Europe', 15], ['Eastern Europe', 15], ['South America', 10]];
const contactInfo = {
  email: 'iven@kidsdoing.com',
  phone: '+86 15377609510',
  address: 'Unit4-3, Xingang International Furniture Park, Yangluo Town, Xinzhou District, Hubei, China',
};

function Logo() {
  return <a className="logo" href="#top" aria-label="KidsDodoDoing home"><span className="logo-mark">K</span><span>kids<span>dodoing</span></span></a>;
}

function Header({ onInquiry }) {
  const [open, setOpen] = useState(false);
  const nav = [['Collections', '#collections'], ['Catalog', '#catalog'], ['OEM / ODM', '#process'], ['Our story', '#story'], ['Contact', '#contact']];
  return <header className="site-header" data-component="site-header">
    <Logo />
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
      {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
    <div className="header-actions"><button className="language" type="button">EN <ChevronDown size={14} /></button><button className="button button-small button-accent" onClick={onInquiry}>Get a Quote <ArrowRight size={16} /></button><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </header>;
}

function ContactList({ compact = false }) {
  return <div className={compact ? 'contact-list compact' : 'contact-list'}>
    <a href={`mailto:${contactInfo.email}`}><Mail size={16} /><span>{contactInfo.email}</span></a>
    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}><Phone size={16} /><span>{contactInfo.phone}</span></a>
    <div><MessageCircle size={16} /><span>WhatsApp / WeChat: {contactInfo.phone}</span></div>
    <div><MapPin size={16} /><span>{contactInfo.address}</span></div>
  </div>;
}

function InquiryModal({ onClose, product }) {
  const [sent, setSent] = useState(false);
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close inquiry form" onClick={onClose}><X size={20} /></button>{sent ? <div className="success-state"><div className="success-icon"><Check size={24} /></div><p className="eyebrow">Inquiry received in preview</p><h2 id="inquiry-title">Your brief is ready.</h2><p>This preview confirms the form flow. You can also contact KidsDodoDoing directly by email, phone, WhatsApp or WeChat.</p><ContactList compact /><button className="button button-accent" onClick={onClose}>Back to site <ArrowRight size={16} /></button></div> : <><p className="eyebrow">Talk to the factory</p><h2 id="inquiry-title">Tell us what you need quoted.</h2>{product && <div className="selected-product"><span>Selected product</span><strong>{product.title}</strong><small>{product.price} · {product.moq}</small></div>}<p className="modal-lede">Share your target market, quantity and customization needs. We’ll come back with pricing and lead time. Prefer direct contact? Email us or reach us by phone, WhatsApp or WeChat.</p><ContactList compact /><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="name@company.com" /></label><label>What are you sourcing? <select name="group" defaultValue={product?.group || ''}><option value="" disabled>Select a product group</option>{products.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label>Message<textarea name="message" rows="4" defaultValue={product ? `I am interested in: ${product.title}` : ''} placeholder="Quantity, colors, packaging or other details" /></label><button className="button button-accent submit-button" type="submit">Send Inquiry <Send size={16} /></button></form></>}</div></div>;
}

function ProductCatalog({ onProductInquiry }) {
  const [activeSlug, setActiveSlug] = useState(productCatalog[0]?.slug || '');
  const activeGroup = useMemo(() => productCatalog.find((group) => group.slug === activeSlug) || productCatalog[0], [activeSlug]);
  const totalProducts = productCatalog.reduce((sum, group) => sum + group.products.length, 0);

  return <section className="section container catalog-section" id="catalog" data-component="full-product-catalog">
      <div className="section-heading"><div><p className="eyebrow">Full product catalog (Updated 2026)</p><h2>{totalProducts} products<br /><em>synced by group.</em></h2></div><p>All publicly available products captured from the Alibaba.com group pages are shown inside this independent website. Click any product to open the inquiry popup without leaving the site.</p></div>
    <div className="catalog-tabs" role="tablist" aria-label="Product groups">
      {productCatalog.map((group, index) => <button key={group.slug} className={group.slug === activeSlug ? 'catalog-tab active' : 'catalog-tab'} type="button" onClick={() => setActiveSlug(group.slug)}><span>Group {String(index + 1).padStart(2, '0')}</span>{group.group}<strong>{group.products.length}</strong></button>)}
    </div>
    <div className="catalog-active-heading"><div><p className="eyebrow">{activeGroup.group}</p><h3>{activeGroup.products.length} products in this group</h3></div><button className="button button-ghost" type="button" onClick={() => onProductInquiry({ title: activeGroup.group, group: activeGroup.group, price: 'Bulk quote', moq: 'MOQ varies by product' })}>Ask about this group <Send size={16} /></button></div>
    <div className="catalog-grid">
      {activeGroup.products.map((item) => <article className="catalog-card" key={item.id}><button type="button" onClick={() => onProductInquiry({ ...item, group: activeGroup.group })}><div className="catalog-image"><img src={item.image || activeGroup.image} alt={item.title} loading="lazy" /></div><div className="catalog-body"><h4>{item.title}</h4><div className="catalog-specs"><span>{item.price}</span><span>{item.moq}</span></div><span className="catalog-cta">Inquire this product <ArrowRight size={15} /></span></div></button></article>)}
    </div>
  </section>;
}

function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const openInquiry = (product = null) => { setSelectedProduct(product); setInquiryOpen(true); };
  const closeInquiry = () => { setInquiryOpen(false); setSelectedProduct(null); };

  return <div id="top" className="site-shell">
    <Header onInquiry={() => openInquiry()} />
    <main>
      <section className="hero container" data-component="hero">
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> Wuhan Kunxiang Textile Technology Co., Ltd. · KidsDodoDoing®</p><h1>Soft play,<br /><em>built to ship.</em></h1><p className="hero-lede">Modular foam sofas, climber blocks, ball pits and baby sofas — designed and made in Wuhan for importers and private-label brands.</p><div className="hero-actions"><button className="button button-accent" onClick={() => openInquiry()}>Get a Quote <ArrowRight size={18} /></button><a className="button button-ghost" href="#collections">Browse 6 product groups <ArrowRight size={18} /></a></div><div className="trust-row">{certifications.map((cert) => <span key={cert}><ShieldCheck size={14} /> {cert}</span>)}</div></div>
        <div className="hero-media" aria-label="KidsDodoDoing product collection"><div className="media-card media-one"><img src={products[0].image} alt="Kids modular foam sofa" /></div><div className="media-card media-two"><img src={products[1].image} alt="Foam climber block" /></div><div className="media-card media-three"><img src={products[2].image} alt="Children’s ball pit" /></div><div className="spec-chip"><strong>OEM / ODM</strong><span>25-day preparation · FOB Shanghai</span></div></div>
      </section>

      <section className="cert-strip" id="compliance" data-component="certification-strip"><div className="container cert-strip-inner"><span className="strip-label">Audited, tested, documented.</span><div className="cert-list">{certifications.map((cert) => <span key={cert}>{cert}</span>)}</div></div></section>

      <section className="section container" id="collections" data-component="category-bento"><div className="section-heading"><div><p className="eyebrow">Product groups</p><h2>6 product groups<br /><em>ready for inquiry.</em></h2></div><p>Review our main product families here, then send us your target style, quantity, colors and packaging requirements without leaving this website.</p></div><div className="product-grid">{products.map((product, index) => <article className={`product-card ${index < 2 ? 'product-card-large' : ''}`} key={product.name}><button className="product-card-button" type="button" onClick={() => openInquiry({ title: product.name, group: product.name, price: 'Bulk quote', moq: 'MOQ varies by item' })}><div className="product-image"><img src={product.image} alt={product.name} loading="lazy" /><span className="product-arrow"><ArrowRight size={17} /></span></div><div className="product-meta"><div><span className="group-index">Group {String(index + 1).padStart(2, '0')}</span><h3>{product.name}</h3><p>{product.nameZh}</p></div><span className="product-link">Inquire now</span></div><p className="product-summary">{product.summary}</p></button></article>)}</div></section>

      <ProductCatalog onProductInquiry={openInquiry} />

      <section className="section section-mint" id="process" data-component="oem-process-rail"><div className="container"><div className="section-heading"><div><p className="eyebrow">OEM / ODM</p><h2>From your sketch<br /><em>to a container.</em></h2></div><p>Design services offered, factory-direct communication and documentation for international trade.</p></div><div className="process-grid">{[['01', 'Brief & design', 'Translate your product idea into materials, forms and a production brief.'], ['02', 'Sampling', 'Review a physical sample and align on details before production.'], ['03', 'Production & QC', 'Sewing, foam work and quality checks in one coordinated flow.'], ['04', 'Export & documentation', 'FOB, CIF, EXW, FCA, DDP, DDU and express delivery options.']].map(([number, title, copy]) => <div className="process-step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>

      <section className="section container story-grid" id="story" data-component="heritage-story"><div className="story-visual"><img src="https://s.alicdn.com/@sc04/kf/H061c6103acf348568369df28a6ef43cfA/Indoor-Playground-Kids-Sofa-Convertible-Fabric-Modular.jpg" alt="Kids modular play sofa and convertible furniture" loading="lazy" /><div className="story-note"><span>Since 2005</span><strong>Textile experience,<br />soft-play focus.</strong></div></div><div className="story-copy"><p className="eyebrow">Our story</p><h2>Foaming Original Source.<br /><em>Kids Sofa Specialist.</em></h2><div className="story-body"><p>Wuhan Kunxiang Textile Technology Co., Ltd. was founded in 2022, Kunxiang Textile has entered the children's products market and successfully launched products that combine textile and sponge materials, such as children's toy sofas, entertainment sofas, and soft ball pit, baby play mat. The company has a modern factory covering an area of over 8,000 square meters, with strong production and customization capabilities to meet the diverse needs of customers. With more than thousands of customer cooperation cases, Kunxiang Textile's products are well-received in the European and American markets. The company attaches great importance to quality and compliance, and its factory has obtained a number of international authoritative certifications, including BSCI, OEKO-TEX, ISO 14001, ISO 9001, REACH, and ROHS.</p><p>In terms of business model, Kunxiang Textile has rich OEM/ODM experience and has in-depth cooperation with many well-known brands. It provides one-stop services from product development and design to production, and can also customize marketing strategies for customers based on market insights. Choose Kunxiang Textile, work together to achieve mutual benefits, and open a new chapter in the textile and children's products industry.</p></div><div className="timeline"><div><strong>2005</strong><span>Shanghai heritage begins</span></div><div><strong>2020</strong><span>Children’s product market opens</span></div><div><strong>2022</strong><span>Production base moves to Wuhan</span></div></div><a className="text-link" href="#contact">Meet the team behind the products <ArrowRight size={16} /></a></div></section>

      <section className="section section-deep" data-component="market-reach"><div className="container market-layout"><div><p className="eyebrow eyebrow-light">Export reach</p><h2>Made in Wuhan.<br /><em>Ready for your market.</em></h2><p className="market-note">Company-reported share of export sales by region. Use this as a starting point for your market conversation.</p></div><div className="region-list">{regions.map(([name, value]) => <div className="region-row" key={name}><div><span>{name}</span><strong>{value}%</strong></div><div className="bar"><i style={{ width: `${value * 4}%` }} /></div></div>)}</div></div></section>

      <section className="section container inquiry-section" id="contact" data-component="inquiry-band"><div className="inquiry-panel"><div><p className="eyebrow">Start a conversation</p><h2>Tell us what you need <em>quoted.</em></h2><p>Send your target market, quantity and customization needs. Our team will help you find the right product group.</p><ContactList /></div><button className="button button-accent" onClick={() => openInquiry()}>Send Inquiry <Send size={17} /></button></div></section>
    </main>
    <footer className="footer container" data-component="site-footer"><div><Logo /><p className="footer-copy">Soft-play products and textile solutions for children’s spaces, private-label brands and international buyers.</p></div><div className="footer-column"><span className="footer-label">Explore</span><a href="#collections">Product groups</a><a href="#catalog">Full catalog</a><a href="#process">OEM / ODM</a><a href="#story">Our story</a></div><div className="footer-column"><span className="footer-label">Contact</span><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a><a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a><span>WhatsApp / WeChat</span><span>{contactInfo.address}</span></div><div className="footer-column"><span className="footer-label">Compliance</span>{certifications.map((cert) => <span key={cert}>{cert}</span>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Wuhan Kunxiang Textile Technology Co., Ltd.</span><span>kidsdodoing.com</span></div></footer>
    {inquiryOpen && <InquiryModal onClose={closeInquiry} product={selectedProduct} />}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
