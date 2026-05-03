import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const SplashContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: ${pulse} 2s infinite ease-in-out;

  img {
    height: 120px;
    width: auto;
    object-fit: contain;
  }

  h1 {
    font-size: 2rem;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -1px;
    margin: 0;

    span {
      color: #2563eb;
    }
  }
`;

const LoadingBarContainer = styled.div`
  width: 200px;
  height: 4px;
  background: #f1f5f9;
  border-radius: 10px;
  margin-top: 2.5rem;
  overflow: hidden;
  position: relative;
`;

const loadingAnim = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const LoadingBarProgress = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #2563eb, transparent);
  animation: ${loadingAnim} 1.5s infinite linear;
`;

export default function SplashScreen() {
  return (
    <SplashContainer>
      <LogoWrapper>
        <img src="/imagelogo.png" alt="Logo" />
        <h1>Currículo<span>Generator</span></h1>
      </LogoWrapper>
      <LoadingBarContainer>
        <LoadingBarProgress />
      </LoadingBarContainer>
    </SplashContainer>
  );
}
