export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  cover: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const featuredProjects: Project[] = [
  {
    slug: "pet-pendant",
    title: "Pet Pendant 3D",
    subtitle: "Luxury E-Commerce Experience",
    description:
      "Plataforma de e-commerce premium com customizador de joias interativo em 3D. Focado no mercado europeu, integrando performance extrema e transições fluidas.",
    stack: ["Next.js", "Three.js", "React Three Fiber", "Shopify API", "GSAP"],
    cover: "/projects/pet-pendant.webp", // Certifique-se de ter essa imagem em /public
    liveUrl: "https://petpendant.co",
  },
  {
    slug: "tengu-beyond",
    title: "Beyond: Tengu Chronicles",
    subtitle: "Immersive TCG Landing Page",
    description:
      "Landing page imersiva para o lançamento do card game Tengu. Motion design agressivo, paralaxe baseado no scroll e revelações de assets em alta fidelidade.",
    stack: ["Next.js", "GSAP", "Tailwind CSS", "Framer Motion"],
    cover: "/projects/tengu.webp",
    liveUrl: "#",
  },
];
