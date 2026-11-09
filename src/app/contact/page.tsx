import Link from "next/link";
import ScrollArrow from "@/common/ScrollArrow";
import Contact from "@/components/Contact";
import ContactForm from "@/components/ContactForm";
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
  return { title: copy[lang].contact, description: copy[lang].contactBody };
}
export default async function ContactPage({
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
          <p className="eyebrow">Elias Rodrigues / {t.contact}</p>
          <h1>{t.contactTitle}</h1>
          <p>{t.contactBody}</p>
        </div>
        <div className="contact-page section-shell">
          <ContactForm lang={lang} />
          <aside className="contact-aside">
            <h2 className="eyebrow">{t.role}</h2>
            <p>{t.introBody}</p>
            <h2 className="eyebrow">{t.location}</h2>
            <p>
              {t.brazil} · UTC−3
              <br />
              {t.based}
            </p>
            <Link className="pill-link" href={localizedHref("/work", lang)}>
              {t.recent}
              <ScrollArrow />
            </Link>
          </aside>
        </div>
      </main>
      <Contact lang={lang} />
    </>
  );
}
