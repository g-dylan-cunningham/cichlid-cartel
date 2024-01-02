'use client'
import { useRouter } from 'next/navigation';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

import NextJsImage from "./PhotoCarousel";


const Gallery = ({slides}) => {
  const router = useRouter();
  return (
    <Lightbox
      open={true} 
      close={() => router.back()} 
      slides={slides} 
      // render={{ slide: NextJsImage }} 
      render={{ slide: NextJsImage, thumbnail: NextJsImage }}
      plugins={[Thumbnails, Counter, Inline, Zoom]}
      inline={{
        style: { width: "100%", maxWidth: "900px", aspectRatio: "3 / 2" },
      }}
    />
  );
}

export default Gallery;