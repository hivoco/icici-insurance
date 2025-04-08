import Image from "next/image";
import React from "react";

function SmallCard({ image, p1, p2,p3,first=false }) {
  return (
    <>
      {first ? (
        <div className="bg-gradient-to-b from-[#F48120] to-[#F48120] p-6  text-left">
          <div className="w-full  h-[100px] mb-4 ">
            <Image
              src={`/image/${image}`}
              alt="Picture of the author"
              width={100}
              height={100}
              className="border"
            />
          </div>

          <strong className="text-white font-extrabold text-[26px]   ">
            {p1}
          </strong>
          <p className="font-semibold text-[20px]  text-white  mt-2">
            {p2}
          </p>
          <p className="font-semibold text-[20px]  text-white  mt-2">
            {p3}
          </p>
        </div>
      ) : (
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#EDEEE2] p-6  text-left">
          <div className="w-full  h-12 mb-4 ">
            <Image
              src={`/image/${image}`}
              alt="Picture of the author"
              width={50}
              height={53}
              className="border"
            />
          </div>

          <strong className="text-[#F48120] font-extrabold text-[26px]   ">
            {p1}
          </strong>
          <p className="font-semibold text-[20px]  text-black  mt-2">
            {p2}
          </p>
          <p className="font-semibold text-[20px]  text-black  mt-2">
            {p3}
          </p>
        </div>
      )}
    </>
  );
}

export default SmallCard;
