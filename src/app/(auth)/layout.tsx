export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-10 flex gap-20 justify-center w-full h-full">
      <div className="py-12 flex items-center">{children}</div>
      <div className="max-w-[1000px] h-[1050px] overflow-hidden rounded-md">
        <img
          src="https://s3-alpha-sig.figma.com/img/5d86/e6a2/488bb31d983ecd581caec983f3a32842?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=s9s6n0YLZqP1oUMuv~8bybu~VAB8reKfcmpZeSJXhI4uvGyrR5h9aaPUYFDAa3LbcapgbvgLdyOBBU8DLzW8XO8ANU11dbfko8dn89tKKhbpaaxS6JgzM6A8QtsiUJoI8BQ9CsJLMWx3qZMfdnHp6sPvYf5qc1vSva8lqq5NopPuE0k0xW5QCEVa1kSZlDNt5vtY1EPDB86CK~nhMqOyf3bGjQ26WCXLRi4aw~NahLUyTsarKHjWP-gbRhzngNgZ1mlWFE6J2n--QheNgWkCuRzFr2bIyxw2oMDUHyjVh8r1ac2oceYvjPUTdJueOnO3LuW0q~XMFxG20ZbxqegxcA__"
          alt=""
          className="w-[100%] h-[100%] object-cover"
        />
      </div>
    </div>
  );
}
