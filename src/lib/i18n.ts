export type Language = "pt" | "en";
export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
export function languageFrom(value: unknown): Language {
  return value === "en" ? "en" : "pt";
}
export function localizedHref(path: string, lang: Language) {
  return lang === "en" ? `${path}?lang=en` : path;
}
export const copy = {
  pt: {
    work: "Projetos",
    about: "Sobre",
    contact: "Contato",
    menu: "Menu",
    close: "Fechar",
    navigation: "Navegação",
    role: "Desenvolvedor web",
    freelance: "Freelance",
    based: "Do Brasil para o mundo",
    intro: "Sites que se movem. Ideias que ganham vida.",
    introBody:
      "Crio sites dinâmicos e interativos, unindo desenvolvimento e movimento para dar personalidade à sua presença digital.",
    aboutMe: "Sobre mim",
    recent: "Projetos selecionados",
    allWork: "Todos os projetos",
    view: "Ver projeto",
    web: "Desenvolvimento web",
    games: "Desenvolvimento de jogos",
    all: "Todos",
    workTitle: "Ideias em movimento.",
    workBody:
      "Uma seleção de experiências digitais. Explore, interaja e veja o que podemos criar juntos.",
    webTitle: "Feitos para interagir.",
    webBody:
      "Cinco estudos autorais de desenvolvimento web. Diferentes linguagens visuais, a mesma atenção aos detalhes.",
    gamesTitle: "Outros mundos.",
    gamesBody: "Jogos também fazem parte do meu universo criativo.",
    emptyGames:
      "Os projetos de jogos serão apresentados aqui. Enquanto isso, conheça minhas experiências para a web.",
    together: "Vamos criar",
    togetherLine: "algo juntos.",
    getInTouch: "Vamos conversar",
    footerBody: "Tem uma ideia em mente? Conte o que você quer construir.",
    version: "Edição",
    location: "Localização",
    brazil: "Brasil",
    back: "Voltar aos projetos",
    demo: "Demonstração autoral",
    visit: "Explorar o site",
    overview: "Sobre o projeto",
    features: "Na experiência",
    stack: "Tecnologias",
    next: "Próximo projeto",
    aboutTitle: "Código, movimento e intenção.",
    aboutBody:
      "Sou Elias Rodrigues, desenvolvedor focado em sites dinâmicos e interativos. Gosto de transformar ideias em experiências que convidam as pessoas a explorar.",
    aboutSecond:
      "Meu foco está no desenvolvimento web, com interesse também na criação de jogos. Uso código e animação para construir interfaces com personalidade, sem deixar de lado clareza e usabilidade.",
    skills: "Ferramentas do meu trabalho",
    contactTitle: "Uma boa ideia começa com uma conversa.",
    contactBody:
      "Conte sobre seu projeto, o que você precisa e o que imagina para ele.",
    skip: "Pular para o conteúdo",
    unavailable: "Página não encontrada",
    unavailableBody: "Este caminho não existe. Vamos voltar ao início?",
    home: "Início",
  },
  en: {
    work: "Work",
    about: "About",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    navigation: "Navigation",
    role: "Web developer",
    freelance: "Freelance",
    based: "From Brazil to the world",
    intro: "Websites in motion. Ideas brought to life.",
    introBody:
      "I build dynamic, interactive websites, combining development and motion to give your digital presence a distinct personality.",
    aboutMe: "About me",
    recent: "Selected work",
    allWork: "All projects",
    view: "View project",
    web: "Web development",
    games: "Game development",
    all: "All",
    workTitle: "Ideas in motion.",
    workBody:
      "A selection of digital experiences. Explore, interact and see what we could create together.",
    webTitle: "Built to interact.",
    webBody:
      "Five independent web development studies. Different visual languages, the same attention to detail.",
    gamesTitle: "Other worlds.",
    gamesBody: "Games are also part of my creative world.",
    emptyGames:
      "Game projects will be featured here. In the meantime, explore my experiences for the web.",
    together: "Let’s create",
    togetherLine: "something together.",
    getInTouch: "Let’s talk",
    footerBody: "Have an idea in mind? Tell me what you want to build.",
    version: "Edition",
    location: "Location",
    brazil: "Brazil",
    back: "Back to projects",
    demo: "Independent concept",
    visit: "Explore the website",
    overview: "About the project",
    features: "The experience",
    stack: "Technologies",
    next: "Next project",
    aboutTitle: "Code, motion and purpose.",
    aboutBody:
      "I’m Elias Rodrigues, a developer focused on dynamic, interactive websites. I enjoy turning ideas into experiences that invite people to explore.",
    aboutSecond:
      "My current focus is web development, with an interest in making games too. I use code and animation to build interfaces with personality, while keeping clarity and usability at their core.",
    skills: "Tools of my trade",
    contactTitle: "A good idea starts with a conversation.",
    contactBody:
      "Tell me about your project, what you need and what you envision for it.",
    skip: "Skip to content",
    unavailable: "Page not found",
    unavailableBody: "This path does not exist. Shall we head back home?",
    home: "Home",
  },
};
