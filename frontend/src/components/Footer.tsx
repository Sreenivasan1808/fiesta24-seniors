import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-center items-center bg-gray-700  text-gray-100 h-10'>
      <p>Website created by <Link href="www.linkedin.com/in/sreenivasan-s-r" target='_blank' className='text-amber-200'>Sreenivasan</Link> and <Link href="https://www.linkedin.com/in/sarathy-pon-prasath-5b6379294/" target='_blank' className='text-amber-200'>Sarathy Pon Prasath</Link> of IV CSE C</p>
    </footer>
  )
}

export default Footer
