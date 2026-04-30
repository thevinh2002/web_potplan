import { getAllContacts } from "@/src/server/actions/contact";
import AdminContacts from "./AdminContacts.tsx";

export default async function ContactsPage() {
  const contacts = await getAllContacts();

  return <AdminContacts initialContacts={contacts} />;
}
