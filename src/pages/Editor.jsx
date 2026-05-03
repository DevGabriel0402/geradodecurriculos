import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { resumeService } from '../services/resumeService';
import { templateService } from '../services/templateService';
import { DEFAULT_TEMPLATES } from '../data/defaultTemplates';
import EditorSidebar from '../components/editor/EditorSidebar';
import ResumePreview from '../components/editor/ResumePreview';
import TipsModal from '../components/editor/TipsModal';
import { Eye, Edit3, Download, ArrowLeft, LogOut, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const EditorContainer = styled.div`
  min-height: 100vh;
  background-color: #f0f2f5;
  color: #0f172a;
  display: flex;
  flex-direction: column;

  @media print {
    background-color: white !important;
    min-height: auto !important;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
  width: 100%;

  @media print {
    display: none;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  .back-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #64748b;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #f1f5f9;
      color: #0f172a;
    }
  }

  .icon-wrapper {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info-btn {
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.25rem;
    border-radius: 9999px;
    margin-left: 0.25rem;
    
    &:hover {
      background: #e2e8f0;
      color: #3b82f6;
    }
  }
`;

const BrandName = styled.span`
  font-size: 0.85rem;
  font-weight: 950;
  color: #1e293b;
  display: none;
  
  @media (min-width: 640px) {
    display: block;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .action-buttons {
    display: flex;
    gap: 0.5rem;
  }

  .btn-print {
    display: none;
    @media (min-width: 1024px) {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.25rem;
      background-color: #0f172a;
      color: white;
      border: none;
      border-radius: 0.75rem;
      font-weight: 700;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background-color: #000;
        transform: translateY(-1px);
      }
    }
  }

  .user-menu {
    position: relative;
    
    .avatar {
      background: #2563eb;
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 9999px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      
      img { width: 100%; height: 100%; object-fit: cover; }
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

const ViewToggleDesktop = styled.button`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
    background-color: transparent;
    color: #475569;

    &:hover {
      background-color: #f1f5f9;
    }
  }
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 1023px) {
    flex-direction: column;
    padding: 1rem 0;
    gap: 1rem;
  }

  @media print {
    display: block;
    height: auto;
    overflow: visible;
    max-width: none;
    margin: 0;
    padding: 0;
  }
`;

const DownloadMobile = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 150px;
  right: 1.25rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background-color: #0f172a;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  z-index: 120;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.9);
  }

  @media print {
    display: none;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ViewToggleMobile = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 80px;
  right: 1.25rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  background-color: #2563eb;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
  z-index: 120;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.9);
  }

  @media print {
    display: none;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [data, setData] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('edit'); // 'edit' ou 'preview'
  const [menuOpen, setMenuOpen] = useState(false);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const dropdownRef = useRef(null);
  const targetRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function loadResume() {
      try {
        const [resumeData, templateData] = await Promise.all([
          resumeService.getResumeById(id),
          templateService.getTemplates()
        ]);

        if (resumeData) {
          setData(resumeData.data);
        } else {
          toast.error('Currículo não encontrado');
          navigate('/dashboard');
        }
        // If template collection is empty in Firestore, use local defaults as fallback
        setTemplates(templateData && templateData.length > 0 ? templateData : DEFAULT_TEMPLATES);
      } catch (error) {
        toast.error('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }
    loadResume();
  }, [id, navigate]);

  // Auto-save logic
  useEffect(() => {
    if (!data || loading) return;

    const saveTimeout = setTimeout(async () => {
      setSaving(true);
      try {
        await resumeService.updateResume(id, { data });
        console.log("Auto-save successful");
      } catch (error) {
        console.error("Auto-save failed", error);
      } finally {
        setSaving(false);
      }
    }, 2000); // Debounce de 2 segundos

    return () => clearTimeout(saveTimeout);
  }, [data, id, loading]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateData = (path, value) => {
    setData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let current = newData;
      for (let i = 0; i < parts.length - 1; i++) current = current[parts[i]];
      current[parts[parts.length - 1]] = value;
      return newData;
    });
  };

  const addItem = (type) => {
    const templates = {
      experience: { id: Date.now().toString(), company: "", role: "", period: "", description: "" },
      education: { id: Date.now().toString(), institution: "", degree: "", period: "" },
      customSections: { id: Date.now().toString(), title: "Nova Seção", content: "" }
    };
    setData(prev => ({ ...prev, [type]: [...(prev[type] || []), templates[type]] }));
    toast.success('Item adicionado!');
  };

  const removeItem = (type, itemId) => {
    setData(prev => ({ ...prev, [type]: prev[type].filter(i => i.id !== itemId) }));
    toast.error('Item removido');
  };

  const handlePrint = () => {
    toast.loading('Preparando PDF...', { duration: 2000 });
    setTimeout(() => {
      window.print();
    }, 500);
  };

  if (loading || !data) return <div style={{ padding: '2rem', textAlign: 'center' }}>Carregando Editor...</div>;

  return (
    <EditorContainer>
      <Header>
        <HeaderContent>
          <Brand style={{ gap: '8px' }}>
            <button className="back-btn" onClick={() => navigate('/dashboard')} title="Voltar ao Dashboard">
              <ArrowLeft size={20} />
            </button>
            <img src="/icons.png" alt="Icon" style={{ height: '32px', objectFit: 'contain' }} />
            <BrandName>PROCURRICULOS</BrandName>
            {saving && <small style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.75rem', background: '#dbeafe', padding: '2px 8px', borderRadius: '4px', marginLeft: '8px' }}>Salvando...</small>}
            <button className="info-btn" onClick={() => setTipsOpen(true)} title="Dicas de Currículo">
              <Info size={18} />
            </button>
          </Brand>

          <Actions>
            <div className="action-buttons">
              <ViewToggleDesktop onClick={() => setView(view === 'edit' ? 'preview' : 'edit')}>
                {view === 'edit' ? <><Eye size={18} /> Visualizar</> : <><Edit3 size={18} /> Editar</>}
              </ViewToggleDesktop>
              
              <button className="btn-print" onClick={handlePrint}>
                <Download size={18} /> Gerar PDF
              </button>
            </div>

            <div className="user-menu" ref={dropdownRef}>
              <button className="avatar" onClick={() => setMenuOpen(!menuOpen)}>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.displayName} />
                ) : (
                  (currentUser?.displayName || currentUser?.email || 'U').charAt(0).toUpperCase()
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
          </Actions>
        </HeaderContent>
      </Header>

      {(!isMobile || view === 'preview') && (
        <DownloadMobile onClick={handlePrint} title="Gerar PDF">
          <Download size={24} />
        </DownloadMobile>
      )}
      
      <ViewToggleMobile onClick={() => setView(view === 'edit' ? 'preview' : 'edit')} title={view === 'edit' ? 'Visualizar' : 'Editar'}>
        {view === 'edit' ? <Eye size={24} /> : <Edit3 size={24} />}
      </ViewToggleMobile>

      <MainLayout>
        {(!isMobile || view === 'edit') && (
          <EditorSidebar 
            data={data} 
            setData={setData}
            updateData={updateData} 
            addItem={addItem} 
            removeItem={removeItem} 
            templates={templates}
          />
        )}
        
        {(!isMobile || view === 'preview') && (
          <ResumePreview 
            ref={targetRef} 
            data={data} 
            isPreviewMode={view === 'preview'} 
          />
        )}
      </MainLayout>

      <TipsModal isOpen={tipsOpen} onClose={() => setTipsOpen(false)} />
    </EditorContainer>
  );
}
