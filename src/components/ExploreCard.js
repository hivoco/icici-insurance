import Image from "next/image";

function ExploreCard({ image, title, isActive, onClick }) {
  return (
    <div
      className={`flex  flex-col justify-center items-center mx-auto cursor-pointer transition-all duration-300 
          ${
            isActive
              ? "bg-gradient-to-t from-[#444444]/50 to-[#FFFFFF] text-white"
              : "bg-transparent text-[#444444]"
          } 
      
      `}
      onClick={onClick}
    >
      <div className="w-full flex justify-center items-center h-16 px-6 py-11 pb-14 bg-white relative">
        <Image src={`/image/${image}`} alt={title} width={64} height={64} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex h-8 w-8">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-orange-500 opacity-60"></span>
          </span>
        </div>
      </div>
      <strong
        className={`text-lg font-bold p-2 w-full
            ${
              isActive
                ? " text-white"
                : " text-[#444444]"
            } 
        `}
      >
        {title}
      </strong>
      <div
        className={`h-1 w-full  rounded-b-2xl ${
          isActive
            ? "bg-gradient-to-r from-[#F48120] to-[#FCB62E]"
            : "bg-transparent"
        }`}
      />
    </div>
  );
}

export default ExploreCard;
