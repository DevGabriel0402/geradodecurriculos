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
      margin: 10mm; 
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
    
    /* Quebras de página inteligentes */
    h1, h2, h3, .section-title {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
    
    p, li, .experience-item, .education-item, .item-card, section {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      margin-bottom: 0.5rem !important;
    }

    #resume-paper {
      height: auto !important;
      min-height: 297mm !important;
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
