interface TranslationObject {
  [key: string]: string;
}

interface TranslationsType {
  en: TranslationObject;
  pt: TranslationObject;
}

const translations: TranslationsType = {
  en: {
    // Navbar
    home: "Home",
    services: "Services",
    process: "Process",
    projects: "Projects",
    "before-after": "Magic",
    contact: "Contact",
    "get-quote": "Get a Quote",
    ready: "For sale",

    // Hero Section
    "hero-title": "Creating Digital Experiences",
    "hero-subtitle": "all you need to grow your business",
    "hero-cta": "Start Your Project",
    "hero-learn-more": "Learn More",

    // before/after section
    before: "BEFORE",
    after: "AFTER",
    "before/after-title": "See Our Transformation",
    "before/after-description":
      "Drag the slider to see how we transform outdated designs into modern, beautiful websites.",

    // Services Section
    "services-title": "Our Services",
    "services-subtitle": "Comprehensive digital solutions for your business",
    "service-web-title": "Web Development",
    "service-web-desc":
      "Complete websites and landing pages tailored to your needs",
    "service-identity-title": "Visual Identity",
    "service-identity-desc":
      "Brand design that captures your essence and connects with your audience",
    "service-rpa-title": "RPA Solutions",
    "service-rpa-desc": "Automate repetitive tasks and improve efficiency",

    // Process Section
    "process-title": "Our Process",
    "process-subtitle": "How we transform your ideas into reality",
    "process-step1": "Understanding",
    "process-step1-desc": "We learn about your business, goals, and vision",
    "process-step2": "Research",
    "process-step2-desc": "Analyzing market trends and competitive landscape",
    "process-step3": "Proposals",
    "process-step3-desc": "Creating concept designs and strategic solutions",
    "process-step4": "Development",
    "process-step4-desc": "Building your project with precision and care",
    "process-step5": "Delivery",
    "process-step5-desc": "Launching your project with comprehensive testing",
    "process-step6": "Support",
    "process-step6-desc": "Ongoing assistance to ensure continued success",
  },
  pt: {
    // Navbar
    home: "Início",
    services: "Serviços",
    process: "Processo",
    projects: "Projetos",
    "before-after": "Transformação",
    contact: "Contato",
    "get-quote": "Solicitar Orçamento",
    ready: "Compre já",

    // Hero Section
    "hero-title": "Desenvolvendo sua identidade digital",
    "hero-subtitle": "Não só o que sua marca precisa, mas o que ela merece",
    "hero-cta": "Inicie seu Projeto",
    "hero-learn-more": "Saiba Mais",

    // before/after section
    before: "ANTES",
    after: "DEPOIS",
    "before/after-title": "Veja Nossa Transformação",
    "before/after-description":
      "Arraste o slider para ver como transformamos designs antigos em modernos e belos sites",

    // Services Section
    "services-title": "Nossos Serviços",
    "services-subtitle": "Soluções digitais abrangentes para o seu negócio",
    "service-web-title": "Desenvolvimento Web",
    "service-web-desc":
      "Sites completos e landing pages adaptados às suas necessidades",
    "service-identity-title": "Identidade Visual",
    "service-identity-desc":
      "Design de marca que captura sua essência e conecta com seu público",
    "service-rpa-title": "Soluções RPA",
    "service-rpa-desc": "Automatize tarefas repetitivas e melhore a eficiência",

    // Process Section
    "process-title": "Nosso Processo",
    "process-subtitle": "Como transformamos suas ideias em realidade",
    "process-step1": "Entendimento",
    "process-step1-desc": "Conhecemos seu negócio, objetivos e visão",
    "process-step2": "Pesquisa",
    "process-step2-desc":
      "Analisando tendências de mercado e cenário competitivo",
    "process-step3": "Propostas",
    "process-step3-desc": "Criando designs conceituais e soluções estratégicas",
    "process-step4": "Desenvolvimento",
    "process-step4-desc": "Construindo seu projeto com precisão e cuidado",
    "process-step5": "Entrega",
    "process-step5-desc": "Lançamento do projeto com testes abrangentes",
    "process-step6": "Suporte",
    "process-step6-desc":
      "Assistência contínua para garantir sucesso prolongado",
  },
};

export default translations;
