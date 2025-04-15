import Button from "@/element/Button";
import React from "react";

function AgeCard({ year, heading, subtext1, subtext2 ,onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-3xl bg-[#F6F6F6] overflow-hidden "
    >
      <div className="bg-[url('/image/explore-card-header.png')] relative bg-cover bg-center h-28 w-full  text-black">
        <strong className="w-full absolute top-1 transform -translate-x-1/2 text-[#AF292F] text-[26px] font-bold">
          {year}
        </strong>
        <strong className="w-full absolute bottom-2  left-1/2 transform -translate-x-1/2  text-white text-3xl font-extrabold ">
          {heading}
        </strong>
      </div>
      <div className="py-4 px-5 text-[#9C9C9C] text-base font-semibold text-center">
        <p>{subtext1}</p>
        <hr className="my-4 border-t border-gray-300" />

        <p>{subtext2}</p>
      </div>
      <div className="py-6">
        <Button title={"Click to know more"} bg={"#F48120"} />
      </div>
    </div>
  );
}

export default AgeCard;
