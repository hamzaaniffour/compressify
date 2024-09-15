import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-white py-4'>
        <ul className='flex justify-center items-center gap-6'>
            <li>
                <Link href="/" className='text-black font-semibold'>Image Converter</Link>
            </li>
            <li>
                <Link href="/image-resizer" className='text-black font-semibold'>Image Resizer</Link>
            </li>
            <li>
                <Link href="/image-compressor" className='text-black font-semibold'>Image Compressor</Link>
            </li>
            <li>
                <Link href="/image-cropper" className='text-black font-semibold'>Image Cropper</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar