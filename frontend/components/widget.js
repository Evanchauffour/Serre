import React from 'react'
import Image from 'next/image';

export default function widget({children, name, image}) {
  return (
    <div className='containerWidget'>
        <div className='header'>
            <Image src={image} width={30} height={30} alt="icon widget"/>
            <h3>{name}</h3>
        </div>
        {children}
    </div>
  )
}
