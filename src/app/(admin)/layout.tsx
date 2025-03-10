import SideBar from "./components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
