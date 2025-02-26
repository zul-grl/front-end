import SideBar from "./components/Layout/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
