import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Briefcase, Plus, Palette, PlusCircle, Trash2, GraduationCap, Award, Languages, Layout, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '../common/Input';

const SidebarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 80px;
  overflow-x: hidden;

  @media (min-width: 1024px) {
    width: 450px;
    flex-shrink: 0;
    padding-bottom: 0;
  }
`;

const Tabs = styled.div`
  display: flex;
  background: white;
  padding: 0.25rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow-x: auto;

  @media (max-width: 1023px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 0;
    border-top: 1px solid #e2e8f0;
    border-bottom: none;
    border-left: none;
    border-right: none;
    padding: 0.5rem;
    z-index: 100;
    justify-content: space-around;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
    
    button {
      flex-direction: column;
      font-size: 0.75rem;
      gap: 0.2rem;
      padding: 0.6rem 0.2rem;
      border-radius: 0.75rem;
      flex: 1;
      min-height: 56px;
    }
  }

  @media (min-width: 1024px) {
    margin-top: 1rem;
  }

  button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    font-weight: 600;
    white-space: nowrap;
    border: none;
    cursor: pointer;
    transition: all 0.2s;

    &.active {
      background-color: #2563eb;
      color: white;
      box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);
    }

    &.inactive {
      background-color: transparent;
      color: #64748b;
      &:hover {
        background-color: #f8fafc;
      }
    }
  }
`;

const ContentPanel = styled.div`
  background: white;
  border-radius: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  overflow: visible;

  @media (min-width: 1024px) {
    max-height: calc(100vh - 160px);
    overflow-y: auto;
  }

  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const SectionHeader = styled.h3`
  font-weight: 700;
  color: #1e293b;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap || '1rem'};
`;

const FlexRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 140px));
  gap: 0.75rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.625rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  min-height: 100px;
  outline: none;
  font-family: inherit;

  &:focus {
    border-color: #3b82f6;
    background-color: white;
  }
`;

const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

const IconButton = styled.button`
  padding: 0.375rem;
  background-color: ${({ bg }) => bg || '#eff6ff'};
  color: ${({ color }) => color || '#2563eb'};
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ hoverBg }) => hoverBg || '#dbeafe'};
  }
`;

const ItemCard = styled.div`
  padding: 1rem;
  border: 1px dashed #cbd5e1;
  border-radius: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .delete-btn {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    padding: 0.375rem;
    background-color: white;
    border: 1px solid #fee2e2;
    color: #ef4444;
    border-radius: 9999px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;

    &:hover {
      background-color: #fef2f2;
    }
  }
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;

const ThemeButton = styled.button`
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 2px solid ${({ active }) => active ? '#3b82f6' : '#f1f5f9'};
  background-color: ${({ active }) => active ? '#eff6ff' : 'white'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  .circle {
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    background-color: ${({ color }) => color};
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #334155;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SelectButton = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid ${({ $active }) => $active ? '#2563eb' : '#e2e8f0'};
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: capitalize;
  cursor: pointer;
  background-color: ${({ $active }) => $active ? '#2563eb' : 'white'};
  color: ${({ $active }) => $active ? 'white' : '#334155'};
  min-width: 80px;
`;

const Subtitle = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: -0.5rem;
`;

const formatPhone = (value) => {
  if (!value) return '';
  let v = value.replace(/\D/g, '');
  if (v.length <= 10) {
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
    v = v.replace(/(\d{5})(\d)/, '$1-$2');
  }
  return v.substring(0, 15);
};

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const TemplateItem = styled.button`
  background: white;
  border: 2px solid ${props => props.$active ? '#2563eb' : '#e2e8f0'};
  border-radius: 0.75rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;

  &:hover {
    border-color: #2563eb;
    transform: translateY(-2px);
  }

  .preview {
    width: 100%;
    aspect-ratio: 1 / 1.4;
    background: #f8fafc;
    border-radius: 0.4rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #1e293b;
    text-align: center;
    width: 100%;
  }
`;

const ICON_MAP = {
  Plus,
  Layout,
  FileText,
  Palette
};

export default function EditorSidebar({ data, setData, updateData, addItem, removeItem, templates = [] }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [cepValue, setCepValue] = useState('');
  const [templatesOpen, setTemplatesOpen] = useState(false);

  const handleCepBlur = async () => {
    const cep = cepValue.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await response.json();
        if (!json.erro) {
          const newLocation = `${json.bairro}, ${json.localidade} - ${json.uf}`;
          updateData('personal.location', newLocation);
          toast.success('Localização preenchida!');
        } else {
          toast.error('CEP não encontrado');
        }
      } catch (error) {
        toast.error('Erro ao buscar CEP');
      }
    }
  };

  const tabs = [
    { id: 'personal', icon: User, label: 'Perfil' },
    { id: 'experience', icon: Briefcase, label: 'Exp.' },
    { id: 'custom', icon: Plus, label: 'Extras' },
    { id: 'design', icon: Palette, label: 'Design' }
  ];

  const handleTemplateSwitch = (template) => {
    if (!template.config) return;
    
    // Update config but keep existing data
    setData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        ...template.config
      }
    }));
    toast.success(`Layout ${template.title} aplicado!`);
  };

  return (
    <SidebarContainer className="no-print">
      <Tabs className="no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? 'active' : 'inactive'}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </Tabs>

      <ContentPanel className="custom-scroll">
        {activeTab === 'personal' && (
          <FlexColumn $gap="1rem">
            <SectionHeader>Informações Básicas</SectionHeader>
            <Input label="Nome Completo" value={data.personal.name} onChange={v => updateData('personal.name', v)} />
            <FlexRow>
              <Input label="E-mail" value={data.personal.email} onChange={v => updateData('personal.email', v)} />
              <Input label="Telefone" value={data.personal.phone} onChange={v => updateData('personal.phone', formatPhone(v))} />
            </FlexRow>
            <FlexRow>
              <Input 
                label="CEP (Busca Auto)" 
                value={cepValue}
                onChange={v => {
                  let formatted = v.replace(/\D/g, '');
                  if (formatted.length > 5) formatted = formatted.replace(/^(\d{5})(\d)/, '$1-$2');
                  setCepValue(formatted.substring(0, 9));
                }} 
                onBlur={handleCepBlur}
                placeholder="00000-000"
              />
              <Input label="Localização" value={data.personal.location} onChange={v => updateData('personal.location', v)} />
            </FlexRow>
            <Input label="Cargo/Título Profissional" value={data.personal.title} onChange={v => updateData('personal.title', v)} />
            <FlexColumn $gap="0.25rem">
              <Label>Resumo Profissional</Label>
              <Textarea 
                value={data.personal.summary} 
                onChange={e => updateData('personal.summary', e.target.value)}
                placeholder="Conte um pouco sobre sua trajetória e objetivos..."
              />
            </FlexColumn>
          </FlexColumn>
        )}

        {activeTab === 'experience' && (
          <FlexColumn $gap="1.5rem">
            <SectionHeader>
              Experiência Profissional
              <IconButton onClick={() => addItem('experience')}>
                <PlusCircle size={20} />
              </IconButton>
            </SectionHeader>
            {data.experience.map((exp, idx) => (
              <ItemCard key={exp.id}>
                <button 
                  onClick={() => removeItem('experience', exp.id)} 
                  className="delete-btn"
                >
                  <Trash2 size={14} />
                </button>
                <Input label="Empresa" value={exp.company} onChange={v => updateData(`experience.${idx}.company`, v)} />
                <Input label="Cargo" value={exp.role} onChange={v => updateData(`experience.${idx}.role`, v)} />
                <DateGrid>
                  <Input 
                    label="Início" 
                    placeholder="MM/AAAA" 
                    value={exp.startDate} 
                    onChange={v => {
                      let val = v.replace(/\D/g, '');
                      if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,6);
                      updateData(`experience.${idx}.startDate`, val);
                    }} 
                  />
                  {!exp.isCurrent && (
                    <Input 
                      label="Fim" 
                      placeholder="MM/AAAA" 
                      value={exp.endDate} 
                      onChange={v => {
                        let val = v.replace(/\D/g, '');
                        if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2,6);
                        updateData(`experience.${idx}.endDate`, val);
                      }} 
                    />
                  )}
                </DateGrid>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
                  <input 
                    type="checkbox" 
                    id={`current-${exp.id}`}
                    style={{ width: '1.125rem', height: '1.125rem', cursor: 'pointer', accentColor: '#2563eb' }}
                    checked={exp.isCurrent} 
                    onChange={e => updateData(`experience.${idx}.isCurrent`, e.target.checked)} 
                  />
                  <label htmlFor={`current-${exp.id}`} style={{ fontSize: '0.875rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                    Trabalho aqui atualmente
                  </label>
                </div>
                <FlexColumn $gap="0.25rem">
                  <Label>Descrição</Label>
                  <Textarea value={exp.description} onChange={e => updateData(`experience.${idx}.description`, e.target.value)} />
                </FlexColumn>
              </ItemCard>
            ))}
          </FlexColumn>
        )}

        {activeTab === 'custom' && (
          <FlexColumn $gap="1.5rem">
            {/* Formação Acadêmica */}
            <SectionHeader>
              Formação Acadêmica
              <IconButton onClick={() => addItem('education')}>
                <PlusCircle size={20} />
              </IconButton>
            </SectionHeader>
            {data.education && data.education.map((edu, idx) => (
              <ItemCard key={edu.id}>
                <button onClick={() => removeItem('education', edu.id)} className="delete-btn"><Trash2 size={14} /></button>
                <Input label="Instituição" value={edu.school} onChange={v => updateData(`education.${idx}.school`, v)} />
                <Input label="Curso/Grau" value={edu.degree} onChange={v => updateData(`education.${idx}.degree`, v)} />
                <Input label="Período" placeholder="Ex: 2018 - 2022" value={edu.period} onChange={v => updateData(`education.${idx}.period`, v)} />
              </ItemCard>
            ))}

            {/* Habilidades */}
            <SectionHeader>
              Habilidades
              <IconButton onClick={() => updateData('skills', [...(data.skills || []), ''])}>
                <PlusCircle size={20} />
              </IconButton>
            </SectionHeader>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {data.skills && data.skills.map((skill, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <Input 
                    value={skill} 
                    onChange={v => {
                      const newSkills = [...data.skills];
                      newSkills[idx] = v;
                      updateData('skills', newSkills);
                    }} 
                    placeholder="Ex: React"
                  />
                  <button 
                    onClick={() => updateData('skills', data.skills.filter((_, i) => i !== idx))}
                    style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', zIndex: 10 }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Idiomas */}
            <SectionHeader>
              Idiomas
              <IconButton onClick={() => updateData('languages', [...(data.languages || []), { name: '', level: 'Básico' }])}>
                <PlusCircle size={20} />
              </IconButton>
            </SectionHeader>
            {data.languages && data.languages.map((lang, idx) => (
              <ItemCard key={idx}>
                <button onClick={() => updateData('languages', data.languages.filter((_, i) => i !== idx))} className="delete-btn"><Trash2 size={14} /></button>
                <Input label="Idioma" value={lang.name} onChange={v => updateData(`languages.${idx}.name`, v)} />
                <FlexColumn $gap="0.25rem">
                  <Label>Nível</Label>
                  <ButtonGroup>
                    {['Básico', 'Intermediário', 'Avançado', 'Fluente'].map(lvl => (
                      <SelectButton 
                        key={lvl} 
                        $active={lang.level === lvl}
                        onClick={() => updateData(`languages.${idx}.level`, lvl)}
                      >
                        {lvl}
                      </SelectButton>
                    ))}
                  </ButtonGroup>
                </FlexColumn>
              </ItemCard>
            ))}

            {/* Outras Seções */}
            <SectionHeader>
              Seções Extras
              <IconButton onClick={() => addItem('customSections')}>
                <PlusCircle size={20} />
              </IconButton>
            </SectionHeader>
            <FlexColumn $gap="0.5rem">
              <Label>Sugestões Rápidas</Label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {[
                  { title: 'Cursos e Certificações', content: '' },
                  { title: 'Referências', content: '' },
                  { title: 'Projetos', content: '' },
                  { title: 'Voluntariado', content: '' }
                ].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const newId = Date.now().toString();
                      updateData('customSections', [...data.customSections, { id: newId, ...s }]);
                      toast.success(`${s.title} adicionado!`);
                    }}
                    style={{
                      padding: '0.4rem 0.75rem', borderRadius: '9999px', border: '1px solid #e2e8f0', background: 'white', fontSize: '0.75rem', fontWeight: 600, color: '#475569', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseOver={e => { e.target.style.borderColor = '#2563eb'; e.target.style.color = '#2563eb'; }}
                    onMouseOut={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.color = '#475569'; }}
                  >
                    + {s.title}
                  </button>
                ))}
              </div>
            </FlexColumn>
            {data.customSections.map((sec, idx) => (
              <ItemCard key={sec.id}>
                <button onClick={() => removeItem('customSections', sec.id)} className="delete-btn"><Trash2 size={14} /></button>
                <Input label="Título" value={sec.title} onChange={v => updateData(`customSections.${idx}.title`, v)} />
                <Textarea value={sec.content} onChange={e => updateData(`customSections.${idx}.content`, e.target.value)} />
              </ItemCard>
            ))}
          </FlexColumn>
        )}

        {activeTab === 'design' && (
          <FlexColumn $gap="1.5rem">

            {/* Acordeão de Modelos */}
            <div style={{ borderRadius: '10px', border: '1.5px solid #e2e8f0', overflow: 'hidden' }}>
              <button
                onClick={() => setTemplatesOpen(o => !o)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  background: templatesOpen ? '#2563eb' : '#f8fafc',
                  color: templatesOpen ? 'white' : '#1e293b',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                  letterSpacing: '0.3px'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Layout size={15} /> Modelos de Layout
                </span>
                <span style={{ fontSize: '1rem', transition: 'transform 0.2s', transform: templatesOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}>▾</span>
              </button>
              {templatesOpen && (
                <div style={{ padding: '0.75rem', borderTop: '1px solid #e2e8f0', background: 'white' }}>
                  <TemplateGrid>
                    {templates.map(t => (
                      <TemplateItem
                        key={t.id}
                        $active={data.config.theme === t.config?.theme}
                        onClick={() => { handleTemplateSwitch(t); setTemplatesOpen(false); }}
                      >
                        <div className="preview">
                          {t.id === 'blank' ? (
                            <Plus size={24} color="#94a3b8" />
                          ) : (
                            <div style={{ background: t.color || '#f1f5f9', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {t.icon && ICON_MAP[t.icon] ? React.createElement(ICON_MAP[t.icon], { size: 24, color: 'white' }) : <Layout size={24} color="white" />}
                            </div>
                          )}
                        </div>
                        <span>{t.title}</span>
                      </TemplateItem>
                    ))}
                  </TemplateGrid>
                </div>
              )}
            </div>

            <SectionHeader>Estilo Visual</SectionHeader>
            
            <SectionHeader>Cores do Documento</SectionHeader>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <FlexColumn $gap="0.4rem">
                <Label>Cor Primária (Títulos)</Label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    value={data.config.primaryColor || '#2563eb'} 
                    onChange={e => updateData('config.primaryColor', e.target.value)}
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{data.config.primaryColor || '#2563eb'}</span>
                </div>
              </FlexColumn>
              <FlexColumn $gap="0.4rem">
                <Label>Cor do Nome</Label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    value={data.config.titleColor || '#0f172a'} 
                    onChange={e => updateData('config.titleColor', e.target.value)}
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{data.config.titleColor || '#0f172a'}</span>
                </div>
              </FlexColumn>
              <FlexColumn $gap="0.4rem">
                <Label>Cor do Texto</Label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    value={data.config.textColor || '#1a1a1a'} 
                    onChange={e => updateData('config.textColor', e.target.value)}
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{data.config.textColor || '#1a1a1a'}</span>
                </div>
              </FlexColumn>
              <FlexColumn $gap="0.4rem">
                <Label>Cor de Fundo</Label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input 
                    type="color" 
                    value={data.config.backgroundColor || '#ffffff'} 
                    onChange={e => updateData('config.backgroundColor', e.target.value)}
                    style={{ width: '40px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{data.config.backgroundColor || '#ffffff'}</span>
                </div>
              </FlexColumn>
            </div>

            <FlexColumn $gap="0.5rem">
              <Label>Fonte Principal</Label>
              <ButtonGroup>
                {[
                  { id: "Arial, sans-serif", label: 'Arial' },
                  { id: "Calibri, 'Trebuchet MS', sans-serif", label: 'Calibri' },
                  { id: "Georgia, serif", label: 'Georgia' },
                  { id: "'EB Garamond', serif", label: 'Garamond' },
                  { id: "Helvetica, Arial, sans-serif", label: 'Helvetica' }
                ].map(f => (
                  <SelectButton 
                    key={f.id}
                    onClick={() => updateData('config.fontFamily', f.id)}
                    $active={(data.config.fontFamily || "Arial, sans-serif") === f.id}
                  >
                    {f.label}
                  </SelectButton>
                ))}
              </ButtonGroup>
            </FlexColumn>

            <FlexColumn $gap="0.85rem">
              <Label>Alinhamento do Texto</Label>
              <ButtonGroup>
                {['left', 'center', 'right'].map(align => (
                  <SelectButton 
                    key={align}
                    onClick={() => updateData('config.textAlign', align)}
                    $active={(data.config.textAlign || 'left') === align}
                  >
                    {align === 'left' ? 'Esquerda' : align === 'center' ? 'Centro' : 'Direita'}
                  </SelectButton>
                ))}
              </ButtonGroup>
            </FlexColumn>

            <FlexColumn $gap="0.85rem">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Label>Tamanho do Nome</Label>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb' }}>{data.config.nameSize || 32}px</span>
              </div>
              <input 
                type="range" 
                min="20" max="60" 
                value={data.config.nameSize || 32} 
                onChange={e => updateData('config.nameSize', parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </FlexColumn>

            <FlexColumn $gap="0.85rem">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Label>Tamanho do Cargo</Label>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb' }}>{data.config.titleSize || 18}px</span>
              </div>
              <input 
                type="range" 
                min="12" max="32" 
                value={data.config.titleSize || 18} 
                onChange={e => updateData('config.titleSize', parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </FlexColumn>

            <FlexColumn $gap="0.85rem">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Label>Tamanho dos Títulos de Seção</Label>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb' }}>{data.config.sectionTitleSize || 18}px</span>
              </div>
              <input 
                type="range" 
                min="14" max="28" 
                value={data.config.sectionTitleSize || 18} 
                onChange={e => updateData('config.sectionTitleSize', parseInt(e.target.value))}
                style={{ width: '100%', cursor: 'pointer', accentColor: '#2563eb' }}
              />
            </FlexColumn>

            <FlexColumn $gap="0.85rem">
              <Label>Opções de Destaque</Label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    checked={data.config.boldName !== false} 
                    onChange={e => updateData('config.boldName', e.target.checked)}
                  />
                  <span style={{ fontSize: '0.875rem' }}>Nome em Negrito</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    checked={data.config.uppercaseName === true} 
                    onChange={e => updateData('config.uppercaseName', e.target.checked)}
                  />
                  <span style={{ fontSize: '0.875rem' }}>Nome em Maiúsculo</span>
                </div>
              </div>
            </FlexColumn>

            <FlexColumn $gap="0.5rem">
              <Label>Espaçamento Entre Linhas</Label>
              <ButtonGroup>
                {[
                  { id: '1.2', label: 'Compacto' },
                  { id: '1.5', label: 'Normal' },
                  { id: '1.8', label: 'Largo' }
                ].map(lh => (
                  <SelectButton 
                    key={lh.id}
                    onClick={() => updateData('config.lineHeight', lh.id)}
                    $active={(data.config.lineHeight || '1.5') === lh.id}
                  >
                    {lh.label}
                  </SelectButton>
                ))}
              </ButtonGroup>
            </FlexColumn>
          </FlexColumn>
        )}
      </ContentPanel>
    </SidebarContainer>
  );
}
