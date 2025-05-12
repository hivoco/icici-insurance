import Image from "next/image";
import React from "react";

function SortComponents({ image, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className=" flex flex-col items-center justify-between gap-3 cursor-pointer"
    >
      {" "}
      <div className="relative">
        {" "}
        <Image
          src={`/dev/${image}.png`}
          alt="Picture of the author"
          width={60}
          height={60}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex h-8 w-8">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-orange-500 opacity-60"></span>
          </span>
        </div>
      </div>
      <strong className="font-bold text-sm text-[#F48120]">{text}</strong>
    </div>
  );
}

export default SortComponents;
