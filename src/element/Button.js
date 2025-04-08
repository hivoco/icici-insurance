import { ChevronRight } from "lucide-react";
import React from "react";

function Button({ title, bg="#fff" }) {
  return (
    <div
      style={{ color: bg }}
      className={` flex justify-center items-center gap-1 cursor-pointer`}
    >
      <div className="text-base font-normal ">{title}</div>
      <ChevronRight
        style={{ color: bg, borderColor:bg?bg:'#fff' }}
        className="rounded-full border  w-4 h-4"
      />
    </div>
  );
}

export default Button;
