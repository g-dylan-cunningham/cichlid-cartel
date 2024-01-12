'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import { useWindowSize } from '@uidotdev/usehooks';

import NextJsImage from './PhotoCarousel';

const Gallery = ({ slides }) => {
  const router = useRouter();
  const size = useWindowSize();
  const { width, height } = useMemo(() => {
    console.log('width', size.width)
    let width, height;
    width = Math.floor(size.width * 0.8);
    if (size.width > 1024) {
      width = width/2;
    }
    height = Math.floor(width * 0.6183);
    return { height, width };
  }, [size]);
  return (
    <Lightbox
      open={true}
      close={() => router.back()}
      slides={slides}
      render={{ slide: NextJsImage }}
      // render={{ slide: NextJsImage, thumbnail: NextJsImage }}
      plugins={[Counter, Inline]}
      inline={{
        style: { width, height },
      }}
    />
  );
};

export default Gallery;
