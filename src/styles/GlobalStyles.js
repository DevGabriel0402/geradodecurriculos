import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color: #f8fafc;
  }

  @media print {
    @page { 
      margin: 0; 
      size: A4; 
    }
    html, body, #root { 
      background: white !important; 
      -webkit-print-color-adjust: exact !important; 
      print-color-adjust: exact !important;
    }
    .no-print { 
      display: none !important; 
    }
    .resume-container { 
      width: 210mm !important; 
      min-height: 297mm !important; 
      height: auto !important;
      margin: 0 auto !important; 
      padding: 12mm !important;
      box-shadow: none !important;
      border: none !important;
    }
  }
  
  .resume-container {
    font-size: ${({ fontSize }) => 
      fontSize === 'small' ? '12px' : 
      fontSize === 'large' ? '16px' : '14px'};
    transition: all 0.3s ease;
  }

  /* Temas */
  .theme-modern { 
    --accent: #2563eb; 
    --text-main: #1f2937; 
    --bg-card: #f8fafc; 
  }
  .theme-minimal { 
    --accent: #000000; 
    --text-main: #111111; 
    --bg-card: #ffffff; 
  }
  .theme-classic { 
    --accent: #1e40af; 
    --text-main: #111827; 
    --bg-card: #eff6ff; 
  }
  .theme-dark { 
    --accent: #60a5fa; 
    --text-main: #f3f4f6; 
    --bg-card: #1f2937; 
    --bg-resume: #111827; 
  }
`;
