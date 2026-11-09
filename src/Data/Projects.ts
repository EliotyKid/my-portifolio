export type ProjectType = {
  slug: string;
  title: string;
  src: string;
  cover: string;
  color: string;
  category: "Web Development" | "Game Development";
  liveUrl: string;
  stack: string[];
  summary: { pt: string; en: string };
  description: { pt: string; en: string };
  features: { pt: string[]; en: string[] };
};

export const projects: ProjectType[] = [
  {
    slug: "forma",
    title: "Forma",
    src: "../projects/forma.webp",
    cover: "/projects/forma.webp",
    color: "#d6d3c7",
    category: "Web Development",
    liveUrl: "/demos/forma/index.html",
    stack: ["JavaScript", "GSAP", "Framer Motion", "CSS"],
    summary: {
      pt: "Uma galeria digital para desacelerar o olhar.",
      en: "A digital gallery that invites you to slow down.",
    },
    description: {
      pt: "Uma galeria imaginária que explora a relação entre arte, natureza e tempo. Tipografia editorial, imagens em destaque e movimento no scroll constroem uma experiência de contemplação. Projeto autoral demonstrativo, sem vínculo com uma galeria real.",
      en: "An imaginary gallery exploring art, nature and time. Editorial typography, prominent imagery and scroll-driven motion create a contemplative experience. An independent concept, with no affiliation to a real gallery.",
    },
    features: {
      pt: [
        "Composição editorial e imagens de arte",
        "Revelações e paralaxe no scroll",
        "Navegação por seções e movimento reduzido",
      ],
      en: [
        "Editorial composition and art imagery",
        "Scroll reveals and parallax",
        "Section navigation and reduced motion support",
      ],
    },
  },
  {
    slug: "oryzo",
    title: "ORYZO",
    src: "../projects/oryzo.webp",
    cover: "/projects/oryzo.webp",
    color: "#d9d9d5",
    category: "Web Development",
    liveUrl: "/demos/oryzo/index.html",
    stack: ["Next.js", "React", "GSAP", "Framer Motion"],
    summary: {
      pt: "Design de produto que convida à interação.",
      en: "Product design that invites interaction.",
    },
    description: {
      pt: "Um estudo de apresentação de produto, com ilustrações locais e uma linguagem visual centrada no essencial. A seleção de acabamento e a mudança de perspectiva permitem explorar o objeto. Site conceitual, sem checkout ou venda de produtos.",
      en: "A product presentation study with local illustrations and a visual language focused on the essentials. Finish selection and changing perspectives invite exploration. A concept website, without checkout or product sales.",
    },
    features: {
      pt: [
        "Seleção interativa de acabamento",
        "Mudança de perspectiva do produto",
        "Animações de entrada e scroll",
      ],
      en: [
        "Interactive finish selection",
        "Changing product perspectives",
        "Entrance and scroll animations",
      ],
    },
  },
  {
    slug: "slush",
    title: "Slush",
    src: "../projects/slush.webp",
    cover: "/projects/slush.webp",
    color: "#acd3ec",
    category: "Web Development",
    liveUrl: "/demos/slush/index.html",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Framer Motion"],
    summary: {
      pt: "Uma experiência digital com energia e personalidade.",
      en: "A digital experience with energy and personality.",
    },
    description: {
      pt: "Uma landing page que combina tipografia expressiva, ilustrações e interações de uma carteira demonstrativa. O movimento acompanha a identidade visual, com opção de pausa e suporte a movimento reduzido. Estudo independente, sem afiliação à Slush e sem transações reais.",
      en: "A landing page combining expressive typography, illustrations and a demonstration wallet. Motion follows the visual identity, with pause controls and reduced motion support. An independent study, unaffiliated with Slush, with no real transactions.",
    },
    features: {
      pt: [
        "Carteira demonstrativa com abas",
        "Letreiro e elementos animados com pausa",
        "FAQ e menu acessíveis por teclado",
      ],
      en: [
        "Demo wallet with tabs",
        "Animated marquee and elements with pause controls",
        "Keyboard-accessible FAQ and menu",
      ],
    },
  },
  {
    slug: "alex-morgan",
    title: "Alex Morgan",
    src: "../projects/alex-morgan.webp",
    cover: "/projects/alex-morgan.webp",
    color: "#dad7cf",
    category: "Web Development",
    liveUrl: "/demos/alex-morgan/index.html",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Framer Motion"],
    summary: {
      pt: "Um portfólio conceitual de design e experiências digitais.",
      en: "A concept portfolio for design and digital experiences.",
    },
    description: {
      pt: "Um portfólio para uma identidade profissional fictícia, com apresentação de trabalhos e exploração de interações visuais. O projeto demonstra composição, navegação e atenção aos detalhes em diferentes tamanhos de tela. Os trabalhos e a identidade apresentados fazem parte da demonstração.",
      en: "A portfolio for a fictional professional identity, presenting work through visual interactions. The project demonstrates composition, navigation and attention to detail across screen sizes. The identity and work shown are part of the demonstration.",
    },
    features: {
      pt: [
        "Apresentação visual de projetos",
        "Detalhes de trabalhos em diálogo",
        "Navegação mobile e interações por teclado",
      ],
      en: [
        "Visual project presentation",
        "Project details in dialogs",
        "Mobile navigation and keyboard interactions",
      ],
    },
  },
  {
    slug: "nexus-one",
    title: "NEXUS ONE",
    src: "../projects/nexus-one.webp",
    cover: "/projects/nexus-one.webp",
    color: "#c6c9cc",
    category: "Web Development",
    liveUrl: "/demos/nexus-one/index.html",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Framer Motion"],
    summary: {
      pt: "Uma apresentação imersiva para um controle conceitual.",
      en: "An immersive presentation for a concept controller.",
    },
    description: {
      pt: "Uma landing page de produto que explora imagens em destaque, escolha de cores e detalhes interativos. A experiência aproxima o visitante do produto por meio de movimento e uma galeria navegável. O controle e suas especificações são ilustrativos; não há integração de compra.",
      en: "A product landing page exploring prominent imagery, color selection and interactive details. Motion and a navigable gallery bring visitors closer to the product. The controller and its specifications are illustrative, with no purchase integration.",
    },
    features: {
      pt: [
        "Seleção de cores do produto",
        "Detalhes interativos e animações no scroll",
        "Galeria com toque, teclado e botões",
      ],
      en: [
        "Product color selection",
        "Interactive details and scroll animations",
        "Gallery with touch, keyboard and button controls",
      ],
    },
  },
];
