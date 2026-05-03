import React from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';

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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;

  h2 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
  }

  button {
    background: #f1f5f9;
    border: none;
    padding: 0.5rem;
    border-radius: 9999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #64748b;

    &:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
  }
`;

const Body = styled.div`
  padding: 1.5rem;
  color: #334155;
  font-size: 0.875rem;
  line-height: 1.6;

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #2563eb;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;

    &:first-child {
      margin-top: 0;
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 1.25rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    color: #0f172a;
  }
`;

export default function TipsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} className="no-print">
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Dicas para um Currículo de Excelência</h2>
          <button onClick={onClose}><X size={20} /></button>
        </Header>
        <Body>
          <h3>1. Estrutura e Conteúdo Essencial</h3>
          <ul>
            <li><strong>Dados Pessoais:</strong> Nome completo, telefone (com DDD), e-mail profissional, cidade/estado e LinkedIn. Evite documentos como CPF ou endereço completo.</li>
            <li><strong>Objetivo Profissional:</strong> Uma frase curta indicando a área ou cargo pretendido.</li>
            <li><strong>Resumo Profissional:</strong> Breve parágrafo de 4 a 6 linhas destacando suas qualificações e realizações.</li>
            <li><strong>Experiência Profissional:</strong> Ordene da mais recente para a mais antiga, detalhando suas atividades e, principalmente, os resultados alcançados.</li>
            <li><strong>Formação Acadêmica:</strong> Cursos de graduação, pós, MBA ou técnicos, com a instituição e ano de conclusão.</li>
            <li><strong>Habilidades e Ferramentas:</strong> Idiomas, softwares e certificações relevantes para a vaga.</li>
          </ul>

          <h3>2. O que Valoriza o Currículo</h3>
          <ul>
            <li><strong>Adaptação:</strong> Personalize o currículo para cada vaga, usando palavras-chave presentes no anúncio.</li>
            <li><strong>Equilíbrio:</strong> Misture habilidades técnicas (hard skills) com comportamentais (soft skills), como liderança ou comunicação.</li>
            <li><strong>Foco no Futuro:</strong> Demonstre o que você pode realizar com base no que já aprendeu.</li>
            <li><strong>Revisão:</strong> Erros de português eliminam candidatos; revise atentamente.</li>
          </ul>

          <h3>3. Formatação e Formato</h3>
          <ul>
            <li><strong>Limpeza Visual:</strong> Use fontes clássicas (Arial, Times New Roman), tamanho 12, fundo branco e texto preto.</li>
            <li><strong>Arquivo:</strong> Salve sempre em PDF para garantir que a formatação não mude, a menos que solicitado o contrário.</li>
            <li><strong>Foto:</strong> Apenas se a empresa solicitar especificamente.</li>
          </ul>

          <h3>O que evitar:</h3>
          <ul>
            <li>Informações desnecessárias (religião, raça, dados familiares).</li>
            <li>E-mails informais ou engraçados.</li>
            <li>Mentir sobre qualificações.</li>
          </ul>
        </Body>
      </ModalContent>
    </Overlay>
  );
}
