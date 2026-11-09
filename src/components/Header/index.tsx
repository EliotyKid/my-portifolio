"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import Magnetic from "@/common/Magnetic";
import { copy, languageFrom, localizedHref } from "@/lib/i18n";
import Curve from "./nav/Curve";
import LinkItem from "./nav/Link";

export default function Header() {
  const menuId = useId();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = languageFrom(searchParams.get("lang"));
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const links = [
    { href: "/work", label: t.work },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact },
  ];

  useEffect(() => {
    const update = () =>
      setScrolled(
        window.scrollY >
          (window.matchMedia("(max-width: 760px)").matches
            ? 80
            : window.innerHeight),
      );
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
  }, [lang]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const elements = panel.current?.querySelectorAll<HTMLElement>("a, button");
    elements?.[0]?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
      if (event.key !== "Tab" || !elements?.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    setHovered(null);
    trigger.current?.focus({ preventScroll: true });
  }
  const languageLinks = (
    <div className="language-switch">
      {(["pt", "en"] as const).map((locale) => {
        const query = new URLSearchParams(searchParams.toString());
        if (locale === "en") query.set("lang", "en");
        else query.delete("lang");
        return (
          <Link
            key={locale}
            href={`${pathname}${query.size ? `?${query}` : ""}`}
            aria-current={locale === lang ? "true" : undefined}
            onClick={closeMenu}
            hrefLang={locale === "pt" ? "pt-BR" : "en"}
            aria-label={locale === "pt" ? "Português" : "English"}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header
        className={`site-header ${pathname === "/" ? "on-hero" : ""}`}
        data-scrolled={scrolled}
      >
        <Link
          className="brand"
          href={localizedHref("/", lang)}
          onClick={closeMenu}
        >
          <span className="copyright">©</span>
          <span>Elias Rodrigues</span>
        </Link>
        <nav className="desktop-nav" aria-label={t.navigation}>
          {links.map((link) => (
            <Magnetic key={link.href}>
              <Link
                href={localizedHref(link.href, lang)}
                aria-current={
                  pathname.startsWith(link.href) ? "page" : undefined
                }
              >
                {link.label}
              </Link>
            </Magnetic>
          ))}
          {languageLinks}
        </nav>
        <button
          ref={trigger}
          className="menu-trigger"
          type="button"
          onClick={() => {
            setOpen(!open);
          }}
          aria-expanded={open}
          aria-controls={menuId}
        >
          <span>{t.menu}</span>
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu-backdrop">
            <motion.button
              type="button"
              className="menu-dismiss"
              aria-label={t.close}
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
            />
            <motion.nav
              ref={panel}
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label={t.navigation}
              className="menu-panel"
              initial={{ x: reduced ? 0 : "calc(100% + 100px)" }}
              animate={{ x: 0 }}
              exit={{ x: reduced ? 0 : "calc(100% + 100px)" }}
              transition={{
                duration: reduced ? 0 : 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <Curve />
              <div className="menu-scroll">
                <button
                  className="menu-close"
                  type="button"
                  onClick={closeMenu}
                  aria-label={t.close}
                >
                  <span className="menu-lines" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                </button>
                <p className="eyebrow">{t.navigation}</p>
                <div
                  className="menu-nav"
                  onPointerLeave={() => setHovered(null)}
                >
                  {[{ href: "/", label: t.home }, ...links].map(
                    (link, index) => {
                      const href = localizedHref(link.href, lang);
                      const current =
                        link.href === "/"
                          ? pathname === "/"
                          : pathname === link.href ||
                            pathname.startsWith(`${link.href}/`);
                      return (
                        <LinkItem
                          key={link.href}
                          data={{ title: link.label, href, index }}
                          current={current}
                          isActive={
                            hovered === null ? current : hovered === href
                          }
                          setSelectedIndicator={setHovered}
                          onNavigate={() => {
                            closeMenu();
                            if (current)
                              window.scrollTo({
                                top: 0,
                                left: 0,
                                behavior: "instant",
                              });
                          }}
                        />
                      );
                    },
                  )}
                </div>
                <div className="menu-bottom">
                  {languageLinks}
                  <span>{t.based}</span>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
