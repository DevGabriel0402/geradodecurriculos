import React from 'react';
import styled, { keyframes } from 'styled-components';
import { X, AlertCircle, CheckCircle, Info, HelpCircle } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: scale(0.9) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 1.5rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalCard = styled.div`
  background: white;
  width: 100%;
  max-width: 450px;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  animation: ${slideIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  ${({ type }) => {
    switch (type) {
      case 'success': return 'background: #dcfce7; color: #16a34a;';
      case 'error': return 'background: #fee2e2; color: #dc2626;';
      case 'warning': return 'background: #fef9c3; color: #ca8a04;';
      default: return 'background: #eff6ff; color: #2563eb;';
    }
  }}
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.75rem;
`;

const Message = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  
  ${({ variant }) => 
    variant === 'primary' 
      ? `background: #2563eb; color: white; border: none; &:hover { background: #1d4ed8; }`
      : `background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; &:hover { background: #e2e8f0; }`
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  transition: all 0.2s;
  
  &:hover {
    background: #f1f5f9;
    color: #475569;
  }
`;

export default function Modal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  type = 'info', 
  confirmText = 'Confirmar', 
  cancelText = 'Cancelar',
  showCancel = true 
}) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={32} />;
      case 'error': return <AlertCircle size={32} />;
      case 'warning': return <HelpCircle size={32} />;
      default: return <Info size={32} />;
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        
        <IconWrapper type={type}>
          {getIcon()}
        </IconWrapper>
        
        <Title>{title}</Title>
        <Message>{message}</Message>
        
        <ButtonGroup>
          {showCancel && (
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button variant="primary" onClick={() => {
            if (onConfirm) onConfirm();
            onClose();
          }}>
            {confirmText}
          </Button>
        </ButtonGroup>
      </ModalCard>
    </Overlay>
  );
}
