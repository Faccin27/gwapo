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
  },
};

export default translations;
