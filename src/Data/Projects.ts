export type ProjectType = {
  title: string;
  src: string;
  color: string;
  category: "Web Development" | "Game Development";
};

export const projects: ProjectType[] = [
  { title: "C2 Montreal", src: "c2montreal.png", color: "#000000", category: "Game Development" },
  { title: "Office Studio", src: "officestudio.png", color: "#8C8C8C", category: "Web Development" },
  { title: "Locomotive", src: "locomotive.png", color: "#EFE8D3", category: "Web Development" },
  { title: "Silencio", src: "silencio.png", color: "#706D63", category: "Game Development" },
];