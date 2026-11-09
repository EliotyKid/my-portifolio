import Link from "next/link";
import ScrollArrow from "@/common/ScrollArrow";
export default function NotFound() {
  return (
    <main id="main" className="page-intro section-shell error-page">
      <p className="eyebrow">404</p>
      <h1>
        Página não encontrada.
        <br />
        Page not found.
      </h1>
      <Link className="pill-link" href="/">
        Início / Home <ScrollArrow />
      </Link>
    </main>
  );
}
