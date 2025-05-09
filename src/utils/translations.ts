
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
    'home': 'Home',
    'services': 'Services',
    'process': 'Process',
    'projects': 'Projects',
    'before-after': 'Magic',
    'contact': 'Contact',
    'get-quote': 'Get a Quote',
    'ready': 'For sale',
    
  },
  pt: {
    // Navbar
    'home': 'Início',
    'services': 'Serviços',
    'process': 'Processo',
    'projects': 'Projetos',
    'before-after': 'Transformação',
    'contact': 'Contato',
    'get-quote': 'Solicitar Orçamento',
    'ready': 'Compre já',
  }
};

export default translations;
