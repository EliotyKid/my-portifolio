import Image from "next/image";
import Link from "next/link";
import ScrollArrow from "@/common/ScrollArrow";
import Contact from "@/components/Contact";
import {
  copy,
  languageFrom,
  localizedHref,
  type SearchParams,
} from "@/lib/i18n";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const lang = languageFrom((await searchParams).lang);
  return { title: copy[lang].about, description: copy[lang].aboutBody };
}
export default async function About({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const lang = languageFrom((await searchParams).lang);
  const t = copy[lang];
  return (
    <>
      <main id="main">
        <div className="page-intro section-shell">
          <p className="eyebrow">Elias Rodrigues / {t.about}</p>
          <h1>{t.aboutTitle}</h1>
        </div>
        <section className="about-layout section-shell">
          <div className="about-photo">
            <Image
              src="/images/eu.jpg"
              alt="Elias Rodrigues"
              fill
              priority
              sizes="(max-width: 760px) 90vw, 45vw"
            />
          </div>
          <div className="about-copy">
            <p>{t.aboutBody}</p>
            <p>{t.aboutSecond}</p>
            <h2 className="eyebrow">{t.skills}</h2>
            <ul className="skills">
              {[
                "Next.js",
                "React",
                "GSAP",
                "Framer Motion",
                "Tailwind CSS",
                "Git",
                "Docker",
                "PostgreSQL",
              ].map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <Link className="pill-link" href={localizedHref("/contact", lang)}>
              {t.getInTouch}
              <ScrollArrow />
            </Link>
          </div>
        </section>
      </main>
      <Contact lang={lang} />
    </>
  );
}
