import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function Header() {
  return (
    <div className="w-full flex justify-center items-center  h-16 px-6 py-11 pb-14 bg-white">
      <Link href={"/"}>
        <Image
          src="/image/logo.svg"
          alt="Picture of the author"
          width={327}
          height={63}
        />
      </Link>
    </div>
  );
}

export default Header