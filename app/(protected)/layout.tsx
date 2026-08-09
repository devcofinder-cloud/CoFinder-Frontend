import Navbar from "../components/Layout/Navbar";
import Footer from "./dashboard/Dashboard-Components/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}