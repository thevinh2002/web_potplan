import AdminLayoutClient from "./AdminLayout";

export const metadata = {
  title: "Admin - Aurora Pots",
  description: "Admin dashboard for managing products",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
