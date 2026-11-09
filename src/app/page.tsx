import Link from "next/link";
import ScrollArrow from "@/common/ScrollArrow";
import Contact from "@/components/Contact";
import Description from "@/components/Description";
import Landing from "@/components/Landing";
import Projects from "@/components/Projects";
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
  return {
    title: {
      absolute:
        lang === "en"
          ? "Elias Rodrigues — Interactive web developer"
          : "Elias Rodrigues — Desenvolvedor web",
    },
    description: copy[lang].introBody,
  };
}
export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const lang = languageFrom((await searchParams).lang);
  return (
    <>
      <main id="main">
        <Landing lang={lang} />
        <Description lang={lang} />
        <Projects lang={lang} />
        <div className="all-work-link">
          <Link className="pill-link" href={localizedHref("/work", lang)}>
            {copy[lang].allWork}
            <sup>5</sup>
            <ScrollArrow />
          </Link>
        </div>
      </main>
      <Contact lang={lang} />
    </>
  );
}
