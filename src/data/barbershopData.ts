export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  popular?: boolean;
  category: 'cabelo' | 'barba' | 'combo' | 'especial';
}

export interface GalleryPhoto {
  id: number;
  url: string;
  title: string;
  caption: string;
  aspectRatio?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BarbershopConfig {
  name: string;
  shortName: string;
  slogan: string;
  niche: string;
  phone: string;
  phoneRaw: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    full: string;
    googleMapsUrl: string;
  };
  openingHours: { days: string; hours: string }[];
  whatsappLink: string;
  realPhotos: GalleryPhoto[];
  services: ServiceItem[];
  differentials: { title: string; description: string; icon: string }[];
  faqs: FAQItem[];
  testimonials: { name: string; role: string; comment: string; rating: number; date: string }[];
}

export const BARBERSHOP_DATA: BarbershopConfig = {
  name: 'Barbearia Matheus lucian',
  shortName: 'Matheus Lucian',
  slogan: 'Onde o homem se sente bem',
  niche: 'Barbearia Clássica e Contemporânea',
  phone: '(61) 99292-0911',
  phoneRaw: '5561992920911',
  address: {
    street: 'CCSW 6 - St. Sudoeste comércio local',
    neighborhood: 'Sudoeste',
    city: 'Brasília',
    state: 'DF',
    cep: '70655-775',
    full: 'CCSW 6 - St. Sudoeste comércio local - Sudoeste, Brasília - DF, 70655-775',
    googleMapsUrl: 'https://maps.google.com/?q=CCSW+6+St.+Sudoeste+comercio+local+Sudoeste+Brasilia+DF+70655-775',
  },
  openingHours: [
    { days: 'Segunda a Sexta-feira', hours: '09:00 às 20:00' },
    { days: 'Sábado', hours: '08:30 às 19:00' },
    { days: 'Domingo', hours: 'Fechado (Atendimento com hora marcada sob consulta)' },
  ],
  whatsappLink: 'https://wa.me/5561992920911?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20hor%C3%A1rio%20na%20Barbearia%20Matheus%20lucian!',
  realPhotos: [
    {
      id: 1,
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcHrrbfNvNJjT2vJVuwMmuWEDQPURTI5iVDLrKPUOSlvrkDQ2m8bQYcxp0kE_SdZAi8LIN7c30kY7fZedWgEBtUHy1ZD_TIYII96_8dsCox_XT2T5V5pmgwQa0yg8TaQT-B_dcR67kUya8=s4800-w1024',
      title: 'Ambiente Sofisticado & Acolhedor',
      caption: 'Espaço planejado no Sudoeste para oferecer conforto, atendimento personalizado e requinte.',
      aspectRatio: 'landscape'
    },
    {
      id: 2,
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfckzKx2NSbksM3nf9KxOP5EuSJT1RpadbGLxR3v8gU3aEyZiPvhSOR27redpbGHbEOI62_EKGU1efO4TuXtJQsE-W1eqK-Y_fxcgi4nwMMGRnDhgeAHmok2FbbdrWyQnVwWcXM00bjRR5R=s4800-w1024',
      title: 'Cadeiras Clássicas & Conforto',
      caption: 'Estações ergonômicas de alto padrão para você relaxar enquanto cuida do visual.',
      aspectRatio: 'landscape'
    },
    {
      id: 3,
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLclEjII1MdlwkoyXKhxbUWDyx0e3SGDvNxo-7lTeNe5OpcyDualFwwFprCgnoGlBcT0DobzrGEBRo9LrQ71LrzVUlZAGFXqpQ58P5SqiVAZIYOFfy5tt1W1XYd_DbV24m-E2iTxfO_D4z0=s4800-w1024',
      title: 'Precisão nos Detalhes & Barba',
      caption: 'Ferramentas esterilizadas e produtos de linha profissional para acabamento impecável.',
      aspectRatio: 'landscape'
    },
    {
      id: 4,
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcG9VhXjVNvX4vpYSFKPPgZ2wh4KpdsMr3girLV4KgEoXMd3uS2q7Jw0HP0XOYAuHEV2gHcFHLv3XrJbVoHml9VzPbGAtpLhDhaDDDH4yUkIG7Df4ywHqdzF5JRd2Tv1rdNL88vO3-HL3d3=s4800-w1024',
      title: 'Experiência & Bem-Estar',
      caption: 'Onde o homem se sente bem: café selecionado, conversa agradável e pontualidade.',
      aspectRatio: 'landscape'
    }
  ],
  services: [
    {
      id: 'corte-cabelo',
      name: 'Corte de Cabelo Exclusivo',
      description: 'Consultoria de visagismo, lavagem relaxante, corte tradicional na tesoura ou degradê/fade com máquina e finalização com pomada premium.',
      duration: '45 min',
      price: 'R$ 70',
      popular: true,
      category: 'cabelo'
    },
    {
      id: 'barboterapia',
      name: 'Barboterapia & Toalha Quente',
      description: 'Ritual completo com esfoliação facial, aplicação de óleo pré-shave, toalha quente com óleos essenciais, navalha afiada e pós-barba refrescante.',
      duration: '40 min',
      price: 'R$ 60',
      popular: true,
      category: 'barba'
    },
    {
      id: 'combo-corte-barba',
      name: 'Combo Completo (Cabelo + Barba)',
      description: 'A experiência completa: corte personalizado + barboterapia com toalha quente e acabamento refinado para renovar totalmente a sua presença.',
      duration: '1h 20 min',
      price: 'R$ 120',
      popular: true,
      category: 'combo'
    },
    {
      id: 'acabamento-pezinho',
      name: 'Acabamento & Pezinho',
      description: 'Manutenção do contorno do cabelo, costeletas e nuca na lâmina descartável para manter o visual alinhado entre os cortes.',
      duration: '20 min',
      price: 'R$ 35',
      category: 'cabelo'
    },
    {
      id: 'barba-express',
      name: 'Alinhamento de Barba Express',
      description: 'Aparação de volume e definição rápida das linhas da bochecha e pescoço para quem tem o dia a dia corrido.',
      duration: '25 min',
      price: 'R$ 45',
      category: 'barba'
    },
    {
      id: 'sobrancelha-camuflagem',
      name: 'Design de Sobrancelha Masculina',
      description: 'Limpeza natural respeitando o desenho original masculino com pinça e lâmina, sem afinar.',
      duration: '15 min',
      price: 'R$ 25',
      category: 'especial'
    }
  ],
  differentials: [
    {
      title: 'Pontualidade Britânica',
      description: 'Seu tempo é valioso. Trabalhamos com agendamento organizado para que você não perca horas na fila.',
      icon: 'Clock'
    },
    {
      title: 'Toalha Quente e Aromaterapia',
      description: 'Ritual clássico que abre os poros, amolece a barba e proporciona um relaxamento revigorante.',
      icon: 'Flame'
    },
    {
      title: 'Ambiente Masculino & Confortável',
      description: 'Ar-condicionado, café expresso de boas-vindas, água fresca e som ambiente agradável no Sudoeste.',
      icon: 'Coffee'
    },
    {
      title: 'Biossegurança Rigorosa',
      description: 'Lâminas 100% descartáveis e materiais esterilizados para garantir sua total saúde e tranquilidade.',
      icon: 'ShieldCheck'
    }
  ],
  faqs: [
    {
      question: 'Preciso agendar com antecedência ou atendem por ordem de chegada?',
      answer: 'Para garantir pontualidade e dedicação exclusiva a você, priorizamos o agendamento prévio online ou via WhatsApp. Caso haja vaga no momento em que você chegar, teremos prazer em atender, mas agendar garante que sua cadeira estará pronta no minuto marcado.'
    },
    {
      question: 'Como funciona o serviço de Barboterapia?',
      answer: 'A barboterapia é uma experiência de spa masculino. Aplicamos óleos hidratantes e creme emoliente na pele, seguida pela aplicação da toalha quente com infusão aromática. O barbear é feito com lâmina suave e descartável, finalizando com toalha fria para fechamento dos poros e bálsamo hidratante.'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos Pix (com confirmação instantânea), cartões de débito e crédito (principais bandeiras: Visa, Mastercard, Elo, Amex) e dinheiro em espécie.'
    },
    {
      question: 'Onde fica a barbearia e tem estacionamento no local?',
      answer: 'Estamos localizados na CCSW 6, St. Sudoeste comércio local, no coração do Sudoeste em Brasília - DF (CEP 70655-775). Há vagas de estacionamento públicas e rotativas em frente e nas imediações do bloco comercial.'
    },
    {
      question: 'Como funciona o agendamento online deste site?',
      answer: 'Você escolhe o serviço desejado, a data e o horário mais convenientes para você. Ao clicar em "Confirmar pelo WhatsApp", o sistema gera uma mensagem pronta com todos os detalhes e envia diretamente para o nosso WhatsApp (61) 99292-0911. Nós confirmamos imediatamente!'
    },
    {
      question: 'E se eu precisar cancelar ou reagendar meu horário?',
      answer: 'Sem problemas! Pedimos apenas a gentileza de nos avisar pelo WhatsApp com pelo menos 1 ou 2 horas de antecedência para que possamos liberar a vaga para outro cliente e reagendar seu novo horário com prioridade.'
    }
  ],
  testimonials: [
    {
      name: 'Rodrigo Medeiros',
      role: 'Morador do Sudoeste',
      comment: 'Melhor experiência de barbearia em Brasília. O Matheus é extremamente detalhista no corte e o ambiente é acolhedor e limpo. A toalha quente na barba é relaxamento puro.',
      rating: 5,
      date: 'Há 2 semanas'
    },
    {
      name: 'Felipe Alencar',
      role: 'Cliente frequente',
      comment: 'Pontualidade de verdade, o que é raro em Brasília. Cheguei no horário marcado e fui prontamente atendido. O corte fade ficou impecável. Recomendo de olhos fechados!',
      rating: 5,
      date: 'Há 1 mês'
    },
    {
      name: 'Carlos Eduardo Santos',
      role: 'Empresário',
      comment: 'Atendimento nota 10. Você toma um ótimo café, troca uma boa ideia e sai com a autoestima renovada. O slogan "Onde o homem se sente bem" define perfeitamente o local.',
      rating: 5,
      date: 'Há 3 semanas'
    }
  ]
};
