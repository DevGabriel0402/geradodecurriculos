import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { resumeService } from '../services/resumeService';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, LogOut, Layout as LayoutIcon, X, Palette, Shield } from 'lucide-react';
import ResumePreview from '../components/editor/ResumePreview';
import { templateService } from '../services/templateService';
import { initialData, DEFAULT_TEMPLATES } from '../data/defaultTemplates';
import toast from 'react-hot-toast';
import Modal from '../components/common/Modal';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    padding-bottom: 0;
  }

  @media (max-width: 1023px) {
    padding-bottom: 80px;
  }
`;

const DesktopSidebar = styled.aside`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 280px;
    background: white;
    border-right: 1px solid #e2e8f0;
    height: 100vh;
    position: sticky;
    top: 0;
    padding: 2rem 1.5rem;
    z-index: 100;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 3rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }
`;

const SidebarItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  border: none;
  background: ${({ $active }) => $active ? '#eff6ff' : 'transparent'};
  color: ${({ $active }) => $active ? '#2563eb' : '#64748b'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;

  &:hover {
    background: ${({ $active }) => $active ? '#eff6ff' : '#f1f5f9'};
    color: ${({ $active }) => $active ? '#2563eb' : '#0f172a'};
  }
`;

const UserProfile = styled.div`
  margin-top: auto;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background: #2563eb;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    overflow: hidden;
    
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .info {
    flex: 1;
    overflow: hidden;
    span { display: block; font-size: 0.875rem; font-weight: 600; color: #1e293b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    small { display: block; font-size: 0.75rem; color: #64748b; }
  }

  .logout-btn {
    padding: 0.5rem;
    color: #64748b;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0.5rem;
    &:hover { color: #ef4444; background: #fee2e2; }
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 50;

  @media (min-width: 1024px) {
    background: transparent;
    border-bottom: none;
    padding: 2rem 3rem 1rem;
    position: static;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-weight: bold;
    font-size: 1.125rem;
    color: #1e293b;

    @media (min-width: 1024px) {
      display: none;
    }

    .icon {
      background-color: #2563eb;
      color: white;
      padding: 0.5rem;
      border-radius: 0.75rem;
    }
  }

  .page-title {
    display: none;
    @media (min-width: 1024px) {
      display: block;
      h1 { font-size: 1.875rem; font-weight: 800; color: #0f172a; margin: 0; }
    }
  }

  .user-actions {
    display: flex;
    align-items: center;
    position: relative;
    
    @media (min-width: 1024px) {
      display: none;
    }
    
    .avatar-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      border-radius: 9999px;
      overflow: hidden;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #2563eb;
      color: white;
      font-weight: 700;
      font-size: 1.125rem;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      transition: opacity 0.2s;
      
      &:hover {
        opacity: 0.9;
      }
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      padding: 0.5rem;
      min-width: 150px;
      z-index: 100;
      display: flex;
      flex-direction: column;

      button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #ef4444;
        background: none;
        border: none;
        font-weight: 600;
        cursor: pointer;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        transition: background 0.2s;
        width: 100%;
        justify-content: flex-start;

        &:hover {
          background: #fee2e2;
        }
      }
    }
  }
`;

const Main = styled.main`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    padding: 2rem 3rem 3rem;
  }

  h1.mobile-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1e293b;
    margin: 0;
    
    @media (min-width: 1024px) {
      display: none;
    }
  }

  p.subtitle {
    color: #64748b;
    margin-top: 0.25rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  justify-content: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1024px) {
    gap: 2.5rem;
    margin-top: 2rem;
  }
`;

const CreateCard = styled.button`
  background: white;
  border: 2px dashed #cbd5e1;
  border-radius: 1rem;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  .icon-wrapper {
    background-color: #dbeafe;
    color: #2563eb;
    padding: 0.75rem;
    border-radius: 9999px;
  }

  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    background: #eff6ff;
  }
`;

const ResumeCard = styled.div`
  background: white;
  border-radius: 1rem;
  height: 200px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  }

  .info {
    cursor: pointer;
    
    .title-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;

      h3 {
        font-size: 1.125rem;
        font-weight: bold;
        color: #1e293b;
      }
      
      svg {
        color: #3b82f6;
      }
    }
    
    p {
      font-size: 0.875rem;
      color: #64748b;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f1f5f9;
    padding-top: 1rem;

    .date {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    button {
      color: #ef4444;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;

      &:hover {
        background: #fee2e2;
      }
    }
  }
`;

const LoadingText = styled.div`
  margin-top: 2rem;
  color: #64748b;
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.05);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const NavItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: ${({ $active }) => $active ? '#2563eb' : '#64748b'};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
  height: 100%;
  justify-content: center;

  svg {
    transition: transform 0.2s;
  }

  &:hover {
    color: #2563eb;
    svg { transform: scale(1.1); }
  }
`;

const MiniResume = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.05);

  .m-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 8px;
    .m-name { height: 10px; width: 60%; background: #0f172a; border-radius: 2px; }
    .m-line { height: 6px; background: #cbd5e1; border-radius: 2px; }
  }

  .m-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 6px;
    .m-title { height: 6px; width: 40%; background: #94a3b8; border-radius: 2px; }
    .m-text { height: 4px; background: #f1f5f9; border-radius: 1px; }
  }

  &.theme-modern {
    .m-header { border-top: 2px solid #0f172a; padding-top: 6px; }
  }

  &.theme-minimal {
    .m-header { align-items: center; .m-name { width: 50%; } }
    .m-section { align-items: center; }
  }

  &.theme-classic {
    .m-header { align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
  }

  &.theme-corporate {
    .m-section { .m-title { background: #f1f5f9; height: 10px; width: 100%; padding: 2px; } }
  }

  &.theme-elegant {
    .m-header { flex-direction: row; justify-content: space-between; .m-name { width: 40%; } .m-line { width: 30%; } }
  }
`;

const TemplateCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1.25rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;

  .preview-box {
    width: 100%;
    aspect-ratio: 1 / 1.4;
    background: #f8fafc;
    overflow: hidden;
    padding: 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    border-bottom: 1px solid #f1f5f9;
  }

  .card-info {
    padding: 0.75rem 1rem;
    background: white;
    width: 100%;
    box-sizing: border-box;

    span {
      display: block;
      font-weight: 700;
      color: #0f172a;
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    small {
      display: block;
      color: #64748b;
      font-size: 0.75rem;
      margin-top: 0.1rem;
    }
  }

  &:hover {
    transform: translateY(-8px);
    border-color: #2563eb;
    box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.15);
    
    .template-img {
      transform: scale(1.05);
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 900px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;

  h2 { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
  
  button {
    background: #f1f5f9; border: none; padding: 0.5rem; border-radius: 9999px;
    cursor: pointer; display: flex; align-items: center; color: #64748b;
    &:hover { background: #e2e8f0; color: #0f172a; }
  }
`;

const ModalFooter = styled.div`
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  .btn-close {
    padding: 0.75rem 1.5rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;
    background: white; font-weight: 600; cursor: pointer; color: #64748b;
    &:hover { background: #f8fafc; color: #0f172a; }
  }

  .btn-use {
    padding: 0.75rem 2rem; border-radius: 0.5rem; background: #2563eb;
    color: white; border: none; font-weight: 700; cursor: pointer;
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    &:hover { background: #1d4ed8; }
  }
`;

// Modelos movidos para src/data/defaultTemplates.js
const ICON_MAP = {
  Plus,
  Layout: LayoutIcon,
  FileText,
  Palette
};

const getIcon = (iconName) => {
  return ICON_MAP[iconName] || FileText;
};


const LivePreview = ({ data }) => {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        // Calcula a escala para caber tanto na largura quanto na altura
        const scaleX = offsetWidth / 794;
        const scaleY = offsetHeight / 1123;
        setScale(Math.min(scaleX, scaleY) * 0.95); // 0.95 para deixar uma margem pequena
      }
    };
    updateScale();
    const timer = setTimeout(updateScale, 150);
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ 
        transform: `scale(${scale})`, 
        transformOrigin: 'center center', 
        width: '794px', 
        height: '1123px',
        pointerEvents: 'none',
        background: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <ResumePreview data={data} isPreviewMode={true} />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, type: 'warning', title: '', message: '', onConfirm: null });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('list'); // 'list' ou 'templates'
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Carrega currículos do Firestore
        const data = await resumeService.getUserResumes(currentUser.uid);
        setResumes(data);
        // Usa os templates diretamente do código (sempre atualizados)
        setTemplates(DEFAULT_TEMPLATES);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao carregar seus currículos.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  const handleDeleteTemplate = async (e, templateId) => {
    e.stopPropagation();
    setModal({
      open: true,
      type: 'warning',
      title: 'Excluir Modelo',
      message: 'Deseja realmente excluir este modelo?',
      onConfirm: async () => {
        try {
          await templateService.deleteTemplate(templateId);
          setTemplates(prev => prev.filter(t => t.id !== templateId));
          toast.success('Modelo excluído');
        } catch (error) {
          toast.error('Erro ao excluir');
        }
      }
    });
  };


  const handleCreateTemplateFromCurrent = async (resume) => {
    const title = window.prompt('Nome do novo modelo:');
    if (!title) return;
    const newTemplate = {
      id: `custom_${Date.now()}`,
      title,
      color: '#3b82f6',
      icon: 'LayoutIcon',
      config: resume.config,
      data: resume.data,
      order: templates.length
    };
    try {
      await templateService.saveTemplate(newTemplate);
      setTemplates(prev => [...prev, newTemplate]);
      toast.success('Modelo criado!');
    } catch (error) {
      toast.error('Erro ao criar modelo');
    }
  };

  async function handleCreate(template = {}) {
    try {
      const data = template.data ? {
        ...template.data,
        config: { ...template.data.config, ...template.config }
      } : initialData;
      
      const id = await resumeService.createResume(currentUser.uid, {
        title: `Currículo - ${template.title || 'Novo'}`,
        data: data
      });
      navigate(`/editor/${id}`);
    } catch (error) {
      toast.error('Erro ao criar currículo');
    }
  }

  async function handleDelete(id) {
    setModal({
      open: true,
      type: 'warning',
      title: 'Excluir Currículo',
      message: 'Deseja realmente deletar este currículo? Esta ação não pode ser desfeita.',
      onConfirm: async () => {
        try {
          await resumeService.deleteResume(id);
          setResumes(prev => prev.filter(r => r.id !== id));
          toast.success("Deletado com sucesso");
        } catch (error) {
          toast.error("Erro ao deletar");
        }
      }
    });
  }

  return (
    <DashboardContainer>
      <DesktopSidebar>
        <div className="logo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 1rem 2rem', gap: '0.35rem' }}>
          <img src="/imagelogo.png" alt="Logo" style={{ height: '60px', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
            Currículo<span style={{ color: '#2563eb' }}>Generator</span>
          </span>
        </div>
        <nav>
          <SidebarItem $active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
            <FileText size={20} /> Meus Currículos
          </SidebarItem>
          <SidebarItem $active={activeTab === 'templates'} onClick={() => setActiveTab('templates')}>
            <Plus size={20} /> Novos Modelos
          </SidebarItem>
          {currentUser?.role === 'admin' && (
            <SidebarItem onClick={() => navigate('/admin')} style={{ color: '#ef4444' }}>
              <Shield size={20} /> Painel Admin
            </SidebarItem>
          )}
        </nav>
        <UserProfile>
          <div className="avatar">
            {(currentUser?.photoURL || currentUser?.providerData?.[0]?.photoURL) ? (
              <img 
                src={currentUser?.photoURL || currentUser?.providerData?.[0]?.photoURL} 
                alt="Avatar" 
                referrerPolicy="no-referrer" 
              />
            ) : (
              (currentUser?.displayName || currentUser?.providerData?.[0]?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()
            )}
          </div>
          <div className="info">
            <span>{currentUser?.displayName || currentUser?.providerData?.[0]?.displayName || 'Usuário'}</span>
            <small>{currentUser?.email}</small>
          </div>
          <button className="logout-btn" onClick={() => { logout(); navigate('/login'); }} title="Sair">
            <LogOut size={18} />
          </button>
        </UserProfile>
      </DesktopSidebar>

      <MainContent>
        <Header>
          <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/imagelogo.png" alt="Logo" style={{ height: '36px', objectFit: 'contain' }} />
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px' }}>
              Currículo<span style={{ color: '#2563eb' }}>Generator</span>
            </span>
          </div>
          <div className="page-title">
            <h1>{activeTab === 'list' ? 'Meus Currículos' : 'Escolha um Design'}</h1>
          </div>
          <div className="user-actions" ref={dropdownRef}>
            <button className="avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
              {(currentUser?.photoURL || currentUser?.providerData?.[0]?.photoURL) ? (
                <img 
                  src={currentUser?.photoURL || currentUser?.providerData?.[0]?.photoURL} 
                  alt="Avatar" 
                  referrerPolicy="no-referrer" 
                />
              ) : (
                (currentUser?.displayName || currentUser?.providerData?.[0]?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()
              )}
            </button>
            
            {menuOpen && (
              <div className="dropdown">
                <button onClick={() => { logout(); navigate('/login'); }}>
                  <LogOut size={16} /> Sair
                </button>
              </div>
            )}
          </div>
        </Header>

        <Main>
          {activeTab === 'list' ? (
            <>
              <h1 className="mobile-title">Meus Currículos</h1>
              <p className="subtitle">Gerencie, edite ou crie novos currículos</p>

              {loading ? (
                <LoadingText>Carregando...</LoadingText>
              ) : resumes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '1.5rem', border: '2px dashed #e2e8f0' }}>
                  <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#94a3b8' }}>
                    <Plus size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Nenhum currículo ainda</h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Crie seu primeiro currículo profissional em minutos.</p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <button 
                      onClick={() => setActiveTab('templates')}
                      style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Ver Modelos
                    </button>
                  </div>
                </div>
              ) : (
                <Grid>
                  {resumes.map(resume => (
                    <TemplateCard 
                      key={resume.id} 
                      onClick={() => navigate(`/editor/${resume.id}`)}
                    >
                      <div className="preview-box">
                        <LivePreview data={resume.data} />
                      </div>
                      <div className="card-info">
                        <span>{resume.data?.personal?.name || 'Sem Nome'}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                          <small style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}></div>
                            {resume.data?.personal?.title || 'Currículo'}
                          </small>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {isAdmin && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleCreateTemplateFromCurrent(resume); }} 
                                style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: '2px', borderRadius: '4px' }}
                                title="Salvar como Modelo"
                              >
                                <Plus size={14} />
                              </button>
                            )}
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDelete(resume.id); }} 
                              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px', borderRadius: '4px', transition: 'color 0.2s' }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </TemplateCard>
                  ))}
                </Grid>
              )}
            </>
          ) : (
            <>
              <h1 className="mobile-title">Escolha um Design</h1>
              <p className="subtitle">Comece com um modelo ou em branco</p>
              
              <Grid>
                {templates.map(template => (
                  <TemplateCard 
                    key={template.id} 
                    onClick={() => {
                      if (template.id === 'blank') {
                        handleCreate(template);
                      } else {
                        setPreviewTemplate(template);
                      }
                    }} 
                  >
                    {isAdmin && template.id !== 'blank' && (
                      <button 
                        onClick={(e) => handleDeleteTemplate(e, template.id)}
                        style={{ 
                          position: 'absolute', 
                          top: '10px', 
                          right: '10px', 
                          zIndex: 10, 
                          background: 'white', 
                          border: 'none', 
                          borderRadius: '50%', 
                          padding: '6px', 
                          color: '#ef4444', 
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    <div className="preview-box">
                      {template.id === 'blank' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', color: '#94a3b8', background: '#f8fafc', gap: '0.75rem' }}>
                          <Plus size={40} strokeWidth={1.5} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Personalizar</span>
                        </div>
                      ) : template.data ? (
                        <LivePreview data={template.data} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', background: template.color || '#f1f5f9' }}>
                          {React.createElement(getIcon(template.icon), { size: 48, color: 'white' })}
                        </div>
                      )}
                    </div>
                    <div className="card-info">
                      <span>{template.title}</span>
                    </div>
                  </TemplateCard>
                ))}
              </Grid>
            </>
          )}
        </Main>
      </MainContent>

      {previewTemplate && (
        <Overlay onClick={() => setPreviewTemplate(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h2>{previewTemplate.title}</h2>
              <button onClick={() => setPreviewTemplate(null)}><X size={20} /></button>
            </ModalHeader>
            <div style={{ flex: 1, padding: '1.5rem', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
              <LivePreview data={previewTemplate.data} />
            </div>
            <ModalFooter>
              <button className="btn-use" onClick={() => handleCreate(previewTemplate)}>Usar Modelo</button>
            </ModalFooter>
          </ModalContent>
        </Overlay>
      )}

      <BottomNav>
        <NavItem $active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
          <FileText size={24} />
          <span>Currículos</span>
        </NavItem>
        <NavItem $active={activeTab === 'templates'} onClick={() => setActiveTab('templates')}>
          <Plus size={24} />
          <span>Novo</span>
        </NavItem>
      </BottomNav>
      <Modal 
        isOpen={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        onConfirm={modal.onConfirm}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        confirmText="Confirmar"
        cancelText="Voltar"
      />
    </DashboardContainer>
  );
}
