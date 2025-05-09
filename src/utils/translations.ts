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
    "before": "BEFORE",
    "after": "AFTER",
    "before/after-title": "See Our Transformation",
    "before/after-description": "Drag the slider to see how we transform outdated designs into modern, beautiful websites.",
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
    "before": "ANTES",
    "after": "DEPOIS",
    "before/after-title": "Veja Nossa Transformação",
    "before/after-description": "Arraste o slider para ver como transformamos designs antigos em modernos e belos sites",
  },
};

export default translations;
