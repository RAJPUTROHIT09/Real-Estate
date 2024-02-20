import React from 'react';
 //import images
 import Image from '../assets/img/house-banner-2.png';
 //import component
 import Search from '../components/Search';
import LoremIpsum from 'react-lorem-ipsum';

const Banner = () => {
  return <section className='h-full max-h-[640px] mb-8 xl:mb-24'>
    <div className='flex flex-col lg:flex-row'>
      <div className='lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0'>
        <h1 className='text-4x1 lg:text-[58px] font-semibold leading-none mb-6'>
        <span className='text-green-700'>Secure</span>
         Your Dream Living Space
        </h1>
        <LoremIpsum className='max-w-[480px] mb-8'  p={1} />
      </div>
      {/* image */}
      <div className='hidden flex-1 lg:flex justify-end items-end'>
        <img src={Image} alt=''/>
      </div>
    </div>
    <Search/>
  </section>;
};

export default Banner;
