import ContactPageContent from "@/components/ContactPageContent";

export const metadata = {
  title: "Contatti",
  description: "Trova Il Lunario a Valfiaba o contatta la libreria indipendente su Instagram.",
};

export default async function ContactsPage({ searchParams }) {
  const params = await searchParams;
  const initialSubject = typeof params?.oggetto === "string" ? params.oggetto.slice(0, 120) : "";
  return <ContactPageContent initialSubject={initialSubject} />;
}
