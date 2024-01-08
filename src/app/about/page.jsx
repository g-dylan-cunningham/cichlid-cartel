import React from 'react';
import Image from 'next/image'
// import { createBlurb } from '@/modules/prisma/actions';

const About = async () => {
  return (
    <main className='flex min-h-screen flex-col items-center p-24 pt-12'>
      {/* <section
        style={{
          height: '60vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundImage:
            'url("/icon.png")',
        }}
        className='rounded-lg p-5'
      > */}
      {/* </section> */}
     <Image src="/icon.png" height={800} width={800} alt='cichlid cartel logo' />



      <p className='text-4xl max-w-7xl'>
          The Cichlids Cartel is a home-based business dedicated to making fish
          ownership fun, affordable & educational! Specializing in African
          Cichlids, we offer a variety of VERY RARE and hard to find exotic fish
          at an affordable cost! We have an amazing educated staff with years of
          experience that will help you feel comfortable understanding the many
          different breeds we have to offer as well as the best ways to take
          care of them! We are happy to provide authentic service, great
          communication, and a true understanding of the wonderful fish farming
          business!
        </p>

        <iframe className="pt-12" width="860" height="532" src="https://www.youtube.com/embed/6Pf7q7XBPjE?si=elaNI6ul54b1cAP4&amp;start=408&mute=1&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </main>
  );
};

export default About;
