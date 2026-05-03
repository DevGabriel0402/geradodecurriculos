import React, { forwardRef, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Mail, Phone, MapPin } from 'lucide-react';

const PreviewContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: ${({ $isPreviewMode }) => $isPreviewMode ? '0' : '2rem'};
  padding-bottom: ${({ $isPreviewMode }) => $isPreviewMode ? '0' : '140px'};
  background-color: #f1f5f9;
  min-height: 100%;
  overflow: ${({ $isPreviewMode }) => $isPreviewMode ? 'hidden' : 'auto'};

  @media (max-width: 1023px) {
    padding: 0.5rem 0;
    padding-bottom: 140px;
    background-color: #f1f5f9;
    overflow: auto;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media print {
    display: flex !important;
    padding: 0 !important;
    overflow: visible !important;
    background: white !important;
  }
`;

const Scaler = styled.div`
  transform-origin: top center;
  transition: transform 0.2s ease-out;
  transform: scale(${({ $scale }) => $scale});
  /* On mobile, reserve the scaled height so the container scrolls correctly */
  height: ${({ $scale, $isMobile }) => $isMobile ? `${1123 * $scale}px` : 'auto'};

  @media print {
    transform: none !important;
  }
`;

const Paper = styled.div`
  width: 210mm;
  min-height: 297mm;
  background: ${({ $config }) => $config?.backgroundColor || 'white'};
  color: ${({ $config }) => $config?.textColor || '#1a1a1a'};
  box-shadow: ${({ $isPreviewMode }) => $isPreviewMode ? 'none' : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'};
  position: relative;
  font-family: ${({ $config }) => $config?.fontFamily || "'Inter', sans-serif"};
  text-align: ${({ $config }) => $config?.textAlign || 'left'};
  line-height: ${({ $config }) => $config?.lineHeight || '1.5'};
  overflow: hidden;
  display: flex;
  flex-direction: ${({ $theme }) => ($theme === 'creative' || $theme === 'tech' || $theme === 'modern_sidebar' || $theme === 'teal_box' || $theme === 'bw_two_col' || $theme === 'bw_sidebar_accent') ? 'row' : 'column'};
  border-left: ${({ $theme, $config }) => $theme === 'timeline' ? `8px solid ${$config?.primaryColor || '#000'}` : 'none'};

  @media print {
    box-shadow: none;
    margin: 0;
    width: 210mm;
    min-height: 297mm;
    height: auto !important;
    overflow: visible !important;
    background: ${({ $config }) => ($config?.backgroundColor || 'white')} !important;
    color: ${({ $config }) => ($config?.textColor || '#1a1a1a')} !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
`;

const Sidebar = styled.div`
  width: 32%;
  background: ${({ $config }) => $config?.primaryColor || '#1e293b'};
  color: white;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  .section-title {
    font-size: 0.95rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    margin-bottom: 1.25rem;
    color: white;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    padding-bottom: 0.5rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
    margin-bottom: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
    word-break: break-all;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: ${({ $theme }) => ($theme === 'creative' || $theme === 'tech') ? '2.5rem 3rem' : ($theme === 'block_header' ? '0' : '22mm')};
  position: relative;
  z-index: 1;
`;

const Watermark = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 500px;
  height: 500px;
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Section = ({ title, children, theme, dark = false, config }) => {
  const isExecutive = theme === 'executive';
  const isSidebarTitles = theme === 'sidebar_titles';
  const isProfessionalBar = theme === 'professional_bar';
  const isPurpleLine = theme === 'purple_line';
  const isBWTheme = ['bw_bold', 'bw_timeline', 'bw_classic_center', 'bw_minimal', 'bw_traditional', 'bw_blue_header', 'bw_boxed', 'bw_two_col', 'bw_sidebar_accent'].includes(theme);
  const isBWBoxed = theme === 'bw_boxed';
  const isBWBlueHeader = theme === 'bw_blue_header';
  const isBWSidebarAccent = theme === 'bw_sidebar_accent';
  const isBWTwoCol = theme === 'bw_two_col';

  if (isSidebarTitles) {
    return (
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{ width: '140px', flexShrink: 0 }}>
          <h2 style={{ fontSize: `${config?.sectionTitleSize || 16}px`, fontWeight: 800, color: config?.primaryColor || '#1e3a8a', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h2>
          <div style={{ width: '100%', height: '2px', background: config?.primaryColor || '#1e3a8a', marginTop: '0.5rem' }}></div>
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    );
  }

  if (isBWBoxed) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: '1rem' }}>
          <h2 style={{ fontSize: `${config?.sectionTitleSize || 15}px`, fontWeight: 700, color: '#fff', background: '#333', padding: '0.3rem 0.75rem', textTransform: 'none', margin: 0 }}>{title}</h2>
          <div style={{ flex: 1, height: '1px', background: '#bbb' }}></div>
        </div>
        {children}
      </div>
    );
  }

  if (isBWBlueHeader || isBWSidebarAccent) {
    const accentColor = config?.primaryColor || '#1a56a0';
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: `${config?.sectionTitleSize || 15}px`, fontWeight: 700, color: accentColor, borderBottom: `1.5px solid #ccc`, paddingBottom: '0.4rem', marginBottom: '0.75rem', textTransform: 'none' }}>{title}</h2>
        {children}
      </div>
    );
  }

  if (isBWTwoCol) {
    return (
      <div style={{ marginBottom: '1.75rem' }}>
        <h2 style={{ fontSize: `${config?.sectionTitleSize || 14}px`, fontWeight: 800, color: '#111', borderBottom: '1.5px solid #111', paddingBottom: '0.3rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</h2>
        {children}
      </div>
    );
  }

  const titleColor = isBWTheme ? '#111111' : (config?.primaryColor || '#0f172a');
  const titleBorder = isBWTheme
    ? '1.5px solid #111111'
    : (isExecutive || theme === 'dark' || isProfessionalBar || isPurpleLine)
      ? (isPurpleLine ? 'none' : `2px solid ${isProfessionalBar ? '#333' : (config?.primaryColor + '22')}`)
      : `2px solid ${config?.primaryColor}22`;

  const titleStyle = {
    fontSize: `${config?.sectionTitleSize || 18}px`,
    fontWeight: 800,
    color: titleColor,
    borderBottom: titleBorder,
    paddingBottom: '0.6rem',
    marginBottom: '1.25rem',
    textTransform: 'uppercase',
    letterSpacing: isBWTheme ? '1.5px' : '1.2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: (config?.textAlign === 'center' || isExecutive || isPurpleLine || theme === 'bw_classic_center') ? 'center' : (config?.textAlign === 'right' ? 'flex-end' : 'flex-start'),
    gap: '0.5rem'
  };

  return (
    <div style={{ marginBottom: '2.5rem', position: 'relative', padding: theme === 'block_header' ? '0 22mm' : '0' }}>
      <h2 style={titleStyle}>{title}</h2>
      {isPurpleLine && <div style={{ borderBottom: '2px dotted #9333ea', marginBottom: '1.25rem', opacity: 0.5 }}></div>}
      {children}
    </div>
  );
};


const ResumePreview = forwardRef(({ data, isPreviewMode = false }, ref) => {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        const containerWidth = containerRef.current.offsetWidth - (mobile ? 16 : 64);
        const containerHeight = window.innerHeight - (mobile ? 160 : 120);

        const paperWidth = 794;
        const paperHeight = 1123;

        const scaleW = containerWidth / paperWidth;
        const scaleH = containerHeight / paperHeight;

        if (mobile) {
          setScale(scaleW);
        } else {
          setScale(Math.min(scaleW, scaleH, 1));
        }
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [isPreviewMode]);

  if (!data) return null;
  const { personal, experience, education, skills, languages, customSections, config } = data;
  const theme = config?.theme || 'modern';

  const nameStyle = {
    fontSize: `${config?.nameSize || 48}px`,
    fontWeight: config?.boldName !== false ? 900 : 400,
    textTransform: config?.uppercaseName ? 'uppercase' : 'none',
    color: config?.titleColor || (theme === 'dark' ? '#f8fafc' : '#0f172a'),
    lineHeight: 1.1,
    letterSpacing: theme === 'minimal' ? '6px' : '-0.5px'
  };

  const renderHeader = () => {
    if (theme === 'creative' || theme === 'tech' || theme === 'modern_sidebar' || theme === 'teal_box' || theme === 'bw_two_col' || theme === 'bw_sidebar_accent') return null;

    const subtitleStyle = {
      fontSize: `${config?.titleSize || 18}px`,
      color: config?.primaryColor || '#64748b',
      fontWeight: 600,
      marginTop: '0.5rem',
      textTransform: theme === 'executive' || theme === 'timeline' ? 'uppercase' : 'none',
      letterSpacing: theme === 'executive' ? '2px' : 'normal'
    };

    switch(theme) {
      case 'bw_bold':
        return (
          <header style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: `${config?.nameSize || 52}px`, fontWeight: 900, color: '#000', textTransform: 'uppercase', lineHeight: 1, fontFamily: config?.fontFamily }}>
              {personal.name}
            </h1>
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: '#333', marginTop: '0.5rem' }}>{personal.title}</p>
            <div style={{ borderBottom: '2px solid #000', margin: '1rem 0 0.75rem' }}></div>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}><Phone size={14} /> {personal.phone}</span>}
              {personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}><Mail size={14} /> {personal.email}</span>}
              {personal.location && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}><MapPin size={14} /> {personal.location}</span>}
            </div>
            <div style={{ borderBottom: '2px solid #000', marginTop: '0.75rem' }}></div>
          </header>
        );
      case 'bw_timeline':
        return (
          <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <h1 style={{ fontSize: `${config?.nameSize || 40}px`, fontWeight: 700, color: '#000', lineHeight: 1.1 }}>{personal.name}</h1>
            <p style={{ fontSize: '1rem', color: '#555', marginTop: '0.35rem' }}>{personal.title}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginTop: '1rem', fontSize: '0.85rem', color: '#333' }}>
              {personal.phone && <div><strong>Telefone</strong>  {personal.phone}</div>}
              {personal.email && <div><strong>E-mail</strong>  {personal.email}</div>}
              {personal.location && <div><strong>Endereço</strong>  {personal.location}</div>}
            </div>
          </header>
        );
      case 'bw_classic_center':
        return (
          <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: `${config?.nameSize || 44}px`, fontWeight: 400, fontFamily: 'Georgia, serif', color: '#000', letterSpacing: '3px' }}>{personal.name}</h1>
            <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.5rem' }}>{personal.location} • {personal.phone} • {personal.email}</p>
            <div style={{ borderBottom: '1px dashed #999', marginTop: '1.5rem' }}></div>
          </header>
        );
      case 'bw_minimal':
        return (
          <header style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: `${config?.nameSize || 40}px`, fontWeight: 700, color: '#000', fontFamily: config?.fontFamily || 'Georgia, serif' }}>{personal.name}</h1>
            <p style={{ fontSize: '1rem', color: '#555', marginTop: '0.35rem', fontStyle: 'italic' }}>{personal.title}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.85rem', color: '#444', borderTop: '1px solid #000', paddingTop: '0.75rem' }}>
              {personal.location && <span>{personal.location}</span>}
              {personal.phone && <span>{personal.phone}</span>}
              {personal.email && <span>{personal.email}</span>}
            </div>
          </header>
        );
      case 'bw_traditional':
        return (
          <header style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
            <h1 style={{ fontSize: `${config?.nameSize || 44}px`, fontWeight: 700, color: '#000', fontFamily: 'Georgia, serif' }}>{personal.name}</h1>
            <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.5rem' }}>
              {personal.location} | {personal.phone} | {personal.email}
            </p>
          </header>
        );
      case 'bw_blue_header':
        return (
          <header style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', background: config?.primaryColor || '#1a56a0', padding: '1.25rem 1.5rem', gap: '1rem', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: `${config?.nameSize || 32}px`, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>{personal.name}</h1>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', marginTop: '0.35rem' }}>{personal.title}</p>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)', textAlign: 'right', lineHeight: 1.8 }}>
                {personal.email && <div><strong>E-mail:</strong> {personal.email}</div>}
                {personal.phone && <div><strong>Telefone:</strong> {personal.phone}</div>}
                {personal.location && <div><strong>Endereço:</strong> {personal.location}</div>}
              </div>
            </div>
          </header>
        );
      case 'bw_boxed':
        return (
          <header style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
            <h1 style={{ fontSize: `${config?.nameSize || 48}px`, fontWeight: 900, color: '#000', lineHeight: 1 }}>{personal.name}</h1>
            <p style={{ fontSize: '1rem', fontWeight: 400, color: '#333', marginTop: '0.5rem' }}>{personal.title}</p>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem', fontSize: '0.85rem', color: '#444' }}>
              {personal.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={13} /> <strong>Telefone:</strong> {personal.phone}</span>}
              {personal.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={13} /> <strong>E-mail:</strong> {personal.email}</span>}
            </div>
            {personal.location && <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><MapPin size={13} /> <strong>Endereço:</strong> {personal.location}</div>}
          </header>
        );
      case 'minimal':

        return (
          <header style={{ textAlign: config?.textAlign || 'center', marginBottom: '3rem' }}>
            <h1 style={nameStyle}>{personal.name}</h1>
            <p style={subtitleStyle}>{personal.title}</p>
            <div style={{ display: 'flex', justifyContent: config?.textAlign === 'left' ? 'flex-start' : (config?.textAlign === 'right' ? 'flex-end' : 'center'), flexWrap: 'wrap', gap: '2rem', marginTop: '2rem', fontSize: '0.9rem', color: config?.textColor || '#94a3b8' }}>
              <span>{personal.email}</span>
              <span>{personal.phone}</span>
              <span>{personal.location}</span>
            </div>
          </header>
        );
      case 'classic':
        return (
          <header style={{ textAlign: config?.textAlign || 'center', borderBottom: `3px solid ${config?.primaryColor || '#1e293b'}`, paddingBottom: '2rem', marginBottom: '3rem' }}>
            <h1 style={nameStyle}>{personal.name}</h1>
            <p style={{ ...subtitleStyle, fontStyle: 'italic' }}>{personal.title}</p>
            <p style={{ fontSize: '1rem', marginTop: '1rem', color: config?.textColor || '#64748b', letterSpacing: '0.5px' }}>
              {personal.location} • {personal.phone} • {personal.email}
            </p>
          </header>
        );
      case 'block_header':
        return (
          <header style={{ background: `${config?.primaryColor}11` || '#e5e7eb', padding: '3rem 22mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: `1px solid ${config?.primaryColor}33` }}>
            <div style={{ flex: 1, textAlign: config?.textAlign || 'left' }}>
              <h1 style={nameStyle}>
                {personal.name.split(' ').map((n, i) => <div key={i}>{n}</div>)}
              </h1>
              <p style={subtitleStyle}>{personal.title}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: config?.textColor || '#475569', fontSize: '0.9rem', textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                {personal.phone} <Phone size={14} style={{ color: config?.primaryColor }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                {personal.email} <Mail size={14} style={{ color: config?.primaryColor }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem' }}>
                {personal.location} <MapPin size={14} style={{ color: config?.primaryColor }} />
              </div>
            </div>
          </header>
        );
      case 'sidebar_titles':
        return (
          <header style={{ marginBottom: '3rem', textAlign: config?.textAlign || 'left' }}>
            <h1 style={nameStyle}>{personal.name}</h1>
            <p style={subtitleStyle}>{personal.title}</p>
          </header>
        );
      case 'executive':
        return (
          <header style={{ textAlign: config?.textAlign || 'center', marginBottom: '3rem' }}>
            <h1 style={nameStyle}>{personal.name}</h1>
            <p style={subtitleStyle}>{personal.title}</p>
            <div style={{ width: '100%', height: '1px', background: config?.primaryColor || '#334155', margin: '2rem 0' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', color: config?.textColor || '#475569', fontSize: '0.85rem' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 800, color: config?.primaryColor || '#334155', marginBottom: '0.25rem' }}>Telefone</div>
                {personal.phone}
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, color: config?.primaryColor || '#334155', marginBottom: '0.25rem' }}>Endereço</div>
                {personal.location}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 800, color: config?.primaryColor || '#334155', marginBottom: '0.25rem' }}>Email</div>
                {personal.email}
              </div>
            </div>
          </header>
        );
      case 'professional_bar':
        return (
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '100%', height: '24px', background: '#333', marginBottom: '2rem', position: 'relative', display: 'flex' }}>
              <div style={{ width: '30px', height: '100%', background: '#ef4444', marginLeft: '100px' }}></div>
            </div>
            <h1 style={{ ...nameStyle, fontSize: '36px', letterSpacing: '2px' }}>{personal.name}</h1>
            <p style={{ ...subtitleStyle, fontSize: '0.9rem', color: '#333', marginTop: '0.5rem' }}>
              {personal.location} | {personal.phone} | {personal.email}
            </p>
          </header>
        );
      case 'blue_block':
        return (
          <header style={{ marginBottom: '3rem' }}>
            <div style={{ background: config?.primaryColor || '#1e3a8a', padding: '2.5rem', textAlign: 'center' }}>
              <h1 style={{ ...nameStyle, color: 'white', fontSize: '32px' }}>{personal.name}</h1>
            </div>
            <div style={{ background: '#cbd5e1', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#1e3a8a', fontWeight: 600 }}>
              {personal.location} • {personal.phone} • {personal.email}
            </div>
          </header>
        );
      case 'purple_line':
        return (
          <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ width: '80%', height: '12px', background: config?.primaryColor || '#9333ea', margin: '0 auto 2rem' }}></div>
            <h1 style={{ ...nameStyle, color: config?.primaryColor || '#9333ea', fontSize: '32px' }}>{personal.name}</h1>
            <p style={{ ...subtitleStyle, fontSize: '0.9rem', color: '#333', marginTop: '0.5rem', fontWeight: 800 }}>
              {personal.location.toUpperCase()} | {personal.phone} | {personal.email.toUpperCase()}
            </p>
            <div style={{ borderBottom: '2px dotted #9333ea', marginTop: '1.5rem', opacity: 0.5 }}></div>
          </header>
        );
      case 'timeline':
        return (
          <header style={{ marginBottom: '3rem', textAlign: config?.textAlign || 'left' }}>
            <h1 style={nameStyle}>{personal.name}</h1>
            <p style={subtitleStyle}>{personal.title}</p>
            <div style={{ width: '100%', height: '1px', background: config?.primaryColor || '#e2e8f0', margin: '1.5rem 0' }}></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', color: config?.textColor || '#334155', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Phone size={14} style={{ color: config?.primaryColor || '#000' }} /> {personal.phone}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={14} style={{ color: config?.primaryColor || '#000' }} /> {personal.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Mail size={14} style={{ color: config?.primaryColor || '#000' }} /> {personal.email}
              </div>
            </div>
          </header>
        );
      default:
        return (
          <header style={{ borderLeft: `10px solid ${config?.primaryColor || '#2563eb'}`, paddingLeft: '2rem', marginBottom: '3rem', textAlign: config?.textAlign || 'left' }}>
            <h1 style={nameStyle}>{personal.name}</h1>
            <div style={subtitleStyle}>{personal.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1.5rem', color: config?.textColor || '#64748b', fontSize: '1rem', justifyContent: config?.textAlign === 'left' ? 'flex-start' : (config?.textAlign === 'right' ? 'flex-end' : 'center') }}>
              {personal.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Mail size={16} style={{ color: config?.primaryColor }} /> {personal.email}</div>}
              {personal.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><Phone size={16} style={{ color: config?.primaryColor }} /> {personal.phone}</div>}
              {personal.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}><MapPin size={16} style={{ color: config?.primaryColor }} /> {personal.location}</div>}
            </div>
          </header>
        );
    }
  };

  return (
    <PreviewContainer ref={containerRef} $isPreviewMode={isPreviewMode}>
      <Scaler $scale={isPreviewMode ? 1 : scale} $isMobile={isMobile}>
        <Paper ref={ref} $isPreviewMode={isPreviewMode} $theme={theme} $config={config} id="resume-paper">
          <Watermark>
            <img src="/icons.png" alt="Watermark" />
          </Watermark>

          {(theme === 'bw_two_col') && (
            <div style={{ width: '32%', flexShrink: 0, background: '#f3f3f3', padding: '2rem 1.25rem', borderLeft: '1px solid #ccc' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#111', borderBottom: '1.5px solid #111', paddingBottom: '0.3rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contacto</h2>
                {personal.phone && <div style={{ fontSize: '0.82rem', color: '#333', marginBottom: '0.4rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Phone size={12} /> {personal.phone}</div>}
                {personal.location && <div style={{ fontSize: '0.82rem', color: '#333', marginBottom: '0.4rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}><MapPin size={12} /> {personal.location}</div>}
                {personal.email && <div style={{ fontSize: '0.82rem', color: '#333', marginBottom: '0.4rem', display: 'flex', gap: '0.4rem', alignItems: 'center' }}><Mail size={12} /> {personal.email}</div>}
              </div>
              {skills && skills.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#111', borderBottom: '1.5px solid #111', paddingBottom: '0.3rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Habilidades</h2>
                  {skills.map((s, i) => <div key={i} style={{ fontSize: '0.82rem', color: '#333', marginBottom: '0.3rem' }}>✓ {s}</div>)}
                </div>
              )}
              {languages && languages.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#111', borderBottom: '1.5px solid #111', paddingBottom: '0.3rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Idiomas</h2>
                  {languages.map((l, i) => <div key={i} style={{ fontSize: '0.82rem', color: '#333', marginBottom: '0.35rem' }}>{l.name}: <em>{l.level}</em></div>)}
                </div>
              )}
            </div>
          )}

          {(theme === 'bw_sidebar_accent') && (
            <div style={{ width: '30%', flexShrink: 0, background: '#f9f9f9', padding: '2rem 1.25rem', order: 2, borderLeft: '1px solid #eee' }}>
              {skills && skills.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#111', borderBottom: `2px solid ${config?.primaryColor || '#b91c1c'}`, paddingBottom: '0.3rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Competências</h2>
                  {skills.map((s, i) => <div key={i} style={{ fontSize: '0.82rem', color: '#333', marginBottom: '0.35rem' }}>{s}</div>)}
                </div>
              )}
              {languages && languages.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '13px', fontWeight: 800, color: '#111', borderBottom: `2px solid ${config?.primaryColor || '#b91c1c'}`, paddingBottom: '0.3rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Idiomas</h2>
                  {languages.map((l, i) => <div key={i} style={{ fontSize: '0.82rem', color: '#333', marginBottom: '0.35rem' }}>{l.name}</div>)}
                </div>
              )}
            </div>
          )}

          {(theme === 'creative' || theme === 'tech' || theme === 'modern_sidebar' || theme === 'teal_box') && (
            <Sidebar $config={config} style={{ 
              width: theme === 'teal_box' ? '35%' : '32%',
              order: theme === 'modern_sidebar' ? 2 : 0,
              background: theme === 'teal_box' ? 'white' : (config?.primaryColor || '#1e293b'),
              color: theme === 'teal_box' ? '#334155' : 'white',
              borderLeft: theme === 'modern_sidebar' ? '1px solid #e2e8f0' : 'none',
              padding: theme === 'teal_box' ? '2rem' : '2.5rem 1.5rem'
            }}>
              {theme === 'teal_box' && (
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: config?.primaryColor || '#2dd4bf' }}>
                    <Mail size={16} /> <span style={{ fontSize: '0.85rem' }}>{personal.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: config?.primaryColor || '#2dd4bf' }}>
                    <Phone size={16} /> <span style={{ fontSize: '0.85rem' }}>{personal.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: config?.primaryColor || '#2dd4bf' }}>
                    <MapPin size={16} /> <span style={{ fontSize: '0.85rem' }}>{personal.location}</span>
                  </div>
                </div>
              )}
              
              {(theme !== 'teal_box') && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.1)', 
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3.5rem',
                    fontWeight: 950,
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    color: 'white',
                    border: '4px solid rgba(255,255,255,0.2)'
                  }}>
                    {personal.name ? personal.name.charAt(0) : 'U'}
                  </div>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'white', letterSpacing: '-0.5px' }}>{personal.name}</h1>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, fontSize: '1rem', marginTop: '0.6rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{personal.title}</p>
                </div>
              )}

              {theme === 'modern_sidebar' && (
                <div style={{ width: '40px', height: '4px', background: config?.primaryColor || '#eab308', marginBottom: '2rem' }}></div>
              )}
              <div>
                <div className="section-title">Contato</div>
                {personal.email && <div className="contact-item"><Mail size={16} /> {personal.email}</div>}
                {personal.phone && <div className="contact-item"><Phone size={16} /> {personal.phone}</div>}
                {personal.location && <div className="contact-item"><MapPin size={16} /> {personal.location}</div>}
              </div>

              {skills && skills.length > 0 && (
                <div>
                  <div className="section-title">Habilidades</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {skills.map((s, i) => (
                      <span key={i} style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {languages && languages.length > 0 && (
                <div>
                  <div className="section-title">Idiomas</div>
                  {languages.map((l, i) => (
                    <div key={i} style={{ fontSize: '0.9rem', marginBottom: '0.6rem', color: '#cbd5e1' }}>
                      <strong style={{ color: 'white' }}>{l.name}</strong> • {l.level}
                    </div>
                  ))}
                </div>
              )}
            </Sidebar>
          )}

          <MainContent $theme={theme} style={{ padding: theme === 'teal_box' ? '0' : undefined }}>
            {theme === 'teal_box' && (
              <header style={{ background: config?.primaryColor || '#2dd4bf', padding: '3rem', textAlign: 'center', color: 'white', marginBottom: '3rem' }}>
                <div style={{ width: '60px', height: '60px', border: '1px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem', fontWeight: 600 }}>
                  {personal.name ? personal.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'DP'}
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 400, fontStyle: 'italic', fontFamily: 'serif' }}>{personal.name}</h1>
              </header>
            )}

            {theme === 'modern_sidebar' && (
              <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ ...nameStyle, fontSize: '2.5rem' }}>{personal.name}</h1>
                <div style={{ width: '100%', height: '1px', background: '#e2e8f0', margin: '1rem 0' }}></div>
              </header>
            )}

            {theme === 'bw_two_col' && (
              <header style={{ marginBottom: '2rem', borderBottom: '2px solid #111', paddingBottom: '1rem' }}>
                <h1 style={{ fontSize: `${config?.nameSize || 40}px`, fontWeight: 900, color: '#000', textTransform: 'uppercase', lineHeight: 1 }}>{personal.name}</h1>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: '#333', marginTop: '0.35rem' }}>{personal.title}</p>
              </header>
            )}

            {theme === 'bw_sidebar_accent' && (
              <header style={{ marginBottom: '2rem' }}>
                <div style={{ borderLeft: `4px solid ${config?.primaryColor || '#b91c1c'}`, paddingLeft: '0.75rem', marginBottom: '0.5rem' }}>
                  <h1 style={{ fontSize: `${config?.nameSize || 28}px`, fontWeight: 900, color: '#000', lineHeight: 1.1 }}>{personal.name}, {personal.title}</h1>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#555', display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingLeft: '1.1rem' }}>
                  {personal.location && <span>{personal.location}</span>}
                  {personal.phone && <span>{personal.phone}</span>}
                  {personal.email && <span>{personal.email}</span>}
                </div>
              </header>
            )}

            {renderHeader()}

            {personal.summary && (
              <Section title="Resumo Profissional" theme={theme} config={config}>
                <p style={{ 
                  fontSize: '0.95rem', 
                  lineHeight: config?.lineHeight || 1.7, 
                  color: config?.textColor || '#334155',
                  textAlign: config?.textAlign || (theme === 'executive' ? 'center' : 'left')
                }}>{personal.summary}</p>
              </Section>
            )}

            {experience && experience.length > 0 && (
              <Section title="Experiência Profissional" theme={theme} config={config}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme === 'timeline' ? '0' : '1.75rem' }}>
                  {experience.map((exp, idx) => (
                    <div key={exp.id} style={{ 
                      display: 'flex', 
                      gap: '2.5rem', 
                      position: 'relative',
                      pageBreakInside: 'avoid'
                    }}>
                      {theme === 'timeline' && (
                        <>
                          <div style={{ width: '120px', textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontWeight: 800, color: theme === 'dark' ? '#f8fafc' : '#000', fontSize: '1rem' }}>{exp.company}</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>{exp.startDate} — {exp.isCurrent ? 'Presente' : exp.endDate}</div>
                          </div>
                          <div style={{ position: 'relative', width: '20px', flexShrink: 0 }}>
                            <div style={{ 
                              position: 'absolute', 
                              left: '50%', 
                              top: '0', 
                              bottom: idx === experience.length - 1 && !education.length ? '50%' : '-2rem', 
                              width: '1px', 
                              background: '#e2e8f0',
                              transform: 'translateX(-50%)'
                            }}></div>
                            <div style={{ 
                              position: 'absolute', 
                              left: '50%', 
                              top: '8px', 
                              width: '10px', 
                              height: '10px', 
                              borderRadius: '50%', 
                              border: '2px solid #e2e8f0', 
                              background: 'white', 
                              transform: 'translateX(-50%)',
                              zIndex: 2
                            }}></div>
                          </div>
                          <div style={{ flex: 1, paddingBottom: '2rem', textAlign: config?.textAlign || 'left' }}>
                            <div style={{ fontWeight: 800, color: theme === 'dark' ? '#f8fafc' : '#000', fontSize: '1rem', marginBottom: '0.5rem' }}>{exp.role}</div>
                            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: theme === 'dark' ? '#cbd5e1' : '#475569', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                          </div>
                        </>
                      )}
                      {theme !== 'timeline' && (
                        <div style={{ width: '100%', textAlign: config?.textAlign || 'left' }}>
                          <div style={{ display: 'flex', justifyContent: config?.textAlign === 'center' ? 'center' : (config?.textAlign === 'right' ? 'flex-end' : 'space-between'), alignItems: 'flex-start', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <strong style={{ fontSize: '1.15rem', color: theme === 'dark' ? '#f8fafc' : '#0f172a', fontWeight: 800 }}>{exp.role}</strong>
                            <span style={{ fontSize: '0.9rem', color: theme === 'dark' ? '#94a3b8' : '#64748b', background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8fafc', padding: '4px 12px', borderRadius: '6px', fontWeight: 600, border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #f1f5f9' }}>
                              {exp.startDate} — {exp.isCurrent ? 'Presente' : exp.endDate}
                            </span>
                          </div>
                          <div style={{ color: config?.primaryColor || '#2563eb', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>{exp.company}</div>
                          <p style={{ fontSize: '1rem', lineHeight: config?.lineHeight || 1.6, color: config?.textColor || '#475569', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {education && education.length > 0 && (
              <Section title="Formação Acadêmica" theme={theme} config={config}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: theme === 'timeline' ? '0' : '1.5rem' }}>
                  {education.map((edu, idx) => (
                    <div key={edu.id} style={{ 
                      display: 'flex', 
                      gap: '2.5rem', 
                      position: 'relative',
                      pageBreakInside: 'avoid'
                    }}>
                      {theme === 'timeline' && (
                        <>
                          <div style={{ width: '120px', textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontWeight: 800, color: theme === 'dark' ? '#f8fafc' : '#000', fontSize: '1rem' }}>{edu.school}</div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>{edu.period}</div>
                          </div>
                          <div style={{ position: 'relative', width: '20px', flexShrink: 0 }}>
                            <div style={{ 
                              position: 'absolute', 
                              left: '50%', 
                              top: '-2rem', 
                              bottom: idx === education.length - 1 ? '50%' : '-1.5rem', 
                              width: '1px', 
                              background: '#e2e8f0',
                              transform: 'translateX(-50%)'
                            }}></div>
                            <div style={{ 
                              position: 'absolute', 
                              left: '50%', 
                              top: '8px', 
                              width: '10px', 
                              height: '10px', 
                              borderRadius: '50%', 
                              border: '2px solid #e2e8f0', 
                              background: 'white', 
                              transform: 'translateX(-50%)',
                              zIndex: 2
                            }}></div>
                          </div>
                          <div style={{ flex: 1, paddingBottom: '1.5rem', textAlign: config?.textAlign || 'left' }}>
                            <div style={{ fontWeight: 800, color: theme === 'dark' ? '#f8fafc' : '#000', fontSize: '1rem' }}>{edu.degree}</div>
                          </div>
                        </>
                      )}
                      {theme !== 'timeline' && (
                        <div style={{ width: '100%', textAlign: config?.textAlign || 'left' }}>
                          <div style={{ display: 'flex', justifyContent: config?.textAlign === 'center' ? 'center' : (config?.textAlign === 'right' ? 'flex-end' : 'space-between'), marginBottom: '0.4rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <strong style={{ fontSize: '1.15rem', color: theme === 'dark' ? '#f8fafc' : '#0f172a', fontWeight: 800 }}>{edu.degree}</strong>
                            <span style={{ fontSize: '0.9rem', color: theme === 'dark' ? '#94a3b8' : '#64748b', fontWeight: 600 }}>{edu.period}</span>
                          </div>
                          <div style={{ fontSize: '1rem', color: config?.primaryColor || '#475569', fontWeight: 600 }}>{edu.school}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {((theme !== 'creative' && theme !== 'tech' && theme !== 'modern_sidebar' && theme !== 'teal_box' && theme !== 'bw_sidebar_accent') || theme === 'teal_box' || theme === 'modern_sidebar') && skills && skills.length > 0 && (
              <Section title="Habilidades" theme={theme} config={config}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: config?.textAlign === 'center' ? 'center' : (config?.textAlign === 'right' ? 'flex-end' : 'flex-start') }}>
                  {skills.map((skill, index) => (
                    <span key={index} style={{ 
                      background: theme === 'teal_box' ? 'none' : (`${config?.primaryColor}11` || '#f8fafc'), 
                      padding: theme === 'teal_box' ? '0.2rem 0' : '0.4rem 1rem', 
                      borderRadius: theme === 'teal_box' ? '0' : '8px',
                      fontSize: '0.9rem',
                      color: config?.textColor || '#334155',
                      border: theme === 'teal_box' ? 'none' : `1.5px solid ${config?.primaryColor}33`,
                      fontWeight: 600,
                      width: theme === 'teal_box' ? '100%' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      {theme === 'teal_box' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#334155' }}></div>}
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {theme !== 'creative' && theme !== 'tech' && theme !== 'bw_sidebar_accent' && languages && languages.length > 0 && (
              <Section title="Idiomas" theme={theme} config={config}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: config?.textAlign === 'center' ? 'center' : (config?.textAlign === 'right' ? 'flex-end' : 'flex-start') }}>
                  {languages.map((l, i) => (
                    <div key={i} style={{ fontSize: '1rem', color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                      <strong style={{ color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}>{l.name}:</strong> {l.level}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {customSections && customSections.map((sec) => (
              <Section key={sec.id} title={sec.title} theme={theme} config={config}>
                <div style={{ 
                  padding: theme === 'block_header' ? '0 22mm' : '0',
                  textAlign: config?.textAlign || (theme === 'executive' ? 'center' : 'left')
                }}>
                  <p style={{ fontSize: '1rem', lineHeight: config?.lineHeight || 1.7, color: config?.textColor || '#334155', whiteSpace: 'pre-wrap' }}>{sec.content}</p>
                </div>
              </Section>
            ))}

            {theme === 'sidebar_titles' && (
              <div style={{ marginTop: '3rem', borderTop: '2px solid #1e3a8a', paddingTop: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', color: '#334155', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1e3a8a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={14} /></div>
                    {personal.phone}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1e3a8a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin size={14} /></div>
                    {personal.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1e3a8a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={14} /></div>
                    {personal.email}
                  </div>
                </div>
              </div>
            )}
          </MainContent>
        </Paper>
      </Scaler>
    </PreviewContainer>
  );
});

export default ResumePreview;
