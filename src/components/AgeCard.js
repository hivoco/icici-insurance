// import Button from "@/element/Button";
// import React from "react";

// function AgeCard({ year, heading, subtext1, subtext2, onClick,playAudio }) {
//   return (
//     <div
//       onClick={playAudio}
//       className="rounded-3xl bg-[#F6F6F6] overflow-hidden "
//     >
//       <div className="bg-[url('/image/explore-card-header.png')] relative bg-cover bg-center h-28 w-full  text-black">
//         <strong className="w-full absolute top-1 transform -translate-x-1/2 text-[#AF292F] text-[26px] font-bold">
//           {year}
//         </strong>
//         <strong className="w-full absolute bottom-2  left-1/2 transform -translate-x-1/2  text-white text-3xl font-extrabold ">
//           {heading}
//         </strong>
//       </div>
//       <div className="py-4 px-5 text-[#9C9C9C] text-base font-semibold text-center">
//         <p>{subtext1}</p>
//         <hr className="my-4 border-t border-gray-300" />

//         <p>{subtext2}</p>
//       </div>
//       <div onClick={onClick} className="py-6">
//         <Button title={"Click to know more"} bg={"#F48120"} />
//       </div>
//     </div>
//   );
// }

// export default AgeCard;

import Button from "@/element/Button";
import React from "react";

function AgeCard({
  year,
  heading,
  subtext1,
  subtext2,
  onClick,
  playAudio,
  ...rest
}) {
  // Handle the button click, stopping propagation to prevent
  // the playAudio function from also being called
  const handleButtonClick = (e) => {
    e.stopPropagation(); // This prevents the event from bubbling up to parent elements
    onClick(); // Call the onClick function passed as prop
  };

  return (
    <div
      onClick={playAudio}
      className="rounded-3xl bg-[#F6F6F6] overflow-hidden"
      {...rest}
    >
      <div className="bg-[url('/image/explore-card-header.png')] relative bg-cover bg-center h-28 w-full text-black">
        <strong className="w-full absolute top-1 transform -translate-x-1/2 text-[#AF292F] text-[26px] font-bold">
          {year}
        </strong>
        <strong className="w-full absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-3xl font-extrabold">
          {heading}
        </strong>
      </div>
      <div className="py-4 px-5 text-[#9C9C9C] text-base font-semibold text-center">
        <p>{subtext1}</p>
        <hr className="my-4 border-t border-gray-300" />
        <p>{subtext2}</p>
      </div>
      <div className="py-6" onClick={handleButtonClick}>
        <Button title={"Click to know more"} bg={"#F48120"} />
      </div>
    </div>
  );
}

export default AgeCard;
