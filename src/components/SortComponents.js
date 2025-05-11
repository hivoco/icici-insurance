import Image from "next/image";
import React from "react";

function SortComponents({image, text,onClick}) {
  return (
    <div
      onClick={onClick}
      className=" flex flex-col items-center justify-between gap-3"
    >
      {" "}
      <Image
        src={`/dev/${image}.png`}
        alt="Picture of the author"
        width={60}
        height={60}
      />
      <strong className="font-bold text-sm text-[#F48120]">{text}</strong>
    </div>
  );
}

export default SortComponents;
