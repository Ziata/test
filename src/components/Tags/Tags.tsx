function Tags() {
  return (
    <div className="w-full mt-[20px] md:mt-0 flex gap-[8px] md:gap-[18px] flex-wrap">
      <button className="font-bold underline text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
        Science News
      </button>
      <span className="text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
        |
      </span>
      <button className="text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
        From the journals
      </button>
      <span className="text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
        |
      </span>
      <button className="text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
        New frontiers
      </button>
      <span className="text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
        |
      </span>
      <button className="text-base leading-5 flex items-center font-Din text-[#33566C] hover:text-[#0071BC] transition-all duration-300">
        Observations
      </button>
    </div>
  );
}

export default Tags;
