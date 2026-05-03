export const initialData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    photoURL: ''
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  customSections: [],
  config: {
    theme: 'bw_bold',
    primaryColor: '#000000',
    textColor: '#1a1a1a',
    titleColor: '#000000',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    fontSize: '11pt',
    lineHeight: 1.5,
    nameSize: 48,
    titleSize: 18,
    sectionTitleSize: 14,
    textAlign: 'left',
    boldName: true,
    uppercaseName: true
  }
};

const sampleExperience = [
  {
    id: '1',
    company: 'Empresa Borcelle',
    role: 'Analista Sênior',
    startDate: '01/2020',
    isCurrent: true,
    description: 'Liderança de projetos estratégicos e coordenação de equipe multidisciplinar. Redução de custos operacionais em 30%.'
  },
  {
    id: '2',
    company: 'Agência Faustino',
    role: 'Assistente de Marketing',
    startDate: '03/2017',
    endDate: '12/2019',
    isCurrent: false,
    description: 'Criação e gerenciamento de campanhas digitais. Aumento de 50% no engajamento das redes sociais.'
  }
];

const sampleEducation = [
  { id: '1', school: 'Universidade Federal do Rio de Janeiro', degree: 'Bacharelado em Administração', period: '2013 - 2017' }
];

const sampleSkills = ['Gestão de Projetos', 'Análise de Dados', 'Comunicação', 'Liderança'];
const sampleLanguages = [{ name: 'Inglês', level: 'Avançado' }, { name: 'Espanhol', level: 'Intermediário' }];

export const DEFAULT_TEMPLATES = [
  {
    id: 'blank',
    title: 'Em Branco',
    color: '#64748b',
    icon: 'Plus',
    image: null,
    config: { theme: 'bw_bold', primaryColor: '#000000' },
    data: initialData
  },
  {
    id: 'bw_bold',
    title: 'Moderno Bold',
    color: '#111111',
    icon: 'FileText',
    image: null,
    config: { theme: 'bw_bold', primaryColor: '#000000', uppercaseName: true, boldName: true },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_bold', primaryColor: '#000000', uppercaseName: true, nameSize: 52 },
      personal: {
        name: 'JULIANA SILVA',
        title: 'Redatora e Social Media',
        email: 'juliana@grandesite.com.br',
        phone: '(12) 3456-7890',
        location: 'São Paulo, SP',
        summary: 'Meu objetivo é aumentar a visibilidade da empresa e o alcance da marca, engajar com o público e promover a fidelidade do cliente utilizando a comunicação efetiva e criatividade.'
      },
      experience: sampleExperience,
      education: [
        { id: '1', school: 'Faculdade Borcelle de Comunicação', degree: 'Publicidade e Propaganda', period: '2010 - 2014' },
        { id: '2', school: 'Faculdade Faustino', degree: 'Marketing Digital', period: '2016 - 2019' }
      ],
      skills: ['Redação SEO', 'Copywriting', 'Redes Sociais', 'Adobe Photoshop'],
      languages: sampleLanguages
    }
  },
  {
    id: 'bw_timeline',
    title: 'Cronológico',
    color: '#333333',
    icon: 'Layout',
    image: null,
    config: { theme: 'bw_timeline', primaryColor: '#000000' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_timeline', primaryColor: '#000000', nameSize: 40, uppercaseName: false },
      personal: {
        name: 'Pedro Fernandes',
        title: 'Coordenador de Contabilidade',
        email: 'pedro.t.fernandes@email.com.br',
        phone: '(99) 99999-9999',
        location: 'Rio de Janeiro, RJ',
        summary: 'Coordenador de contabilidade com mais de 8 anos de experiência. Reduzi em 40% a rotação interna da equipe gerenciando pessoas e desenvolvendo processos financeiros sólidos.'
      },
      experience: [
        { id: '1', company: 'Empresa Contábil', role: 'Coordenador de Contabilidade', startDate: '2016', isCurrent: true, description: 'Revisei mensalmente levantamentos contábeis de ao menos 10 empregados. Aumentei em 50% a satisfação interna da equipe.' },
        { id: '2', company: 'Empresa Contábil', role: 'Analista de Contabilidade', startDate: '2012', endDate: '2016', isCurrent: false, description: 'Avaliei mensalmente demonstrações financeiras. Auxiliei o controle das contas da organização.' }
      ],
      education: [
        { id: '1', school: 'Pontifícia Universidade Católica', degree: 'Graduação em Ciências Econômicas', period: '2010 - 2014' }
      ],
      skills: ['Planejamento Financeiro', 'Pacote Office', 'Softwares Contábeis', 'Liderança'],
      languages: [{ name: 'Inglês', level: 'Fluente' }]
    }
  },
  {
    id: 'bw_classic_center',
    title: 'Clássico Centrado',
    color: '#222222',
    icon: 'FileText',
    image: null,
    config: { theme: 'bw_classic_center', primaryColor: '#000000' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_classic_center', primaryColor: '#1a5c7a', nameSize: 44, uppercaseName: false, fontFamily: 'Georgia, serif' },
      personal: {
        name: 'Giovana Araújo',
        title: 'Profissional de Saúde',
        email: 'giovana.araujo@brmail.com',
        phone: '(11) 6874-4676',
        location: 'Itapecerica da Serra, SP',
        summary: 'Profissional de saúde focada no acompanhamento e cuidado de idosos há dez anos. Facilidade de comunicação com pacientes e familiares, relatando as atividades diárias e o estado de saúde.'
      },
      experience: [
        { id: '1', company: 'Família Pereira - Itapecerica da Serra, SP', role: 'Cuidadora de Idosos Domiciliar', startDate: '01/2022', isCurrent: true, description: 'Atendimento completo à rotina diária do idoso, incluindo higiene pessoal, alimentação e administração de medicamentos.' },
        { id: '2', company: 'Família Cardoso - Itapecerica da Serra, SP', role: 'Cuidador de Idosos Domiciliar', startDate: '02/2019', endDate: '12/2021', isCurrent: false, description: 'Auxílio com a administração de medicamentos, seguindo orientações médicas e familiares.' }
      ],
      education: [
        { id: '1', school: 'Escola Técnica Sequencial - Capão Redondo', degree: 'Técnico em Enfermagem', period: '2008 - 2010' }
      ],
      skills: ['Primeiros Socorros', 'Nutrição para Idosos', 'Cuidados Paliativos', 'Administração de Medicamentos'],
      languages: []
    }
  },
  {
    id: 'bw_minimal',
    title: 'Minimalista',
    color: '#444444',
    icon: 'FileText',
    image: null,
    config: { theme: 'bw_minimal', primaryColor: '#000000' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_minimal', primaryColor: '#000000', nameSize: 40, uppercaseName: false, fontFamily: 'Georgia, serif' },
      personal: {
        name: 'Sofia Ribeiro',
        title: 'Arquiteta',
        email: 'sofia.ribeiro@email.com',
        phone: '+351 91 000 00 00',
        location: 'Lisboa, Portugal',
        summary: 'Arquiteta apaixonada com mais de 5 anos de experiência em gestão de projetos arquitetônicos residenciais e comerciais.'
      },
      experience: [
        { id: '1', company: 'Arquitetura & Design XYZ', role: 'Arquiteta Sênior', startDate: 'Janeiro 20XX', isCurrent: true, description: 'Liderança de equipe de 5 arquitetos no desenvolvimento de projetos residenciais de alta demanda.' },
        { id: '2', company: 'Arquitetura & Design XYZ', role: 'Arquiteta Associada', startDate: 'Janeiro 20XX', endDate: 'Março 20XX', isCurrent: false, description: 'Coordenação com arquitetos e designers para assegurar a implementação eficaz das especificações de design.' }
      ],
      education: [
        { id: '1', school: 'Universidade Autónoma de Lisboa', degree: 'Mestrado em Arquitetura Sustentável', period: '20XX - 20XX' }
      ],
      skills: ['AutoCAD', 'SketchUp', 'Revit', 'Adobe Photoshop', 'Word', 'LEED AP'],
      languages: [{ name: 'Português', level: 'Nativo' }, { name: 'Espanhol', level: 'Avançado' }, { name: 'Inglês', level: 'Básico' }]
    }
  },
  {
    id: 'bw_traditional',
    title: 'Tradicional',
    color: '#555555',
    icon: 'FileText',
    image: null,
    config: { theme: 'bw_traditional', primaryColor: '#000000' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_traditional', primaryColor: '#000000', nameSize: 44, uppercaseName: false, fontFamily: 'Georgia, serif' },
      personal: {
        name: 'Seu Nome Aqui',
        title: 'Área de Atuação ou Cargo Desejado',
        email: 'seuemail@email.com',
        phone: '(00) 00000-0000',
        location: 'Cidade, Estado',
        summary: 'Descreva aqui seu objetivo profissional ou um breve resumo de suas principais qualificações e experiências mais relevantes para a vaga desejada.'
      },
      experience: [
        { id: '1', company: 'Nome da Empresa', role: 'Cargo | Função', startDate: 'Mês/Ano', isCurrent: true, description: 'Descreva suas principais responsabilidades e realizações mais importantes nesta posição.' }
      ],
      education: [
        { id: '1', school: 'Nome da Escola, Cidade, Estado', degree: 'Curso ou Grau Obtido', period: 'Ano - Ano' }
      ],
      skills: ['Competência 1', 'Competência 2', 'Competência 3', 'Competência 4'],
      languages: [{ name: 'Idioma', level: 'Nível de Proficiência' }]
    }
  },
  {
    id: 'bw_blue_header',
    title: 'Cabeçalho Azul',
    color: '#1e3a8a',
    icon: 'FileText',
    image: null,
    config: { theme: 'bw_blue_header', primaryColor: '#1a56a0' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_blue_header', primaryColor: '#1a56a0', nameSize: 32, uppercaseName: false, fontFamily: 'Arial, sans-serif' },
      personal: {
        name: 'Antônio Cunha Azevedo',
        title: 'O seu cargo',
        email: 'youremail@gmail.com',
        phone: '555-488-1111',
        location: 'Nova Iorque, NY 10001',
        summary: 'Profissional dedicado e orientado a resultados com mais de 5 anos de experiência em um ambiente corporativo acelerado. Capacidade comprovada de gerenciar vários projetos, simplificar operações e melhorar a eficiência da equipe.'
      },
      experience: [
        { id: '1', company: 'Nome da Empresa', role: 'Cargo Mais Recente', startDate: '09/2023', isCurrent: true, description: 'Ponto que descreve uma responsabilidade ou realização chave.\nPonto destacando uma habilidade ou projeto específico.\nOutro ponto ou realização relevante.' },
        { id: '2', company: 'Nome da Empresa', role: 'Cargo Anterior', startDate: '09/2020', endDate: '09/2023', isCurrent: false, description: 'Ponto que descreve uma responsabilidade ou realização chave.\nPonto destacando uma habilidade ou projeto específico.' }
      ],
      education: [
        { id: '1', school: 'Universidade do Texas, Austin, TX', degree: 'Licenciatura em Engenharia Mecânica', period: 'Maio 2019' }
      ],
      skills: ['Microsoft Office', 'Adobe Photoshop', 'Redação Técnica', 'Análise de Dados', 'Comunicação', 'Trabalho em Equipe'],
      languages: [{ name: 'Inglês', level: 'Nativo' }, { name: 'Espanhol', level: 'Intermediário' }]
    }
  },
  {
    id: 'bw_boxed',
    title: 'Seções Destacadas',
    color: '#222222',
    icon: 'FileText',
    image: null,
    config: { theme: 'bw_boxed', primaryColor: '#000000' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_boxed', primaryColor: '#000000', nameSize: 48, uppercaseName: false, fontFamily: 'Arial, sans-serif', textAlign: 'center' },
      personal: {
        name: 'Carla Dias',
        title: 'Recepcionista',
        email: 'ola@grandesite.com.br',
        phone: '(12) 3456-7890',
        location: 'Rua Alegre, 123. Cidade Brasileira',
        summary: 'Recepcionista de hotel com 7 anos de experiência em atendimento ao cliente. Habilidade em gerenciar reservas, solucionar problemas de forma ágil e prestar suporte administrativo.'
      },
      experience: [
        { id: '1', company: 'Hotel Farias e Sampaio', role: 'Recepcionista', startDate: '2017', isCurrent: true, description: 'Atendimento aos hóspedes durante check-in e check-out\nGerenciamento de reservas e procedimentos de pré-chegada\nResponder a chamadas, e-mails e solicitações de informações' }
      ],
      education: [
        { id: '1', school: 'Escola Farias e Sampaio', degree: 'Ensino Médio', period: '2013 - 2015' }
      ],
      skills: ['Sistemas de Gerenciamento Hoteleiro', 'Softwares Administrativos', 'Trabalho em Equipe', 'Gestão de Prazos', 'Atendimento ao Cliente'],
      languages: []
    }
  },
  {
    id: 'bw_two_col',
    title: 'Duas Colunas',
    color: '#333333',
    icon: 'Layout',
    image: null,
    config: { theme: 'bw_two_col', primaryColor: '#000000' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_two_col', primaryColor: '#000000', nameSize: 40, uppercaseName: true, fontFamily: 'Arial, sans-serif' },
      personal: {
        name: 'Nome Completo',
        title: 'Cargo',
        email: 'mail@xxxx.com',
        phone: 'Telefone',
        location: 'Cidade - País',
        summary: 'Breve descrição pessoal com suas principais qualificações e objetivos profissionais. Destaque suas habilidades mais relevantes e o que você pode oferecer à empresa.'
      },
      experience: [
        { id: '1', company: 'Nome da Empresa | Cargo', role: 'Cargo', startDate: 'Set. 20XX', endDate: 'Nov. 20XX', isCurrent: false, description: 'Responsabilidade ou realização chave.\nHabilidade ou projeto específico.\nOutra realização relevante.' },
        { id: '2', company: 'Nome da Empresa | Cargo', role: 'Cargo', startDate: 'Set. 20XX', isCurrent: true, description: 'Responsabilidade ou realização chave.\nHabilidade ou projeto específico.\nOutra realização relevante.' }
      ],
      education: [
        { id: '1', school: 'Universidade ou Escola', degree: 'Graduação em / Especialização', period: 'Set. 20XX' }
      ],
      skills: ['Excel', 'Word', 'PowerPoint', 'Outlook', 'Photoshop', 'Illustrator'],
      languages: [{ name: 'Português', level: 'Avançado' }, { name: 'Inglês', level: 'Avançado' }, { name: 'Espanhol', level: 'Intermediário' }]
    }
  },
  {
    id: 'bw_sidebar_accent',
    title: 'Barra Lateral',
    color: '#b91c1c',
    icon: 'Layout',
    image: null,
    config: { theme: 'bw_sidebar_accent', primaryColor: '#b91c1c' },
    data: {
      ...initialData,
      config: { ...initialData.config, theme: 'bw_sidebar_accent', primaryColor: '#b91c1c', nameSize: 28, uppercaseName: false, fontFamily: 'Arial, sans-serif' },
      personal: {
        name: 'Mateus Junqueira',
        title: 'Gerente de Marketing Digital',
        email: 'mat.junqueira@gmail.com',
        phone: '(11) 79843-493',
        location: 'São Paulo, Brazil',
        summary: 'Gerente de Marketing Digital com ampla experiência na criação, manutenção e execução de campanhas de marketing digital bem-sucedidas.'
      },
      experience: [
        { id: '1', company: 'Scorpion Internet Marketing', role: 'Gerente de Marketing Digital', startDate: '11/2017', endDate: '03/2021', isCurrent: false, description: 'Analisou os sites dos clientes quanto ao desempenho em dispositivos móveis.\nOrganizou e analisou dados e resultados de marketing.' },
        { id: '2', company: 'Client XII', role: 'Gerente de Marketing Digital', startDate: '07/2014', endDate: '10/2017', isCurrent: false, description: 'Coordenou correspondências, materiais de marketing e conteúdo do site.\nGerou conteúdo intrigante para mídias sociais.' }
      ],
      education: [
        { id: '1', school: 'Faculdade das Américas', degree: 'Graduação em Marketing', period: 'Set. 2010 - Maio 2014' }
      ],
      skills: ['Melhores práticas de SEO', 'Marketing digital', 'Gestão de conteúdo', 'Análise', 'Liderança'],
      languages: [{ name: 'Português', level: 'Nativo' }, { name: 'Inglês', level: 'Avançado' }]
    }
  }
];
