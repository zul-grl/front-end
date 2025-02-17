const Footer = () => {
  return (
    <div className="h-[755px] bg-primary pt-[60px] w-full">
      <div className="h-[92px] bg-[#EF4444] flex gap-[34px] overflow-hidden justify-center items-center w-full">
        {Array.from({ length: 7 }, (_, i) => (
          <h2 className="text-[30px] text-white">Fresh fast delivered</h2>
        ))}
      </div>
      <div className="p-[88px]"></div>
    </div>
  );
};
export default Footer;
