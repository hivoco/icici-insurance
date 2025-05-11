import React, { useEffect, useRef } from "react";

export default function ScrollableCards() {
  // const scrollContainerRef = useRef(null);

  // const centerScrollPosition = () => {
  //   const container = scrollContainerRef.current;
  //   if (container) {
  //     const scrollableWidth = container.scrollWidth - container.clientWidth;
  //     container.scrollLeft = scrollableWidth / 2;
  //   }
  // };

  // useEffect(() => {
  //   centerScrollPosition();
  // }, []);

  return (
    <div className="flex  justify-center items-center ">
      <div className="min-w-[53%] max-w-64 flex flex-col items-center justify-center rounded-full border-1 border-[#F48120] text-[#F48120] px-7 py-7 text-center relative">
        <span className="text-[60px] absolute top-0 left-4 text-orange-200 font-bold leading-none">
          “
        </span>
        <p className="text-[10px] font-bold ">
          {
            "Over 75% of Indian retirees say they wish they had started saving earlier.".split(
              "75%"
            )[0]
          }
          <span className="text-base leading-[100%]">75%</span>
          {
            "Over 75% of Indian retirees say they wish they had started saving earlier.".split(
              "75%"
            )[1]
          }
        </p>

        <span className="text-[60px] absolute -bottom-3 right-4 text-orange-200 font-bold leading-none">
          ”
        </span>
      </div>
    </div>
  );
}
