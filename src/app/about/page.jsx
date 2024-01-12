'use client';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { useWindowSize } from '@uidotdev/usehooks';
import { Main } from '@/app/components';

const About = () => {
  const size = useWindowSize();
  const getPlayerDimensions = useMemo(() => {
    let width, height;
    width = Math.floor(size.width * 0.9);
    height = Math.floor(width * 0.6183);
    return { height, width };
  }, [size]);

  return (
    <Main>
      <h1 className='text-4xl'>About Us</h1>
      <Image
        src='/icon.png'
        height={800}
        width={800}
        alt='cichlid cartel logo'
      />
      {getPlayerDimensions.width}
      <p className='max-w-7xl sm:text-xl md:text-3xl lg:text-2xl'>
        The Cichlids Cartel is a home-based business dedicated to making fish
        ownership fun, affordable & educational! Specializing in African
        Cichlids, we offer a variety of VERY RARE and hard to find exotic fish
        at an affordable cost! We have an amazing educated staff with years of
        experience that will help you feel comfortable understanding the many
        different breeds we have to offer as well as the best ways to take care
        of them! We are happy to provide authentic service, great communication,
        and a true understanding of the wonderful fish farming business!
      </p>

      <iframe
        className='pt-12'
        width={getPlayerDimensions.width}
        height={getPlayerDimensions.height}
        src='https://www.youtube.com/embed/6Pf7q7XBPjE?si=elaNI6ul54b1cAP4&amp;start=408&mute=1&autoplay=1'
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowfullscreen
      ></iframe>
    </Main>
  );
};

export default About;
