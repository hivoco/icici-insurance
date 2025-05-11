


import Image from "next/image";
import React from "react";

function Life({ image, strong, small, span }) {
  return (
    <div className="p-3 bg-[#F2F2F2] flex gap-3 rounded-lg items-center w-full">
      <Image
        src={`/dev/${image}.png`}
        alt="Picture of the author"
        width={60}
        height={60}
      />
      <div className="flex text-[#004A80] flex-col w-full">
        <strong className="font-extrabold text-sm">{strong}</strong>
        <small className="font-extrabold text-xs">{small}</small>
        <span className="font-extrabold text-[10px]">{span}</span>
      </div>
    </div>
  );
}

export default Life;
