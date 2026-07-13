const fs = require('fs');
const path = require('path');

const enDict = {
  nav: {
    agents: "AI AGENTS",
    saas: "SAAS",
    automation: "AUTOMATION",
    work: "OUR WORK",
    letsBuild: "LET'S BUILD"
  },
  hero: {
    headline: "Building the Future of AI",
    subheadline: "We craft digital experiences where artificial intelligence meets human ambition.",
    cta1: "Start Your Project",
    cta2: "Watch Showreel"
  },
  footer: {
    london: "London",
    address1: "Lytchett House, Freeland Park",
    address2: "Wareham Road, Poole, Dorset",
    email: "info@holdingai.io",
    phone: "+44 7537106967",
    ourWork: "Our Work",
    services: "Services",
    about: "About Us",
    legal: "Legal Mentions",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    rights: "© 2026 HoldingAI LTD. All rights reserved."
  },
  about: {
    title: "About Us",
    description: "HoldingAI is a premium product studio dedicated to engineering the future. We partner with visionaries to build world-class AI agents, SaaS platforms, and enterprise automation systems.",
    mission: "Our Mission",
    missionText: "To bridge the gap between cutting-edge artificial intelligence and human-centric design, creating digital monuments that stand the test of time."
  },
  work: {
    title: "Our Work",
    description: "Explore our portfolio of digital monuments. We build products that redefine industries and set new standards for excellence."
  },
  contact: {
    title: "Let's Build Together",
    description: "Ready to lead the AI revolution? Contact us to discuss your next big project.",
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    messageLabel: "Message",
    submit: "Send Message"
  },
  services: {
    aiAgents: {
      title: "AI Agents",
      description: "Custom autonomous agents that learn, reason, and act on your behalf to scale operations exponentially."
    },
    saas: {
      title: "SaaS Development",
      description: "End-to-end software architecture, design, and engineering for high-performance, scalable platforms."
    },
    automation: {
      title: "Enterprise Automation",
      description: "Intelligent workflows that eliminate manual tasks and optimize business efficiency."
    }
  },
  legal: {
    privacy: {
      title: "Privacy Policy",
      content: "This is a placeholder for the Privacy Policy. Please consult legal counsel to draft the official document."
    },
    terms: {
      title: "Terms & Conditions",
      content: "This is a placeholder for the Terms and Conditions. Please consult legal counsel to draft the official document."
    },
    mentions: {
      title: "Legal Mentions",
      content: "HoldingAI LTD. Registered in England & Wales. Lytchett House, Freeland Park, Wareham Road, Poole, Dorset."
    }
  }
};

const translations = {
  fr: {
    nav: {
      agents: "AGENTS IA",
      saas: "SAAS",
      automation: "AUTOMATISATION",
      work: "RÉALISATIONS",
      letsBuild: "DÉMARRER"
    },
    hero: {
      headline: "Construire l'Avenir de l'IA",
      subheadline: "Nous concevons des expériences numériques où l'intelligence artificielle rencontre l'ambition humaine.",
      cta1: "Démarrer un Projet",
      cta2: "Voir la Démo"
    },
    footer: {
      london: "Londres",
      address1: "Lytchett House, Freeland Park",
      address2: "Wareham Road, Poole, Dorset",
      email: "info@holdingai.io",
      phone: "+44 7537106967",
      ourWork: "Réalisations",
      services: "Services",
      about: "À Propos",
      legal: "Mentions Légales",
      privacy: "Politique de Confidentialité",
      terms: "Conditions Générales",
      rights: "© 2026 HoldingAI LTD. Tous droits réservés."
    },
    about: {
      title: "À Propos",
      description: "HoldingAI est un studio de création premium dédié à l'ingénierie du futur. Nous collaborons avec des visionnaires pour concevoir des agents IA, des plateformes SaaS et des systèmes d'automatisation de pointe.",
      mission: "Notre Mission",
      missionText: "Combler le fossé entre l'intelligence artificielle de pointe et le design centré sur l'humain, en créant des monuments numériques conçus pour durer."
    },
    work: {
      title: "Nos Réalisations",
      description: "Découvrez notre portfolio de monuments numériques. Nous construisons des produits qui redéfinissent les industries et établissent de nouvelles normes d'excellence."
    },
    contact: {
      title: "Construisons Ensemble",
      description: "Prêt à mener la révolution de l'IA ? Contactez-nous pour discuter de votre prochain grand projet.",
      nameLabel: "Votre Nom",
      emailLabel: "Adresse Email",
      messageLabel: "Message",
      submit: "Envoyer le message"
    },
    services: {
      aiAgents: {
        title: "Agents IA",
        description: "Des agents autonomes sur mesure qui apprennent, raisonnent et agissent pour développer vos opérations de manière exponentielle."
      },
      saas: {
        title: "Développement SaaS",
        description: "Architecture, conception et ingénierie logicielle de bout en bout pour des plateformes évolutives et performantes."
      },
      automation: {
        title: "Automatisation d'Entreprise",
        description: "Des flux de travail intelligents qui éliminent les tâches manuelles et optimisent l'efficacité de l'entreprise."
      }
    },
    legal: {
      privacy: {
        title: "Politique de Confidentialité",
        content: "Ceci est un espace réservé pour la politique de confidentialité. Veuillez consulter un conseiller juridique pour rédiger le document officiel."
      },
      terms: {
        title: "Conditions Générales",
        content: "Ceci est un espace réservé pour les conditions générales. Veuillez consulter un conseiller juridique pour rédiger le document officiel."
      },
      mentions: {
        title: "Mentions Légales",
        content: "HoldingAI LTD. Enregistré en Angleterre et au Pays de Galles. Lytchett House, Freeland Park, Wareham Road, Poole, Dorset."
      }
    }
  },
  de: {
    nav: {
      agents: "KI AGENTEN",
      saas: "SAAS",
      automation: "AUTOMATISIERUNG",
      work: "UNSERE ARBEIT",
      letsBuild: "LASS UNS BAUEN"
    },
    hero: {
      headline: "Die Zukunft der KI gestalten",
      subheadline: "Wir schaffen digitale Erlebnisse, bei denen künstliche Intelligenz auf menschlichen Ehrgeiz trifft.",
      cta1: "Projekt starten",
      cta2: "Showreel ansehen"
    },
    footer: {
      london: "London",
      address1: "Lytchett House, Freeland Park",
      address2: "Wareham Road, Poole, Dorset",
      email: "info@holdingai.io",
      phone: "+44 7537106967",
      ourWork: "Unsere Arbeit",
      services: "Dienstleistungen",
      about: "Über uns",
      legal: "Impressum",
      privacy: "Datenschutzrichtlinie",
      terms: "Allgemeine Geschäftsbedingungen",
      rights: "© 2026 HoldingAI LTD. Alle Rechte vorbehalten."
    },
    about: {
      title: "Über uns",
      description: "HoldingAI ist ein Premium-Produktstudio, das sich der Gestaltung der Zukunft verschrieben hat. Wir arbeiten mit Visionären zusammen, um erstklassige KI-Agenten, SaaS-Plattformen und Automatisierungssysteme für Unternehmen zu entwickeln.",
      mission: "Unsere Mission",
      missionText: "Die Lücke zwischen hochmoderner künstlicher Intelligenz und menschenzentriertem Design zu schließen und digitale Monumente zu schaffen, die die Zeit überdauern."
    },
    work: {
      title: "Unsere Arbeit",
      description: "Entdecken Sie unser Portfolio an digitalen Monumenten. Wir bauen Produkte, die Branchen neu definieren und neue Maßstäbe für Exzellenz setzen."
    },
    contact: {
      title: "Lass uns gemeinsam bauen",
      description: "Bereit, die KI-Revolution anzuführen? Kontaktieren Sie uns, um Ihr nächstes großes Projekt zu besprechen.",
      nameLabel: "Ihr Name",
      emailLabel: "E-Mail-Adresse",
      messageLabel: "Nachricht",
      submit: "Nachricht senden"
    },
    services: {
      aiAgents: {
        title: "KI-Agenten",
        description: "Maßgeschneiderte autonome Agenten, die lernen, schlussfolgern und in Ihrem Namen handeln, um Operationen exponentiell zu skalieren."
      },
      saas: {
        title: "SaaS-Entwicklung",
        description: "End-to-End-Softwarearchitektur, Design und Engineering für leistungsstarke, skalierbare Plattformen."
      },
      automation: {
        title: "Unternehmensautomatisierung",
        description: "Intelligente Workflows, die manuelle Aufgaben eliminieren und die Unternehmenseffizienz optimieren."
      }
    },
    legal: {
      privacy: {
        title: "Datenschutzrichtlinie",
        content: "Dies ist ein Platzhalter für die Datenschutzrichtlinie. Bitte wenden Sie sich an einen Rechtsbeistand, um das offizielle Dokument zu entwerfen."
      },
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        content: "Dies ist ein Platzhalter für die Allgemeinen Geschäftsbedingungen. Bitte wenden Sie sich an einen Rechtsbeistand, um das offizielle Dokument zu entwerfen."
      },
      mentions: {
        title: "Impressum",
        content: "HoldingAI LTD. Registriert in England & Wales. Lytchett House, Freeland Park, Wareham Road, Poole, Dorset."
      }
    }
  },
  es: {
    nav: {
      agents: "AGENTES IA",
      saas: "SAAS",
      automation: "AUTOMATIZACIÓN",
      work: "PORTAFOLIO",
      letsBuild: "COMENZAR"
    },
    hero: {
      headline: "Construyendo el Futuro de la IA",
      subheadline: "Creamos experiencias digitales donde la inteligencia artificial se encuentra con la ambición humana.",
      cta1: "Iniciar Proyecto",
      cta2: "Ver Demo"
    },
    footer: {
      london: "Londres",
      address1: "Lytchett House, Freeland Park",
      address2: "Wareham Road, Poole, Dorset",
      email: "info@holdingai.io",
      phone: "+44 7537106967",
      ourWork: "Portafolio",
      services: "Servicios",
      about: "Sobre Nosotros",
      legal: "Avisos Legales",
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      rights: "© 2026 HoldingAI LTD. Todos los derechos reservados."
    },
    about: {
      title: "Sobre Nosotros",
      description: "HoldingAI es un estudio de productos premium dedicado a diseñar el futuro. Nos asociamos con visionarios para construir agentes de IA de clase mundial, plataformas SaaS y sistemas de automatización.",
      mission: "Nuestra Misión",
      missionText: "Cerrar la brecha entre la inteligencia artificial de vanguardia y el diseño centrado en el ser humano, creando monumentos digitales que resistan el paso del tiempo."
    },
    work: {
      title: "Nuestro Portafolio",
      description: "Explora nuestro portafolio de monumentos digitales. Construimos productos que redefinen industrias y establecen nuevos estándares de excelencia."
    },
    contact: {
      title: "Construyamos Juntos",
      description: "¿Listo para liderar la revolución de la IA? Contáctanos para discutir tu próximo gran proyecto.",
      nameLabel: "Tu Nombre",
      emailLabel: "Dirección de Correo",
      messageLabel: "Mensaje",
      submit: "Enviar Mensaje"
    },
    services: {
      aiAgents: {
        title: "Agentes IA",
        description: "Agentes autónomos personalizados que aprenden, razonan y actúan en su nombre para escalar operaciones exponencialmente."
      },
      saas: {
        title: "Desarrollo SaaS",
        description: "Arquitectura de software integral, diseño e ingeniería para plataformas escalables de alto rendimiento."
      },
      automation: {
        title: "Automatización Empresarial",
        description: "Flujos de trabajo inteligentes que eliminan tareas manuales y optimizan la eficiencia empresarial."
      }
    },
    legal: {
      privacy: {
        title: "Política de Privacidad",
        content: "Este es un marcador de posición para la Política de Privacidad. Consulte a un asesor legal para redactar el documento oficial."
      },
      terms: {
        title: "Términos y Condiciones",
        content: "Este es un marcador de posición para los Términos y Condiciones. Consulte a un asesor legal para redactar el documento oficial."
      },
      mentions: {
        title: "Avisos Legales",
        content: "HoldingAI LTD. Registrado en Inglaterra y Gales. Lytchett House, Freeland Park, Wareham Road, Poole, Dorset."
      }
    }
  },
  it: {
    nav: {
      agents: "AGENTI IA",
      saas: "SAAS",
      automation: "AUTOMAZIONE",
      work: "PORTFOLIO",
      letsBuild: "INIZIAMO"
    },
    hero: {
      headline: "Costruiamo il Futuro dell'IA",
      subheadline: "Creiamo esperienze digitali in cui l'intelligenza artificiale incontra l'ambizione umana.",
      cta1: "Inizia Progetto",
      cta2: "Guarda Demo"
    },
    footer: {
      london: "Londra",
      address1: "Lytchett House, Freeland Park",
      address2: "Wareham Road, Poole, Dorset",
      email: "info@holdingai.io",
      phone: "+44 7537106967",
      ourWork: "Portfolio",
      services: "Servizi",
      about: "Chi Siamo",
      legal: "Note Legali",
      privacy: "Privacy Policy",
      terms: "Termini e Condizioni",
      rights: "© 2026 HoldingAI LTD. Tutti i diritti riservati."
    },
    about: {
      title: "Chi Siamo",
      description: "HoldingAI è uno studio di prodotti premium dedicato a progettare il futuro. Collaboriamo con visionari per costruire agenti IA di livello mondiale, piattaforme SaaS e sistemi di automazione aziendale.",
      mission: "La Nostra Missione",
      missionText: "Colmare il divario tra intelligenza artificiale all'avanguardia e design incentrato sull'uomo, creando monumenti digitali destinati a durare nel tempo."
    },
    work: {
      title: "Il Nostro Portfolio",
      description: "Esplora il nostro portfolio di monumenti digitali. Costruiamo prodotti che ridefiniscono i settori e stabiliscono nuovi standard di eccellenza."
    },
    contact: {
      title: "Costruiamo Insieme",
      description: "Pronto a guidare la rivoluzione dell'IA? Contattaci per discutere del tuo prossimo grande progetto.",
      nameLabel: "Il tuo nome",
      emailLabel: "Indirizzo Email",
      messageLabel: "Messaggio",
      submit: "Invia Messaggio"
    },
    services: {
      aiAgents: {
        title: "Agenti IA",
        description: "Agenti autonomi personalizzati che apprendono, ragionano e agiscono per tuo conto per scalare le operazioni in modo esponenziale."
      },
      saas: {
        title: "Sviluppo SaaS",
        description: "Architettura software end-to-end, design e ingegneria per piattaforme scalabili e ad alte prestazioni."
      },
      automation: {
        title: "Automazione Aziendale",
        description: "Flussi di lavoro intelligenti che eliminano le attività manuali e ottimizzano l'efficienza aziendale."
      }
    },
    legal: {
      privacy: {
        title: "Privacy Policy",
        content: "Questo è un segnaposto per la Privacy Policy. Si prega di consultare un consulente legale per redigere il documento ufficiale."
      },
      terms: {
        title: "Termini e Condizioni",
        content: "Questo è un segnaposto per i Termini e Condizioni. Si prega di consultare un consulente legale per redigere il documento ufficiale."
      },
      mentions: {
        title: "Note Legali",
        content: "HoldingAI LTD. Registrato in Inghilterra e Galles. Lytchett House, Freeland Park, Wareham Road, Poole, Dorset."
      }
    }
  },
  pt: {
    nav: {
      agents: "AGENTES IA",
      saas: "SAAS",
      automation: "AUTOMAÇÃO",
      work: "NOSSO TRABALHO",
      letsBuild: "COMEÇAR"
    },
    hero: {
      headline: "Construindo o Futuro da IA",
      subheadline: "Criamos experiências digitais onde a inteligência artificial encontra a ambição humana.",
      cta1: "Iniciar Projeto",
      cta2: "Ver Demo"
    },
    footer: {
      london: "Londres",
      address1: "Lytchett House, Freeland Park",
      address2: "Wareham Road, Poole, Dorset",
      email: "info@holdingai.io",
      phone: "+44 7537106967",
      ourWork: "Nosso Trabalho",
      services: "Serviços",
      about: "Sobre Nós",
      legal: "Avisos Legais",
      privacy: "Política de Privacidade",
      terms: "Termos e Condições",
      rights: "© 2026 HoldingAI LTD. Todos os direitos reservados."
    },
    about: {
      title: "Sobre Nós",
      description: "HoldingAI é um estúdio de produtos premium dedicado a projetar o futuro. Fizemos parcerias com visionários para construir agentes de IA de classe mundial, plataformas SaaS e sistemas de automação.",
      mission: "Nossa Missão",
      missionText: "Preencher a lacuna entre a inteligência artificial de ponta e o design centrado no ser humano, criando monumentos digitais que resistem ao teste do tempo."
    },
    work: {
      title: "Nosso Trabalho",
      description: "Explore nosso portfólio de monumentos digitais. Construímos produtos que redefinem indústrias e estabelecem novos padrões de excelência."
    },
    contact: {
      title: "Vamos Construir Juntos",
      description: "Pronto para liderar a revolução da IA? Contate-nos para discutir seu próximo grande projeto.",
      nameLabel: "Seu Nome",
      emailLabel: "Endereço de Email",
      messageLabel: "Mensagem",
      submit: "Enviar Mensagem"
    },
    services: {
      aiAgents: {
        title: "Agentes de IA",
        description: "Agentes autônomos personalizados que aprendem, raciocinam e agem em seu nome para dimensionar as operações exponencialmente."
      },
      saas: {
        title: "Desenvolvimento SaaS",
        description: "Arquitetura de software ponta a ponta, design e engenharia para plataformas escaláveis de alto desempenho."
      },
      automation: {
        title: "Automação Empresarial",
        description: "Fluxos de trabalho inteligentes que eliminam tarefas manuais e otimizam a eficiência dos negócios."
      }
    },
    legal: {
      privacy: {
        title: "Política de Privacidade",
        content: "Este é um espaço reservado para a Política de Privacidade. Consulte um consultor jurídico para redigir o documento oficial."
      },
      terms: {
        title: "Termos e Condições",
        content: "Este é um espaço reservado para os Termos e Condições. Consulte um consultor jurídico para redigir o documento oficial."
      },
      mentions: {
        title: "Avisos Legais",
        content: "HoldingAI LTD. Registrado na Inglaterra e País de Gales. Lytchett House, Freeland Park, Wareham Road, Poole, Dorset."
      }
    }
  }
};

const outputDir = path.join(__dirname, '../src/i18n/dictionaries');
fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, 'en.json'), JSON.stringify(enDict, null, 2));
Object.keys(translations).forEach(lang => {
  fs.writeFileSync(path.join(outputDir, `${lang}.json`), JSON.stringify(translations[lang], null, 2));
});

console.log("Dictionaries generated!");
