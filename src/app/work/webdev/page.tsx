import WorkListing from "@/components/WorkListing";
import { copy, languageFrom, type SearchParams } from "@/lib/i18n";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const lang = languageFrom((await searchParams).lang);
  return { title: copy[lang].web, description: copy[lang].webBody };
}
export default async function WebDevPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <WorkListing
      lang={languageFrom((await searchParams).lang)}
      category="web"
    />
  );
}
