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
      className="relative w-full flex bg-[#F2F2F2] text-[#004A80] px-4 py-3 rounded-xl text-center font-bold text-base"
    >
      <Image
        src={`/dev/${image}.svg`}
        alt="Picture of the author"
        width={40}
        height={40}
        className="absolute -top-3 -left-3"
      />
      <p className="w-full" dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

export default Feature;
