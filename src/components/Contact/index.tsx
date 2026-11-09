import Link from "next/link";
import ScrollArrow from "@/common/ScrollArrow";
import CurvedReveal from "@/components/ui/CurvedReveal";
import { copy, type Language, localizedHref } from "@/lib/i18n";

export default function Contact({ lang = "pt" }: { lang?: Language }) {
  const t = copy[lang];
  return (
    <CurvedReveal
      reveal={
        <footer className="contact-footer">
          <div className="section-shell">
            <p className="eyebrow">{t.footerBody}</p>
            <div className="footer-title">
              <h2>
                {t.together}
                <br />
                {t.togetherLine}
              </h2>
              <ScrollArrow direction="down-right" />
            </div>
            <div className="footer-contact">
              <Link
                className="circle-link accent"
                href={localizedHref("/contact", lang)}
              >
                <span className="circle-label">{t.getInTouch}</span>
                <ScrollArrow />
              </Link>
            </div>
            <div className="footer-bottom">
              <div>
                <span className="eyebrow">{t.version}</span>
                <p>{new Date().getFullYear()} © Elias Rodrigues</p>
              </div>
              <div>
                <span className="eyebrow">{t.location}</span>
                <p>{t.brazil} · UTC−3</p>
              </div>
              <Link href={localizedHref("/work", lang)}>
                {t.work} <ScrollArrow />
              </Link>
            </div>
          </div>
        </footer>
      }
    />
  );
}
