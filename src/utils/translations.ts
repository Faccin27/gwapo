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

    // projects section
    "projects-title": "Our Projects",
    "projects-subtitle": "See what we've accomplished",
    "projects-description":
      "We take pride in delivering exceptional digital experiences that help our clients succeed. Here are some of our recent projects.",
    "view-project": "View Project",
    "view-all-projects": "View All Projects",

    // Ready Made Sites
    "ready-made-title": "Ready-Made Websites",
    "ready-made-subtitle": "Quick and affordable solutions",
    "ready-made-desc":
      "Our pre-built templates are perfect for businesses that want a professional online presence without the full custom design price.",

    // Contact Section
    "contact-title": "Get In Touch",
    "contact-subtitle": "Let's create something amazing together",
    "contact-description":
      "Whether you need a new website, a brand refresh, or automation solutions, we're here to help. Reach out to us and let's start the conversation.",
    "contact-name": "Name",
    "contact-email": "Email",
    "contact-phone": "Phone",
    "contact-subject": "Subject",
    "contact-subject-text": "How can we help?",
    "contact-location": "Location",
    "contact-message": "Message",
    "contact-send": "Send Message",

    // Footer
    "footer-rights": "All rights reserved",
    "footer-privacy": "Privacy Policy",
    "footer-terms": "Terms of Service",
    "footer-text": "Transforming ideas into digital excellence. We create stunning websites, craft unique visual identities, and implement powerful automation solutions.",
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

    // Projects Section
    "projects-title": "Nossos Projetos",
    "projects-subtitle": "Veja o que já realizamos",
    "projects-description":
      "Temos orgulho em oferecer experiências digitais excepcionais que ajudam nossos clientes a alcançar o sucesso. Aqui estão alguns dos nossos projetos recentes.",
    "view-project": "Ver Projeto",
    "view-all-projects": "Ver todos os projetos",

    // Ready Made Sites
    "ready-made-title": "Sites Pré-prontos",
    "ready-made-subtitle": "Soluções rápidas e acessíveis",
    "ready-made-desc":
      "Nossos templates pré-construídos são perfeitos para empresas que desejam uma presença online profissional sem o preço total de um design personalizado.",
    // Contact Section
    "contact-title": "Entre em Contato",
    "contact-subtitle": "Vamos criar algo incrível juntos",
    "contact-description":
      "Se você precisa de um novo site, uma atualização de marca ou soluções de automação, estamos aqui para ajudar. Entre em contato conosco e vamos começar a conversa.",
    "contact-name": "Nome",
    "contact-phone": "Telefone",
    "contact-location": "Localização",
    "contact-email": "Email",
    "contact-subject": "Assunto",
    "contact-subject-text": "Como podemos ajudar?",
    "contact-message": "Mensagem",
    "contact-send": "Enviar Mensagem",

    // Footer
    "footer-rights": "Todos os direitos reservados",
    "footer-privacy": "Política de Privacidade",
    "footer-terms": "Termos de Serviço",
    "footer-text": "Transformando ideias em excelência digital. Criamos sites incríveis, criamos identidades visuais únicas e implementamos soluções de automação poderosas.",
  },
};

export default translations;
