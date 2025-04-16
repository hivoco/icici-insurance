import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header({ text, onClick }) {
  return (
    <div className=" relative  w-full flex justify-center items-center  h-16 px-6 py-11 pb-16 cursor-pointer bg-white">
      <Link href={"/"}>
        <Image
          src="/image/logo.svg"
          alt="Picture of the author"
          width={327}
          height={63}
        />
      </Link>
      {/* {text && (
        <span
          onClick={onClick}
          className="absolute bottom-0 right-2 text-base text-[#AF292F] underline"
        >
          {text}
        </span>
      )} */}
    </div>
  );
}

export default Header;
