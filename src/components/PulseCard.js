// import Image from "next/image";
// import React from "react";

// function PulseCard({ image, title }) {
//   return (
//     <div className="flex items-center cursor-pointer text-left gap-4 hover:bg-orange-200 p-2 rounded-2xl">
//       <div className="min-w-[72px] min-h-[72px] relative">
//         <Image
//           src={`/image/${image}`}
//           alt="Picture of the author"
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="absolute border left-[42px] ">
//         {" "}
//         <span class="relative flex size-[50px]">
//           <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-200 opacity-75"></span>
//           <span class="relative inline-flex size-[50px] rounded-full bg-orange-500/55"></span>
//         </span>
//       </div>
//       <p
//         className="text-base font-medium text-[#AF292F] "
//         dangerouslySetInnerHTML={{ __html: title }}
//       />
//     </div>
//   );
// }

// export default PulseCard;


import Image from "next/image";
import React from "react";

function PulseCard({ image, title }) {
  
  return (
    <div className="flex items-center cursor-pointer text-left gap-4 hover:bg-orange-200 p-2 rounded-2xl">
      <div className="min-w-[72px] min-h-[72px] relative">
        {/* Image */}
        <Image
          src={`/image/${image}`}
          alt="Picture of the author"
          fill
          className="object-cover rounded-lg"
        />

        {/* Ping circle positioned over the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="relative flex h-8 w-8">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-8 w-8 bg-orange-500 opacity-60"></span>
          </span>
        </div>
      </div>

      <p
        className="text-base font-medium text-[#AF292F]"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </div>
  );
}

export default PulseCard;
