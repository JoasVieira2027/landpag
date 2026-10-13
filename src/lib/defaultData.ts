import type { SiteSettings, ServiceItem, DifferentialItem, ProjectItem, ProcessStep } from './types';

export const defaultSettings: SiteSettings = {
  brandName: 'FluxoWeb',
  tagline: {
    pt: 'Criação de Landing Pages & Sites de Alta Performance',
    en: 'High-Converting Landing Pages & Strategic Websites',
    es: 'Landing Pages y Sitios Web de Alta Conversión'
  },
  logoUrl: '',
  primaryColor: '#0066FF',
  hero: {
    badge: {
      pt: 'Desenvolvimento Web Profissional & Alta Performance',
      en: 'Professional Web Development & High Performance',
      es: 'Desarrollo Web Profesional y Alto Rendimiento'
    },
    title: {
      pt: 'Criamos sites profissionais que atraem clientes e geram vendas para o seu negócio.',
      en: 'We craft professional websites that attract customers and drive real sales for your business.',
      es: 'Creamos sitios web profesionales que atraen clientes y generan ventas para su negocio.'
    },
    subtitle: {
      pt: 'Desenvolvemos sites rápidos e modernos para pedidos, agendamentos, catálogos virtuais e contato direto no WhatsApp.',
      en: 'Fast and modern websites built for online orders, appointments, product catalogs, and direct WhatsApp inquiries.',
      es: 'Sitios web rápidos y modernos diseñados para pedidos, agendamientos y contacto direto por WhatsApp.'
    },
    primaryCtaText: {
      pt: 'Ver Planos',
      en: 'View Plans',
      es: 'Ver Planes'
    },
    secondaryCtaText: {
      pt: 'Falar no WhatsApp',
      en: 'Chat on WhatsApp',
      es: 'Hablar por WhatsApp'
    },
    trustMetrics: [
      {
        number: '100%',
        label: {
          pt: 'Sob Medida para Seu Negócio',
          en: 'Tailored for Your Business',
          es: 'A Medida de su Negocio'
        }
      },
      {
        number: 'WhatsApp',
        label: {
          pt: 'Botão e Pedidos Diretos',
          en: 'Direct WhatsApp Inquiries',
          es: 'Pedidos Directos por WhatsApp'
        }
      },
      {
        number: 'Ultra Rápido',
        label: {
          pt: 'Abre Instantâneo no Celular',
          en: 'Instant Load on Mobile',
          es: 'Carga Rápida en Celulares'
        }
      },
      {
        number: 'Fácil Gestão',
        label: {
          pt: 'Painel para Alterar Conteúdo',
          en: 'Easy Admin Panel for Updates',
          es: 'Panel Fácil para Actualizaciones'
        }
      }
    ]
  },
  contact: {
    whatsapp: '+55 81 97311-9512',
    whatsappMessage: {
      pt: 'Olá! Quero dar início ao meu site/landing page agora. Como podemos fechar?',
      en: 'Hello! I want to start my website/landing page now. How do we proceed?',
      es: '¡Hola! Quiero iniciar mi sitio/landing page agora. ¿Cómo procedemos?'
    },
    email: 'contatojoasvieira@gmail.com',
    instagram: 'https://instagram.com/fluxoweb',
    linkedin: 'https://linkedin.com/company/fluxoweb',
    github: 'https://github.com/fluxoweb',
    location: {
      pt: 'Recife, PE - Atendimento para Todo o Brasil',
      en: 'Recife, Brazil - Serving Clients Globally',
      es: 'Recife, Brasil - Atención a Todo el País'
    },
    businessHours: {
      pt: 'Segunda a Sexta, das 09h às 18h',
      en: 'Monday to Friday, 9am to 6pm',
      es: 'Lunes a Viernes, de 09h a 18h'
    }
  },
  seo: {
    metaTitle: {
      pt: 'FluxoWeb | Landing Pages & Sites de Alta Performance',
      en: 'FluxoWeb | High-Converting Websites & Landing Pages',
      es: 'FluxoWeb | Creación de Sitios Web y Landing Pages'
    },
    metaDescription: {
      pt: 'Landing pages e sites profissionais focados em conversão direta no WhatsApp. Velocidade máxima e design premium.',
      en: 'Professional high-converting landing pages and websites with direct WhatsApp integration.',
      es: 'Landing pages y sitios web profesionales enfocados en conversión por WhatsApp.'
    },
    ogImage: '/projects/fintech-corp.jpg',
    keywords: 'criação de sites, site para barbearia, site para loja de roupas, cardápio digital açaí, site com whatsapp, orçamento de site'
  },
  sectionsVisibility: {
    hero: true,
    services: true,
    differentials: true,
    portfolio: true,
    process: true,
    cta: true,
    contact: true
  },
  sectionsOrder: ['hero', 'services', 'differentials', 'portfolio', 'process', 'cta', 'contact']
};

export const defaultServices: ServiceItem[] = [
  {
    id: 'pedidos-cardapios',
    iconName: 'ShoppingBag',
    title: {
      pt: 'Cardápios Digitais & Pedidos',
      en: 'Digital Menus & Online Orders',
      es: 'Menús Digitales y Pedidos'
    },
    shortDesc: {
      pt: 'Ideal para açaí, restaurantes, pizzarias e lanchonetes. O cliente escolhe tamanhos, adicionais e o pedido chega pronto no seu WhatsApp.',
      en: 'Perfect for eateries, acai shops, and delivery. Customers customize their orders and send them directly to your WhatsApp.',
      es: 'Ideal para locales gastronómicos y delivery. El cliente selecciona los productos y el pedido llega formateado a su WhatsApp.'
    },
    bulletPoints: {
      pt: [
        'Exemplos práticos: lojas de açaí, delivery e restaurantes',
        'Cálculo automático do valor total e taxa de entrega',
        'Pedido formatado e enviado direto para seu WhatsApp comercial',
        'Sem cobrança de porcentagens ou taxas abusivas por pedido'
      ],
      en: [
        'Tested for cafes, acai bars, and quick delivery food',
        'Automatic order total and delivery fee calculation',
        'Structured order sent straight into your WhatsApp inbox',
        'Zero commission fees on your customer transactions'
      ],
      es: [
        'Probado para locales gastronómicos y delivery',
        'Cálculo automático de subtotales y envío',
        'Pedido estructurado directo a su WhatsApp comercial',
        'Sin comisiones porcentuales por venta'
      ]
    },
    highlight: true
  },
  {
    id: 'agendamentos-online',
    iconName: 'LayoutDashboard',
    title: {
      pt: 'Agendamentos Online',
      en: 'Online Booking & Appointments',
      es: 'Agendamiento y Turnos Online'
    },
    shortDesc: {
      pt: 'Perfeito para barbearias, salões de beleza, clínicas, consultórios e estúdios que precisam organizar horários sem complicação.',
      en: 'Tailored for barbershops, beauty salons, clinics, and studios to manage daily client bookings seamlessly.',
      es: 'Perfecto para barberías, salones de belleza y clínicas que necesitan organizar horarios y citas sin complicaciones.'
    },
    bulletPoints: {
      pt: [
        'Exemplos práticos: barbearias, salões, clínicas e estética',
        'Escolha fácil de profissional, serviço e horário disponível',
        'Confirmação rápida com direcionamento para WhatsApp',
        'Economiza horas de conversa manual e evita faltas'
      ],
      en: [
        'Proven for barbershops, hair salons, and medical clinics',
        'Easy selection of service, specialist, and available time slot',
        'Instant confirmation via WhatsApp notification',
        'Saves administrative time and cuts down client no-shows'
      ],
      es: [
        'Probado para barberías, estética y centros profesionales',
        'Selección ágil de servicio, profesional y horario libre',
        'Confirmación inmediata vía WhatsApp',
        'Ahorra tiempo de atención y reduce ausencias'
      ]
    },
    highlight: true
  },
  {
    id: 'catalogos-lojas',
    iconName: 'ShoppingBag',
    title: {
      pt: 'Catálogos & Lojas de Roupas',
      en: 'Product Catalogs & Fashion Stores',
      es: 'Catálogos y Tiendas de Ropa'
    },
    shortDesc: {
      pt: 'Vitrines online modernas para lojas de roupas, calçados e acessórios apresentarem seus produtos com fotos nítidas e botão de compra.',
      en: 'Modern online showcases for apparel, boutique fashion, and retail stores to showcase items and convert visitors into buyers.',
      es: 'Vitrinas virtuales modernas para tiendas de indumentaria y calzado que buscan exhibir productos y vender más.'
    },
    bulletPoints: {
      pt: [
        'Exemplos práticos: lojas de roupas, calçados e acessórios',
        'Galeria com fotos em alta qualidade e detalhes das peças',
        'Filtros por categoria, tamanho e novidades',
        'Botão "Comprar pelo WhatsApp" em cada produto'
      ],
      en: [
        'Tailored for fashion boutiques, footwear, and retail',
        'High-resolution photo galleries with product details',
        'Filters by category, size, and new arrivals',
        'Direct "Order via WhatsApp" button on each product'
      ],
      es: [
        'Diseñado para tiendas de moda, calzado y accesorios',
        'Galería fotográfica de alta resolución y detalles',
        'Filtros por categoría, tallas y promociones',
        'Botón directo para comprar por WhatsApp'
      ]
    }
  },
  {
    id: 'sites-institucionais',
    iconName: 'Building2',
    title: {
      pt: 'Sites Institucionais para Empresas',
      en: 'Corporate & Business Websites',
      es: 'Sitios Institucionales para Empresas'
    },
    shortDesc: {
      pt: 'Presença profissional sólida para escritórios, prestadores de serviços e empresas que precisam transmitir autoridade e confiança.',
      en: 'Solid professional presence for corporate firms, consultancies, and service providers seeking trust and credibility.',
      es: 'Presencia corporativa sólida para empresas y profesionales que buscan transmitir confianza y liderazgo.'
    },
    bulletPoints: {
      pt: [
        'Exemplos práticos: construtoras, advocacia, contabilidade e consultorias',
        'Apresentação clara dos serviços, diferenciais e equipe',
        'Formulário para cotação e botão flutuante de WhatsApp',
        'Otimizado para ser encontrado no Google (SEO local)'
      ],
      en: [
        'Ideal for legal, accounting, construction, and B2B services',
        'Clear showcase of your core services and differentiators',
        'Quote request form and floating WhatsApp button',
        'Optimized for Google Local Search discoverability'
      ],
      es: [
        'Ideal para empresas de servicios, construcción y asesoría',
        'Presentación clara de servicios, experiencia y equipo',
        'Formulario de cotización y botón flotante de WhatsApp',
        'Optimizado para posicionamiento en Google'
      ]
    }
  },
  {
    id: 'landing-pages',
    iconName: 'Target',
    title: {
      pt: 'Landing Pages de Alta Conversão',
      en: 'High-Converting Landing Pages',
      es: 'Landing Pages de Alta Conversión'
    },
    shortDesc: {
      pt: 'Páginas objetivas desenvolvidas especificamente para anúncios no Instagram e Google, transformando cliques em mensagens no seu WhatsApp.',
      en: 'Targeted single-page websites engineered for ad campaigns to convert traffic directly into WhatsApp leads.',
      es: 'Páginas directas pensadas para campañas de publicidad, convirtiendo clics en contactos por WhatsApp.'
    },
    bulletPoints: {
      pt: [
        'Focada em uma oferta ou serviço principal',
        'Carregamento em menos de 1 segundo para não perder cliques',
        'Chamadas para ação claras e persuasivas',
        'Pixel do Facebook e Google Ads configurados'
      ],
      en: [
        'Focused on a single compelling product or service offer',
        'Loads in under 1 second to eliminate bounce rates',
        'Direct, persuasive call-to-action triggers',
        'Pre-configured Google and Meta tracking pixels'
      ],
      es: [
        'Enfocada en una oferta o servicio específico',
        'Carga en menos de 1 segundo para no perder visitas',
        'Llamados a la acción claros y persuasivos',
        'Píxeles de Google y Meta Ads integrados'
      ]
    }
  },
  {
    id: 'manutencao-suporte',
    iconName: 'Wrench',
    title: {
      pt: 'Manutenção & Suporte Dedicado',
      en: 'Maintenance & Dedicated Support',
      es: 'Mantenimiento y Soporte Continuo'
    },
    shortDesc: {
      pt: 'Cuidamos do seu site para você focar no seu negócio. Atualizações de produtos, fotos, preços e segurança garantida.',
      en: 'We maintain your site so you can focus on running your business. Regular updates, price changes, and security checks.',
      es: 'Mantenemos su sitio siempre al día: fotos, precios, seguridad y mejoras continuas para que usted se enfoque en su negocio.'
    },
    bulletPoints: {
      pt: [
        'Atualização rápida de preços, promoções e fotos',
        'Backup periódico e monitoramento de estabilidade',
        'Suporte direto por WhatsApp sem burocracia',
        'Melhorias contínuas conforme seu negócio cresce'
      ],
      en: [
        'Fast updates for prices, deals, and product photos',
        'Regular database backups and uptime monitoring',
        'Direct WhatsApp support with fast turnarounds',
        'Continuous enhancements as your business expands'
      ],
      es: [
        'Actualización ágil de precios, fotos y promociones',
        'Copias de seguridad regulares y monitoreo',
        'Atención directa por WhatsApp sin trámites lentos',
        'Mejoras continuas según el crecimiento del negocio'
      ]
    }
  }
];

export const defaultDifferentials: DifferentialItem[] = [
  {
    id: 'direcionamento-whatsapp',
    iconName: 'Link2',
    title: {
      pt: 'Direto no seu WhatsApp',
      en: 'Direct to Your WhatsApp',
      es: 'Directo a su WhatsApp'
    },
    desc: {
      pt: 'Facilidade total para seu cliente: com apenas um clique ele inicia a conversa, envia a lista de pedidos ou confirma o agendamento diretamente com você.',
      en: 'Frictionless customer communication: with a single tap, visitors chat directly, confirm appointments, or submit orders to your WhatsApp.',
      es: 'Facilidad absoluta: con un solo toque el cliente inicia la conversación, envía su pedido o confirma su turno en su WhatsApp.'
    }
  },
  {
    id: 'design-sob-medida',
    iconName: 'Palette',
    title: {
      pt: 'Visual Profissional e Elegante',
      en: 'Bespoke Professional Design',
      es: 'Diseño Profesional y Elegante'
    },
    desc: {
      pt: 'Esqueça modelos prontos e genéricos. Criamos uma identidade limpa e confiável que valoriza a marca da sua empresa perante os concorrentes.',
      en: 'No cheap generic templates. We build clean, authoritative designs that make your business stand out from competitors.',
      es: 'Nada de plantillas genéricas. Desarrollamos un diseño limpio y moderno que posiciona su marca con credibilidad.'
    }
  },
  {
    id: 'celular-primeiro',
    iconName: 'Smartphone',
    title: {
      pt: 'Perfeito em Qualquer Celular',
      en: 'Flawless on Mobile & Tablets',
      es: 'Perfecto en Celulares y Tablets'
    },
    desc: {
      pt: 'Mais de 85% dos clientes navegam pelo smartphone. Nossos sites são planejados primeiro para telas de iPhone e Android com botões confortáveis e fáceis.',
      en: 'Over 85% of clients visit from their phone. Our sites are designed mobile-first with effortless touch interactions.',
      es: 'Más del 85% de sus clientes visitan desde el teléfono. Desarrollamos layouts cómodos e intuitivos para iPhone y Android.'
    }
  },
  {
    id: 'velocidade-maxima',
    iconName: 'Zap',
    title: {
      pt: 'Carregamento Instantâneo',
      en: 'Instant Page Loading',
      es: 'Carga Instantánea'
    },
    desc: {
      pt: 'Páginas leves que abrem em menos de 1 segundo até em conexões 4G móveis, garantindo que seu cliente não desista antes de ver seus produtos.',
      en: 'Lightweight pages loading under 1 second even on mobile 4G, so potential buyers never leave out of frustration.',
      es: 'Páginas ultralivianas que abren en menos de 1 segundo incluso en 4G para no perder clientes por demoras.'
    }
  },
  {
    id: 'autonomia-painel',
    iconName: 'Sliders',
    title: {
      pt: 'Painel Simples para Atualizar',
      en: 'Simple Management Panel',
      es: 'Panel Fácil para Gestionar'
    },
    desc: {
      pt: 'Tenha total controle sobre seu site: altere fotos, descrições, preços, telefones e horários de funcionamento sem precisar pagar programador.',
      en: 'Full independence: easily change prices, photos, texts, and contact details without needing to pay a programmer every time.',
      es: 'Autonomía total: actualice fotos, precios, textos y contactos fácilmente sin depender de un programador.'
    }
  },
  {
    id: 'entrega-agil',
    iconName: 'Code2',
    title: {
      pt: 'Entrega Ágil & Ferramentas Modernas',
      en: 'Fast Delivery & Modern Workflow',
      es: 'Entrega Rápida y Precisa'
    },
    desc: {
      pt: 'Utilizamos tecnologias de ponta e ferramentas modernas de desenvolvimento para reduzir o prazo de entrega pela metade, garantindo acabamento impecável.',
      en: 'We leverage modern engineering tools and agile workflows to deliver your project in record time with rigorous quality.',
      es: 'Utilizamos herramientas modernas de ingeniería para agilizar el desarrollo y entregar su sitio en tiempo récord.'
    }
  }
];

export const defaultProjects: ProjectItem[] = [
  {
    id: 'fit-vibe-activewear',
    title: {
      pt: 'Fit Vibe Activewear — Loja & Catálogo de Roupas',
      en: 'Fit Vibe Activewear — Fashion & Fitness Store',
      es: 'Fit Vibe Activewear — Tienda y Catálogo de Ropa'
    },
    category: 'lojas',
    shortDesc: {
      pt: 'Loja virtual e catálogo moderno para marca de roupas fitness, com vitrine de produtos, cálculo de frete, carrinho interativo e pedidos finalizados diretamente no WhatsApp.',
      en: 'Modern online store and catalog for activewear brand, featuring product showcase, shipping calculation, interactive cart, and direct WhatsApp checkout.',
      es: 'Tienda virtual y catálogo moderno para marca de indumentaria fitness, con vitrina de productos, cálculo de envío y pedidos directos por WhatsApp.'
    },
    image: '/projects/fit-vibe-activewear.jpg',
    featured: true,
    liveUrl: 'https://sitederoupa-6efo.vercel.app/',
    technologies: ['Catálogo de Roupas', 'Carrinho Interativo', 'Cálculo de Frete', 'Checkout no WhatsApp'],
    results: {
      pt: 'Aumento expressivo nas conversões diárias e pedidos recebidos prontos no WhatsApp da loja.',
      en: 'Remarkable increase in daily sales and structured orders received on WhatsApp.',
      es: 'Aumento notable en conversiones y pedidos directos recibidos por WhatsApp.'
    }
  }
];

export const defaultProcessSteps: ProcessStep[] = [
  {
    stepNumber: 1,
    title: {
      pt: 'Conversa & Entendimento do Negócio',
      en: 'Discovery & Business Goals',
      es: 'Entrevista y Objetivos del Negocio'
    },
    desc: {
      pt: 'Conversamos pelo WhatsApp para entender o que você vende, quem são seus clientes e o que seu site precisa ter (pedidos, agendamentos, catálogo ou apresentação).',
      en: 'We discuss your business via WhatsApp to identify what you sell, your target buyers, and whether you need orders, bookings, or a catalog.',
      es: 'Conversamos por WhatsApp para comprender qué vende, quiénes son sus clientes y qué funcionalidades necesita su sitio.'
    },
    duration: {
      pt: '1 dia',
      en: '1 day',
      es: '1 día'
    }
  },
  {
    stepNumber: 2,
    title: {
      pt: 'Estruturação & Conteúdo',
      en: 'Structure & Content',
      es: 'Estructura y Contenido'
    },
    desc: {
      pt: 'Organizamos seus produtos, fotos, serviços, preços e o número de WhatsApp para onde as mensagens dos clientes serão enviadas.',
      en: 'We organize your product photos, pricing, descriptions, and the WhatsApp number that will receive incoming orders and inquiries.',
      es: 'Organizamos sus fotos, precios, servicios y el número de WhatsApp al que llegarán los clientes.'
    },
    duration: {
      pt: '1 a 2 dias',
      en: '1 - 2 days',
      es: '1 a 2 días'
    }
  },
  {
    stepNumber: 3,
    title: {
      pt: 'Desenvolvimento do Site',
      en: 'Design & Development',
      es: 'Diseño y Programación'
    },
    desc: {
      pt: 'Construímos o site com design moderno e velocidade máxima para celulares, garantindo que tudo funcione com fluidez e clareza.',
      en: 'We build your website with clean aesthetics and maximum mobile speed so everything runs fast and looks professional.',
      es: 'Programamos el sitio con diseño moderno y máxima velocidad para celulares, garantizando fluidez total.'
    },
    duration: {
      pt: '3 a 6 dias',
      en: '3 - 6 days',
      es: '3 a 6 días'
    }
  },
  {
    stepNumber: 4,
    title: {
      pt: 'Revisão & Testes com Você',
      en: 'Review & Hands-On Testing',
      es: 'Revisión y Validación'
    },
    desc: {
      pt: 'Enviamos o link para você testar no seu celular: conferir os botões, testar os pedidos no WhatsApp e pedir os ajustes que desejar.',
      en: 'We send a private link for you to test on your phone: verify buttons, test WhatsApp messages, and request any adjustments.',
      es: 'Le enviamos un enlace para probar en su celular: verificar botones, probar mensajes por WhatsApp y solicitar retoques.'
    },
    duration: {
      pt: '1 a 2 dias',
      en: '1 - 2 days',
      es: '1 a 2 días'
    }
  },
  {
    stepNumber: 5,
    title: {
      pt: 'Publicação no seu Domínio',
      en: 'Go-Live on Your Domain',
      es: 'Publicación en su Dominio'
    },
    desc: {
      pt: 'Colocamos seu site no ar com seu endereço oficial (ex: suaempresa.com.br), certificado de segurança HTTPS e cadastro no Google.',
      en: 'We launch your site under your custom domain (e.g. yourbusiness.com), secure SSL certificate, and Google indexing.',
      es: 'Publicamos su sitio con su dirección oficial (ej: suempresa.com), certificado seguro SSL y registro en Google.'
    },
    duration: {
      pt: '1 dia',
      en: '1 day',
      es: '1 día'
    }
  },
  {
    stepNumber: 6,
    title: {
      pt: 'Acesso ao Painel & Suporte',
      en: 'Admin Access & Ongoing Support',
      es: 'Acceso al Panel y Soporte'
    },
    desc: {
      pt: 'Entregamos o acesso ao painel para você alterar dados facilmente e ficamos à disposição no WhatsApp para tirar qualquer dúvida.',
      en: 'You receive full admin access to update information anytime, backed by our direct WhatsApp support.',
      es: 'Le entregamos el acceso al panel para editar contenidos y quedamos a su disposición en WhatsApp ante cualquier consulta.'
    },
    duration: {
      pt: 'Sempre disponível',
      en: 'Always available',
      es: 'Siempre disponible'
    }
  }
];
