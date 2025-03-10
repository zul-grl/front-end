import Footer from "../_components/Footer";
import Header from "../_components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-[#404040]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
