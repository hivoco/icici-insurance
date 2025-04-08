import Image from "next/image";
import React from "react";

function PulseCard({ image, title }) {
  return (
    <div className="flex items-center cursor-pointer text-left gap-4 hover:bg-orange-200 p-2 rounded-2xl">
      <div className="min-w-[72px] min-h-[72px] relative">
        <Image
          src={`/image/${image}`}
          alt="Picture of the author"
          fill
          className="object-cover"
        />
      </div>

      {/* <p className="text-base font-medium text-[#AF292F] ">{title}</p> */}
      <p
        className="text-base font-medium text-[#AF292F] "
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
}

export default PulseCard;
