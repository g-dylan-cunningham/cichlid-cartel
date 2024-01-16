"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";
import { Main } from "@/app/components";

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
      <h1 className="text-4xl pb-3">About Us</h1>
      <div className="md:block flex flex-col items-center">
        <Image
          src="/icon.png"
          className="md:float-right md:ml-3 pb-3 md:pb-0"
          // style={{ margin: '0px auto'}}
          height={200}
          width={200}
          alt="cichlid cartel logo"
        />
        <p className="text-justify text-2xl">
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
      </div>
      {/* max-w-7xl sm:text-xl md:text-3xl lg:text-2xl */}

      <iframe
        className="pt-12"
        width={getPlayerDimensions.width}
        height={getPlayerDimensions.height}
        src="https://www.youtube.com/embed/6Pf7q7XBPjE?si=elaNI6ul54b1cAP4&amp;start=408&mute=1&autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // allowfullscreen
      ></iframe>

      <a
        href="https://youtu.be/6Pf7q7XBPjE?si=3hNi2jTKuSsiCyhM"
        title="watch on youtube"
      >
        <img
          src="/youtubeIcon.svg"
          alt="watch on youtube"
          className="h-32 w-32"
        />
      </a>

      {/* <form onSubmit={emailSubmit}>
        <label htmlFor='email'>Email</label>
        <input type="text" name="email"/>
        <button type='submit'>Submit</button>
        <p>Please provide your email to stay updated with latest offers and discounts.</p>
      </form> */}
    </Main>
  );
};

export default About;
