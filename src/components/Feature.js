// import Image from "next/image";
// import React from "react";

// function Feature({ image, text, onClick }) {
//   return (
//     <div
//       onClick={onClick}
//       className="relative min-w-36 flex  bg-[#F2F2F2] text-[#004A80] px-4 py-3 rounded-xl text-center font-bold text-base"
//     >
//       <Image
//         src={`/dev/${image}.svg`}
//         alt="Picture of the author"
//         width={40}
//         height={40}
//         className="absolute -top-3 -left-3"
//       />
//       <p className="w-full" dangerouslySetInnerHTML={{ __html: text }} />
//     </div>
//   );
// }

// export default Feature;


import Image from "next/image";
import React from "react";

function Feature({ image, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-full flex bg-[#F2F2F2] text-[#004A80] px-4 py-3 rounded-xl text-center font-bold text-base cursor-pointer"
    >
      <Image
        src={`/dev/${image}.svg`}
        alt="Picture of the author"
        width={40}
        height={40}
        className="absolute -top-3 -left-3"
      />

      <div className="absolute  -top-2 -left-2 ">
        <span className="relative flex h-8 w-8">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-8 w-8 bg-orange-500 opacity-60"></span>
        </span>
      </div>
      <p className="w-full" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export default Feature;
