import Link from "next/link";
import ScrollArrow from "@/common/ScrollArrow";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import { projects } from "@/Data/Projects";
import { copy, type Language, localizedHref } from "@/lib/i18n";

export default function WorkListing({
  lang,
  category = "all",
}: {
  lang: Language;
  category?: "all" | "web" | "games";
}) {
  const t = copy[lang];
  const items = projects.filter(
    (p) =>
      category === "all" ||
      p.category ===
        (category === "web" ? "Web Development" : "Game Development"),
  );
  const tabs = [
    { href: "/work", value: "all", label: t.all, count: projects.length },
    {
      href: "/work/webdev",
      value: "web",
      label: t.web,
      count: projects.filter((p) => p.category === "Web Development").length,
    },
    {
      href: "/work/gamedev",
      value: "games",
      label: t.games,
      count: projects.filter((p) => p.category === "Game Development").length,
    },
  ];
  return (
    <>
      <main id="main">
        <div className="page-intro section-shell">
          <p className="eyebrow">{t.work} / Elias Rodrigues</p>
          <h1>
            {category === "all"
              ? t.workTitle
              : category === "web"
                ? t.webTitle
                : t.gamesTitle}
          </h1>
          <p>
            {category === "all"
              ? t.workBody
              : category === "web"
                ? t.webBody
                : t.gamesBody}
          </p>
        </div>
        <nav className="work-filters section-shell" aria-label={t.work}>
          {tabs.map((tab) => (
            <Link
              key={tab.value}
              className="pill-link"
              aria-current={category === tab.value ? "page" : undefined}
              href={localizedHref(tab.href, lang)}
            >
              {tab.label}
              <sup>{tab.count}</sup>
            </Link>
          ))}
        </nav>
        {items.length ? (
          <>
            <Projects
              lang={lang}
              items={items}
              heading={false}
              showViewToggle={category === "all"}
            />
            <div className="listing-end" />
          </>
        ) : (
          <section className="empty-state section-shell">
            <p>{t.emptyGames}</p>
            <Link
              className="pill-link"
              href={localizedHref("/work/webdev", lang)}
            >
              {t.web}
              <ScrollArrow />
            </Link>
          </section>
        )}
      </main>
      <Contact lang={lang} />
    </>
  );
}
