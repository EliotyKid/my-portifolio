import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrollArrow from "@/common/ScrollArrow";
import Contact from "@/components/Contact";
import { projects } from "@/Data/Projects";
import {
  copy,
  languageFrom,
  localizedHref,
  type SearchParams,
} from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }>; searchParams: SearchParams };
export async function generateMetadata({ params, searchParams }: Props) {
  const { slug } = await params;
  const item = projects.find((p) => p.slug === slug);
  const lang = languageFrom((await searchParams).lang);
  return {
    title: item?.title ?? copy[lang].unavailable,
    description: item?.summary[lang],
  };
}
export default async function ProjectPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const lang = languageFrom((await searchParams).lang);
  const t = copy[lang];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <>
      <main id="main" className="case-top section-shell">
        <Link className="case-back" href={localizedHref("/work", lang)}>
          <ScrollArrow direction="left" /> {t.back}
        </Link>
        <div className="case-title">
          <div>
            <p className="eyebrow">{t.demo} / Web</p>
            <h1>{project.title}</h1>
          </div>
          <a
            className="pill-link"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.visit}
            <ScrollArrow />
            <span className="sr-only">
              {lang === "pt" ? "(abre em nova aba)" : "(opens in a new tab)"}
            </span>
          </a>
        </div>
        <div className="case-meta">
          <div>
            <span className="eyebrow">
              {lang === "pt" ? "Projeto" : "Project"}
            </span>
            <p>{t.demo}</p>
          </div>
          <div>
            <span className="eyebrow">
              {lang === "pt" ? "Área" : "Discipline"}
            </span>
            <p>{t.web}</p>
          </div>
          <div>
            <span className="eyebrow">{t.stack}</span>
            <p>{project.stack.join(" · ")}</p>
          </div>
        </div>
        <div className="case-cover" style={{ background: project.color }}>
          <Image
            src={project.cover}
            alt={
              lang === "pt"
                ? `Página inicial do projeto ${project.title}`
                : `${project.title} homepage`
            }
            width={1440}
            height={960}
            priority
            sizes="(max-width: 760px) 100vw, 1100px"
          />
        </div>
        <section className="case-description">
          <h2>{t.overview}</h2>
          <div>
            <p>{project.description[lang]}</p>
            <div className="case-features">
              <h3 className="eyebrow">{t.features}</h3>
              {project.features[lang].map((feature, index) => (
                <div className="case-feature" key={feature}>
                  <span>0{index + 1}</span>
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="case-bottom">
          <span className="eyebrow">{t.next}</span>
          <Link href={localizedHref(`/work/${next.slug}`, lang)}>
            {next.title} <ScrollArrow />
          </Link>
        </div>
      </main>
      <Contact lang={lang} />
    </>
  );
}
