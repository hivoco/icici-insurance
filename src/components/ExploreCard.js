import Image from "next/image";

function ExploreCard({ image, title, isActive, onClick }) {
  return (
    <div
      className={`flex flex-col justify-center items-center mx-auto cursor-pointer transition-all duration-300 p-1 `}
      onClick={onClick}
    >
      <div className="w-full flex justify-center items-center h-16 px-6 py-11 pb-14 bg-white">
        <Image src={`/image/${image}`} alt={title} width={64} height={64} />
      </div>
      <strong
        className={`text-lg font-bold p-2
             ${
          isActive
            ? "bg-gradient-to-t from-[#44444480] to-[#FFFFFF] text-white"
            : "bg-transparent text-[#444444]"
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
