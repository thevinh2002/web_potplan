import AdminLayoutClient from "./AdminLayout";
import "@/src/app/index.css";

export const metadata = {
  title: "Admin - Aurora Pots",
  description: "Admin dashboard for managing products",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
