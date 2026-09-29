import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Check, ChevronDown, Mail, MapPin, Menu, MessageCircle, Phone, Send, ShieldCheck, Sparkles, X } from 'lucide-react';
import './styles.css';
import { productCatalog } from './productCatalog.js';

const products = [
  { name: 'Kids Modular Sofa/Floor Couch', nameZh: '儿童模块沙发', image: 'https://sc04.alicdn.com/kf/H1a07a9f9713d47bc9247d25b2699c9fet.jpg', summary: 'Soft, rearrangeable seating for playrooms, nurseries and family spaces.' },
  { name: 'Foam Climber Block', nameZh: '泡沫攀爬块', image: 'https://sc04.alicdn.com/kf/H49e69da433e24a2baa5faf648217ac61Z.jpg', summary: 'Modular foam forms that turn movement into open-ended play.' },
  { name: 'Kids Play Sofa Bed', nameZh: '儿童沙发床', image: 'https://sc04.alicdn.com/kf/H2d0b6fccb5d1487b9ec0bea36bfad9f5M.png', summary: 'A flexible rest-and-play format for children’s rooms and hospitality.' },
  { name: 'Kids/Baby Single Sofa', nameZh: '婴儿/儿童单人沙发', image: 'https://sc04.alicdn.com/kf/H68b1c495ff5045919e0e47b774445a8cg.jpg', summary: 'Compact soft seating with a calm, nursery-friendly silhouette.' },
  { name: 'Popular Foam Ball Pit', nameZh: '儿童球池', image: 'https://sc04.alicdn.com/kf/H2425833ae7544f818cf41db93d7abddcU.jpg', summary: 'A soft-play staple designed for indoor play areas and retail collections.' },
  { name: 'Foam Playmat', nameZh: '泡沫游戏垫', image: 'https://sc04.alicdn.com/kf/H0e29b6b7f7b04ab995e03960123df5a9w.png', summary: 'Cushioned floor mats designed for infant and toddler activity zones.' },
  { name: 'Hot-selling Sensory Toys', nameZh: '热销感官玩具', image: 'https://sc04.alicdn.com/kf/Hb16776ef97d649dca9cadb1b30969169m.jpg', summary: 'Soft accessories and sensory play pieces to build a complete collection.' },
  { name: 'Other Cushion&Pillow foam products', nameZh: '坐垫与枕垫', image: 'https://sc04.alicdn.com/kf/Hff67efad92b44868a8fba7306008b3d8g.jpg', summary: 'Foam-based comfort cushions and pillow products for private-label programs.' },
];

const certifications = [
  { name: 'BSCI', slug: 'bsci', summary: 'amfori social audit monitoring summary for responsible manufacturing.', image: 'https://sc04.alicdn.com/kf/Ab89c525151c440c8a30251f88a5cc5f8z.jpg', status: 'Overall rating C · valid until 2027-02-11' },
  { name: 'OEKO-TEX', slug: 'oeko-tex', summary: 'OEKO-TEX STANDARD 100 certification for textile safety.', image: 'https://sc04.alicdn.com/kf/A13c6264dab6742efa2e21543df26e4dbB.jpg', status: 'Certificate BJ025 217776 · valid until 2027-04-30' },
  { name: 'ISO 9001', slug: 'iso-9001', summary: 'Quality management system certification for manufacturing operations.', image: 'https://sc04.alicdn.com/kf/A23796314fa0d451e99660a59ad6c0125Q.jpg', status: 'Certificate ZK2025060256895 · valid until 2028-08-21' },
  { name: 'ISO 14001', slug: 'iso-14001', summary: 'Environmental management system certification.', image: 'https://sc04.alicdn.com/kf/Af2afbd3e58824cf6823655e75057c3a6z.jpg', status: 'Certificate ZK2026060258572 · valid until 2029-04-12' },
  { name: 'REACH', slug: 'reach', summary: 'Chemical safety test report summary for EU REACH requirements.', image: 'https://sc04.alicdn.com/kf/Aa8290c7f964d48c189ea7e1018426123F.jpg', status: 'Conclusion: PASS' },
  { name: 'ROHS', slug: 'rohs', summary: 'RoHS compliance test report by PONY Testing International Group.', image: 'https://sc04.alicdn.com/kf/A9ab0c7c22cfb4cb1b81f1ea8944438c4y.jpg', status: 'Report E05092019104D · PONY tested' },
];
const regions = [['North America', 20], ['Western Europe', 15], ['Southern Europe', 15], ['Northern Europe', 15], ['Eastern Europe', 15], ['South America', 10]];
const contactInfo = {
  email: 'iven@kidsdoing.com',
  phone: '+86 15377609510',
  address: 'Unit4-3, Xingang International Furniture Park, Yangluo Town, Xinzhou District, Hubei, China',
  facebook: 'https://facebook.com/ivenzwa',
  tiktok: 'https://tiktok.com/@ivenzhou',
};

function FacebookIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}

function TikTokIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.99-4.47V8.58a8.27 8.27 0 0 0 4.84 1.56V6.69z"/></svg>;
}

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ja', label: '日本語' },
];

const translations = {
  en: {
    navCollections: 'Collections', navCatalog: 'Catalog', navOem: 'OEM / ODM', navCompliance: 'Compliance', navContact: 'Contact',
    getQuote: 'Get a Quote', browseGroups: 'Browse 8 product groups', heroTitleA: 'Soft play,', heroTitleB: 'built to ship.',
    heroLede: 'Modular foam sofas, climber blocks, ball pits and baby sofas — designed and made in Wuhan for importers and private-label brands.',
    audited: 'Audited, tested, documented.', productGroups: 'Product groups', groupsTitleA: '8 product groups', groupsTitleB: 'ready for inquiry.',
    groupsCopy: 'Review our main product families here, then send us your target style, quantity, colors and packaging requirements without leaving this website.',
    inquireNow: 'Inquire now', catalogEyebrow: 'Full product catalog (Updated 2026)', catalogTitleA: 'products', catalogTitleB: 'synced by group.',
    catalogCopy: 'All publicly available products captured from the Alibaba.com group pages are shown inside this independent website. Click any product to open the inquiry popup without leaving the site.',
    oemTitleA: 'From your sketch', oemTitleB: 'to a container.', oemCopy: 'Design services offered, factory-direct communication and documentation for international trade.',
    certEyebrow: 'Certificates & Compliance', certTitleA: 'Documents that buyers', certTitleB: 'can review.', certCopy: 'Click each certificate to view the uploaded document preview.',
    contactTitleA: 'Tell us what you need', contactTitleB: 'quoted.', contactCopy: 'Send your target market, quantity and customization needs. Our team will help you find the right product group.', sendInquiry: 'Send Inquiry',
    footerExplore: 'Explore', footerContact: 'Contact', footerCompliance: 'Compliance', fullCatalog: 'Full catalog', ourStory: 'Our story'
  },
  zh: {
    navCollections: '产品系列', navCatalog: '完整目录', navOem: 'OEM / ODM', navCompliance: '认证资质', navContact: '联系我们',
    getQuote: '获取报价', browseGroups: '浏览 8 个产品组', heroTitleA: '柔软玩具，', heroTitleB: '工厂直达。',
    heroLede: '模块泡沫沙发、攀爬块、球池和婴儿沙发——武汉设计制造，服务进口商与自有品牌客户。',
    audited: '已审核、已测试、可核验。', productGroups: '产品系列', groupsTitleA: '8 个产品组', groupsTitleB: '支持询盘。',
    groupsCopy: '在站内查看核心产品系列，并直接提交目标款式、数量、颜色与包装需求。',
    inquireNow: '立即询盘', catalogEyebrow: '完整产品目录（2026 更新）', catalogTitleA: '款产品', catalogTitleB: '按组展示。',
    catalogCopy: '公开产品已整理到独立站内展示。点击任意产品即可打开询盘弹窗，无需跳转第三方平台。',
    oemTitleA: '从你的草图', oemTitleB: '到整柜出货。', oemCopy: '支持设计服务、工厂直连沟通与国际贸易文件配合。',
    certEyebrow: '认证与合规', certTitleA: '买家可查看的', certTitleB: '认证文件。', certCopy: '点击每个证书卡片，可查看上传的证书预览图。',
    contactTitleA: '告诉我们你需要', contactTitleB: '报价的产品。', contactCopy: '发送目标市场、数量和定制需求，我们会协助匹配合适产品组。', sendInquiry: '发送询盘',
    footerExplore: '浏览', footerContact: '联系', footerCompliance: '认证', fullCatalog: '完整目录', ourStory: '品牌故事'
  },
  es: {
    navCollections: 'Colecciones', navCatalog: 'Catálogo', navOem: 'OEM / ODM', navCompliance: 'Certificaciones', navContact: 'Contacto',
    getQuote: 'Solicitar cotización', browseGroups: 'Ver 8 grupos', heroTitleA: 'Soft play,', heroTitleB: 'listo para enviar.', heroLede: 'Sofás modulares de espuma, bloques de escalada, piscinas de bolas y sofás para bebé, fabricados en Wuhan para importadores y marcas privadas.', audited: 'Auditado, probado y documentado.', productGroups: 'Grupos de productos', groupsTitleA: '8 grupos', groupsTitleB: 'listos para consulta.', groupsCopy: 'Revise nuestras familias principales y envíe estilo, cantidad, colores y empaque sin salir del sitio.', inquireNow: 'Consultar ahora', catalogEyebrow: 'Catálogo completo (2026)', catalogTitleA: 'productos', catalogTitleB: 'por grupo.', catalogCopy: 'Los productos disponibles públicamente se muestran dentro de este sitio independiente. Haga clic para abrir la consulta.', oemTitleA: 'De su boceto', oemTitleB: 'al contenedor.', oemCopy: 'Servicios de diseño, comunicación directa con fábrica y documentación comercial internacional.', certEyebrow: 'Certificados y cumplimiento', certTitleA: 'Documentos que los compradores', certTitleB: 'pueden revisar.', certCopy: 'Haga clic en cada certificado para ver la imagen cargada.', contactTitleA: 'Cuéntenos qué necesita', contactTitleB: 'cotizar.', contactCopy: 'Envíe mercado objetivo, cantidad y necesidades de personalización.', sendInquiry: 'Enviar consulta', footerExplore: 'Explorar', footerContact: 'Contacto', footerCompliance: 'Cumplimiento', fullCatalog: 'Catálogo completo', ourStory: 'Historia'
  },
  fr: {
    navCollections: 'Collections', navCatalog: 'Catalogue', navOem: 'OEM / ODM', navCompliance: 'Certifications', navContact: 'Contact', getQuote: 'Demander un devis', browseGroups: 'Voir 8 groupes', heroTitleA: 'Soft play,', heroTitleB: 'prêt à expédier.', heroLede: 'Canapés modulaires en mousse, blocs d’escalade, piscines à balles et canapés bébé fabriqués à Wuhan pour importateurs et marques privées.', audited: 'Audité, testé, documenté.', productGroups: 'Groupes produits', groupsTitleA: '8 groupes', groupsTitleB: 'prêts à consulter.', groupsCopy: 'Consultez les principales familles de produits et envoyez style, quantité, couleurs et emballage sans quitter le site.', inquireNow: 'Demander', catalogEyebrow: 'Catalogue complet (2026)', catalogTitleA: 'produits', catalogTitleB: 'par groupe.', catalogCopy: 'Les produits publics sont présentés dans ce site indépendant. Cliquez pour ouvrir la demande.', oemTitleA: 'De votre croquis', oemTitleB: 'au conteneur.', oemCopy: 'Services de design, communication directe usine et documents de commerce international.', certEyebrow: 'Certificats et conformité', certTitleA: 'Documents que les acheteurs', certTitleB: 'peuvent vérifier.', certCopy: 'Cliquez sur chaque certificat pour voir l’aperçu.', contactTitleA: 'Dites-nous quoi', contactTitleB: 'chiffrer.', contactCopy: 'Envoyez marché cible, quantité et besoins de personnalisation.', sendInquiry: 'Envoyer', footerExplore: 'Explorer', footerContact: 'Contact', footerCompliance: 'Conformité', fullCatalog: 'Catalogue complet', ourStory: 'Notre histoire'
  },
  de: {
    navCollections: 'Kollektionen', navCatalog: 'Katalog', navOem: 'OEM / ODM', navCompliance: 'Zertifikate', navContact: 'Kontakt', getQuote: 'Angebot anfragen', browseGroups: '8 Gruppen ansehen', heroTitleA: 'Soft Play,', heroTitleB: 'lieferbereit.', heroLede: 'Modulare Schaumsessel, Kletterblöcke, Bällebäder und Babysofas aus Wuhan für Importeure und Eigenmarken.', audited: 'Geprüft, getestet, dokumentiert.', productGroups: 'Produktgruppen', groupsTitleA: '8 Produktgruppen', groupsTitleB: 'bereit für Anfragen.', groupsCopy: 'Prüfen Sie unsere Hauptproduktlinien und senden Sie Stil, Menge, Farben und Verpackungswünsche direkt auf der Website.', inquireNow: 'Jetzt anfragen', catalogEyebrow: 'Vollständiger Katalog (2026)', catalogTitleA: 'Produkte', catalogTitleB: 'nach Gruppe.', catalogCopy: 'Öffentlich verfügbare Produkte werden auf dieser unabhängigen Website gezeigt. Klicken Sie für eine Anfrage.', oemTitleA: 'Von Ihrer Skizze', oemTitleB: 'zum Container.', oemCopy: 'Designservice, direkter Werkskontakt und Dokumentation für internationalen Handel.', certEyebrow: 'Zertifikate & Compliance', certTitleA: 'Dokumente, die Käufer', certTitleB: 'prüfen können.', certCopy: 'Klicken Sie auf ein Zertifikat, um die Vorschau zu sehen.', contactTitleA: 'Sagen Sie uns, was', contactTitleB: 'angeboten werden soll.', contactCopy: 'Senden Sie Zielmarkt, Menge und Anpassungswünsche.', sendInquiry: 'Anfrage senden', footerExplore: 'Entdecken', footerContact: 'Kontakt', footerCompliance: 'Compliance', fullCatalog: 'Vollständiger Katalog', ourStory: 'Geschichte'
  },
  ja: {
    navCollections: '製品シリーズ', navCatalog: 'カタログ', navOem: 'OEM / ODM', navCompliance: '認証', navContact: 'お問い合わせ', getQuote: '見積もり依頼', browseGroups: '8カテゴリを見る', heroTitleA: 'ソフトプレイを、', heroTitleB: '出荷品質で。', heroLede: 'モジュラー発泡ソファ、クライミングブロック、ボールプール、ベビーソファを武漢で設計・製造し、輸入業者やプライベートブランドに提供します。', audited: '監査済み、試験済み、文書化済み。', productGroups: '製品シリーズ', groupsTitleA: '8つの製品群', groupsTitleB: '問い合わせ対応。', groupsCopy: '主要製品群を確認し、希望スタイル、数量、色、包装要件をサイト内で送信できます。', inquireNow: '問い合わせ', catalogEyebrow: '全製品カタログ（2026）', catalogTitleA: '製品', catalogTitleB: 'カテゴリ別。', catalogCopy: '公開製品を独立サイト内に整理しました。製品をクリックすると問い合わせフォームが開きます。', oemTitleA: 'スケッチから', oemTitleB: 'コンテナ出荷まで。', oemCopy: 'デザイン支援、工場との直接連絡、国際貿易書類に対応します。', certEyebrow: '認証・コンプライアンス', certTitleA: 'バイヤーが確認できる', certTitleB: '認証書類。', certCopy: '各証明書をクリックするとプレビューを表示できます。', contactTitleA: '見積もりしたい内容を', contactTitleB: 'お知らせください。', contactCopy: '対象市場、数量、カスタマイズ要件をお送りください。', sendInquiry: '問い合わせ送信', footerExplore: '見る', footerContact: '連絡先', footerCompliance: '認証', fullCatalog: '全カタログ', ourStory: 'ストーリー'
  }
};

function Logo() {
  return <a className="logo" href="#top" aria-label="KidsDodoDoing home"><span className="logo-mark">K</span><span>kids<span>dodoing</span></span></a>;
}

function Header({ onInquiry, lang, setLang, t, onSelectCategory }) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return <header className="site-header" data-component="site-header">
    <Logo />
    <nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation">
      <a href="#collections" onClick={() => setOpen(false)}>{t.navCollections}</a>
      
      <div 
        className="nav-dropdown-wrapper"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <a 
          href="#catalog" 
          className="nav-dropdown-trigger" 
          onClick={() => { setOpen(false); setDropdownOpen(false); }}
        >
          {t.navCatalog}
          <ChevronDown size={14} className={dropdownOpen ? 'dropdown-arrow rotate' : 'dropdown-arrow'} />
        </a>
        <div className={dropdownOpen ? 'nav-dropdown-menu open' : 'nav-dropdown-menu'}>
          <div className="dropdown-header">8 Product Categories</div>
          <div className="dropdown-list">
            {productCatalog.map((group, index) => (
              <a 
                key={group.slug} 
                href="#catalog" 
                className="dropdown-item" 
                onClick={() => { 
                  onSelectCategory(group.slug); 
                  setOpen(false); 
                  setDropdownOpen(false); 
                }}
              >
                <span className="dropdown-index">G{String(index + 1).padStart(2, '0')}</span>
                <span className="dropdown-name">{group.group}</span>
                <span className="dropdown-count">{group.products.length}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <a href="#process" onClick={() => setOpen(false)}>{t.navOem}</a>
      <a href="#certifications" onClick={() => setOpen(false)}>{t.navCompliance}</a>
      <a href="#contact" onClick={() => setOpen(false)}>{t.navContact}</a>
    </nav>
    <div className="header-actions"><label className="language"><span className="sr-only">Language</span><select value={lang} onChange={(event) => setLang(event.target.value)}>{languages.map((item) => <option value={item.code} key={item.code}>{item.label}</option>)}</select><ChevronDown size={14} /></label><button className="button button-small button-accent" onClick={onInquiry}>{t.getQuote} <ArrowRight size={16} /></button><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </header>;
}

function ContactList({ compact = false }) {
  return <div className={compact ? 'contact-list compact' : 'contact-list'}>
    <a href={`mailto:${contactInfo.email}`}><Mail size={16} /><span>{contactInfo.email}</span></a>
    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}><Phone size={16} /><span>{contactInfo.phone}</span></a>
    <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon size={16} /><span>Facebook: @ivenzwa</span></a>
    <a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer"><TikTokIcon size={16} /><span>TikTok: @ivenzhou</span></a>
    <div><MessageCircle size={16} /><span>WhatsApp / WeChat: {contactInfo.phone}</span></div>
    <div><MapPin size={16} /><span>{contactInfo.address}</span></div>
  </div>;
}

function InquiryModal({ onClose, product }) {
  const [sent, setSent] = useState(false);
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close inquiry form" onClick={onClose}><X size={20} /></button>{sent ? <div className="success-state"><div className="success-icon"><Check size={24} /></div><p className="eyebrow">Inquiry received in preview</p><h2 id="inquiry-title">Your brief is ready.</h2><p>This preview confirms the form flow. You can also contact KidsDodoDoing directly by email, phone, WhatsApp or WeChat.</p><ContactList compact /><button className="button button-accent" onClick={onClose}>Back to site <ArrowRight size={16} /></button></div> : <><p className="eyebrow">Talk to the factory</p><h2 id="inquiry-title">Tell us what you need quoted.</h2>{product && <div className="selected-product"><span>Selected product</span><strong>{product.title}</strong><small>{product.price} · {product.moq}</small></div>}<p className="modal-lede">Share your target market, quantity and customization needs. We’ll come back with pricing and lead time. Prefer direct contact? Email us or reach us by phone, WhatsApp or WeChat.</p><ContactList compact /><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="name@company.com" /></label><label>What are you sourcing? <select name="group" defaultValue={product?.group || ''}><option value="" disabled>Select a product group</option>{products.map((item) => <option key={item.name}>{item.name}</option>)}</select></label><label>Message<textarea name="message" rows="4" defaultValue={product ? `I am interested in: ${product.title}` : ''} placeholder="Quantity, colors, packaging or other details" /></label><button className="button button-accent submit-button" type="submit">Send Inquiry <Send size={16} /></button></form></>}</div></div>;
}

function CertificateModal({ certificate, onClose }) {
  return <div className="modal-backdrop" role="presentation" onClick={onClose}><div className="modal certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close certificate preview" onClick={onClose}><X size={20} /></button><p className="eyebrow">Compliance document</p><h2 id="certificate-title">{certificate.name}</h2><p className="modal-lede">{certificate.summary}</p><div className="certificate-preview">{certificate.image ? <img src={certificate.image} alt={`${certificate.name} certificate preview`} /> : <div className="certificate-placeholder"><ShieldCheck size={34} /><strong>{certificate.name}</strong><span>{certificate.status}</span></div>}</div><div className="certificate-actions">{certificate.image && <a className="button button-ghost" href={certificate.image} target="_blank" rel="noopener noreferrer">Open full image <ArrowRight size={16} /></a>}<button className="button button-accent" type="button" onClick={onClose}>Close</button></div></div></div>;
}

function CertificationsSection({ onCertificateOpen, t }) {
  return <section className="section container certification-section" id="certifications" data-component="certification-gallery"><div className="section-heading"><div><p className="eyebrow">{t.certEyebrow}</p><h2>{t.certTitleA}<br /><em>{t.certTitleB}</em></h2></div><p>{t.certCopy}</p></div><div className="certificate-grid">{certifications.map((certificate) => <article className="certificate-card" id={certificate.slug} key={certificate.name}><button type="button" onClick={() => onCertificateOpen(certificate)}><div className="certificate-thumb">{certificate.image ? <img src={certificate.image} alt={`${certificate.name} certificate thumbnail`} loading="lazy" /> : <div className="certificate-placeholder"><ShieldCheck size={28} /><span>Available on request</span></div>}<span className="certificate-badge"><ShieldCheck size={14} /> Verified file</span></div><div className="certificate-copy"><h3>{certificate.name}</h3><p>{certificate.summary}</p><small>{certificate.status}</small></div></button></article>)}</div></section>;
}

function ProductCatalog({ onProductInquiry, t, activeSlug, setActiveSlug }) {
  const activeGroup = useMemo(() => productCatalog.find((group) => group.slug === activeSlug) || productCatalog[0], [activeSlug]);
  const totalProducts = productCatalog.reduce((sum, group) => sum + group.products.length, 0);

  return <section className="section container catalog-section" id="catalog" data-component="full-product-catalog">
      <div className="section-heading"><div><p className="eyebrow">{t.catalogEyebrow}</p><h2>{totalProducts} {t.catalogTitleA}<br /><em>{t.catalogTitleB}</em></h2></div><p>{t.catalogCopy}</p></div>
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
  const [lang, setLang] = useState('en');
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [activeCatalogSlug, setActiveCatalogSlug] = useState(productCatalog[0]?.slug || '');
  const t = translations[lang] || translations.en;
  const openInquiry = (product = null) => { setSelectedProduct(product); setInquiryOpen(true); };
  const closeInquiry = () => { setInquiryOpen(false); setSelectedProduct(null); };

  return <div id="top" className="site-shell" lang={lang}>
    <Header onInquiry={() => openInquiry()} lang={lang} setLang={setLang} t={t} onSelectCategory={setActiveCatalogSlug} />
    <main>
      <section className="hero container" data-component="hero">
        <div className="hero-copy"><p className="eyebrow"><Sparkles size={14} /> Wuhan Kunxiang Textile Technology Co., Ltd. · KidsDodoDoing®</p><h1>{t.heroTitleA}<br /><em>{t.heroTitleB}</em></h1><p className="hero-lede">{t.heroLede}</p><div className="hero-actions"><button className="button button-accent" onClick={() => openInquiry()}>{t.getQuote} <ArrowRight size={18} /></button><a className="button button-ghost" href="#collections">{t.browseGroups} <ArrowRight size={18} /></a></div><div className="trust-row">{certifications.map((cert) => <a href={`#${cert.slug}`} key={cert.name}><ShieldCheck size={14} /> {cert.name}</a>)}</div></div>
        <div className="hero-media" aria-label="KidsDodoDoing product collection"><div className="media-card media-one"><img src={products[0].image} alt="Kids modular foam sofa" /></div><div className="media-card media-two"><img src={products[1].image} alt="Foam climber block" /></div><div className="media-card media-three"><img src={products[2].image} alt="Children’s ball pit" /></div><div className="spec-chip"><strong>OEM / ODM</strong><span>25-day preparation · FOB Shanghai</span></div></div>
      </section>

      <section className="cert-strip" id="compliance" data-component="certification-strip"><div className="container cert-strip-inner"><span className="strip-label">{t.audited}</span><div className="cert-list">{certifications.map((cert) => <a href={`#${cert.slug}`} key={cert.name}>{cert.name}</a>)}</div></div></section>

      <section className="section container" id="collections" data-component="category-bento"><div className="section-heading"><div><p className="eyebrow">{t.productGroups}</p><h2>{t.groupsTitleA}<br /><em>{t.groupsTitleB}</em></h2></div><p>{t.groupsCopy}</p></div><div className="product-grid">{products.map((product, index) => <article className={`product-card ${index < 2 ? 'product-card-large' : ''}`} key={product.name}><button className="product-card-button" type="button" onClick={() => openInquiry({ title: product.name, group: product.name, price: 'Bulk quote', moq: 'MOQ varies by item' })}><div className="product-image"><img src={product.image} alt={product.name} loading="lazy" /><span className="product-arrow"><ArrowRight size={17} /></span></div><div className="product-meta"><div><span className="group-index">Group {String(index + 1).padStart(2, '0')}</span><h3>{product.name}</h3><p>{product.nameZh}</p></div><span className="product-link">{t.inquireNow}</span></div><p className="product-summary">{product.summary}</p></button></article>)}</div></section>

      <ProductCatalog onProductInquiry={openInquiry} t={t} activeSlug={activeCatalogSlug} setActiveSlug={setActiveCatalogSlug} />

      <section className="section section-mint" id="process" data-component="oem-process-rail"><div className="container"><div className="section-heading"><div><p className="eyebrow">OEM / ODM</p><h2>{t.oemTitleA}<br /><em>{t.oemTitleB}</em></h2></div><p>{t.oemCopy}</p></div><div className="process-grid">{[['01', 'Brief & design', 'Translate your product idea into materials, forms and a production brief.'], ['02', 'Sampling', 'Review a physical sample and align on details before production.'], ['03', 'Production & QC', 'Sewing, foam work and quality checks in one coordinated flow.'], ['04', 'Export & documentation', 'FOB, CIF, EXW, FCA, DDP, DDU and express delivery options.']].map(([number, title, copy]) => <div className="process-step" key={number}><span className="step-number">{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></div></section>

      <section className="section container story-grid" id="story" data-component="heritage-story"><div className="story-visual"><img src="https://s.alicdn.com/@sc04/kf/H061c6103acf348568369df28a6ef43cfA/Indoor-Playground-Kids-Sofa-Convertible-Fabric-Modular.jpg" alt="Kids modular play sofa and convertible furniture" loading="lazy" /><div className="story-note"><span>Since 2005</span><strong>Textile experience,<br />soft-play focus.</strong></div></div><div className="story-copy"><p className="eyebrow">Our story</p><h2>Foaming Original Source.<br /><em>Kids Sofa Specialist.</em></h2><div className="story-body"><p>Wuhan Kunxiang Textile Technology Co., Ltd. was founded in 2022, Kunxiang Textile has entered the children's products market and successfully launched products that combine textile and sponge materials, such as children's toy sofas, entertainment sofas, and soft ball pit, baby play mat. The company has a modern factory covering an area of over 8,000 square meters, with strong production and customization capabilities to meet the diverse needs of customers. With more than thousands of customer cooperation cases, Kunxiang Textile's products are well-received in the European and American markets. The company attaches great importance to quality and compliance, and its factory has obtained a number of international authoritative certifications, including BSCI, OEKO-TEX, ISO 14001, ISO 9001, REACH, and ROHS.</p><p>In terms of business model, Kunxiang Textile has rich OEM/ODM experience and has in-depth cooperation with many well-known brands. It provides one-stop services from product development and design to production, and can also customize marketing strategies for customers based on market insights. Choose Kunxiang Textile, work together to achieve mutual benefits, and open a new chapter in the textile and children's products industry.</p></div><div className="timeline"><div><strong>2005</strong><span>Shanghai heritage begins</span></div><div><strong>2020</strong><span>Children’s product market opens</span></div><div><strong>2022</strong><span>Production base moves to Wuhan</span></div></div><a className="text-link" href="#contact">Meet the team behind the products <ArrowRight size={16} /></a></div></section>

      <CertificationsSection onCertificateOpen={setSelectedCertificate} t={t} />

      <section className="section section-deep" data-component="market-reach"><div className="container market-layout"><div><p className="eyebrow eyebrow-light">Export reach</p><h2>Made in Wuhan.<br /><em>Ready for your market.</em></h2><p className="market-note">Company-reported share of export sales by region. Use this as a starting point for your market conversation.</p></div><div className="region-list">{regions.map(([name, value]) => <div className="region-row" key={name}><div><span>{name}</span><strong>{value}%</strong></div><div className="bar"><i style={{ width: `${value * 4}%` }} /></div></div>)}</div></div></section>

      <section className="section container inquiry-section" id="contact" data-component="inquiry-band"><div className="inquiry-panel"><div><p className="eyebrow">{t.navContact}</p><h2>{t.contactTitleA} <em>{t.contactTitleB}</em></h2><p>{t.contactCopy}</p><ContactList /></div><button className="button button-accent" onClick={() => openInquiry()}>{t.sendInquiry} <Send size={17} /></button></div></section>
    </main>
    <footer className="footer container" data-component="site-footer"><div><Logo /><p className="footer-copy">Soft-play products and textile solutions for children’s spaces, private-label brands and international buyers.</p></div><div className="footer-column"><span className="footer-label">{t.footerExplore}</span><a href="#collections">{t.productGroups}</a><a href="#catalog">{t.fullCatalog}</a><a href="#process">OEM / ODM</a><a href="#story">{t.ourStory}</a></div><div className="footer-column"><span className="footer-label">{t.footerContact}</span><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a><a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a><a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook: @ivenzwa</a><a href={contactInfo.tiktok} target="_blank" rel="noopener noreferrer">TikTok: @ivenzhou</a><span>WhatsApp / WeChat</span><span>{contactInfo.address}</span></div><div className="footer-column"><span className="footer-label">{t.footerCompliance}</span>{certifications.map((cert) => <a href={`#${cert.slug}`} key={cert.name}>{cert.name}</a>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Wuhan Kunxiang Textile Technology Co., Ltd.</span><span>kidsdodoing.com</span></div></footer>
    {inquiryOpen && <InquiryModal onClose={closeInquiry} product={selectedProduct} />}
    {selectedCertificate && <CertificateModal certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />}
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
