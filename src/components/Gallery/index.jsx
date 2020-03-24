import React, { useState } from 'react';
import Masonry from 'react-masonry-component';
import "./index.less"

const masonryOptions = {
  transitionDuration: 500
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

const Gallery = props => {
  const [show, setShow] = useState(false)
  const childElements = props.imgs.map((v, i) => {
    return (
      <li className="image-element-class" key={`${v.src}${i}`}>
        <img src={v.src} alt="result" />
      </li>
    );
  });
  const handleImagesLoaded = (e) => {
    console.log(e)
    // setShow(true)
  }
  const handleLayoutComplete = (e) => {
    console.log(e)
    setShow(true)
  }
  return (
    <Masonry
      className={'my-gallery'} // default ''
      elementType={'ul'} // default 'div'
      options={masonryOptions} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      imagesLoadedOptions={imagesLoadedOptions} // default {}
      onImagesLoaded={handleImagesLoaded}
      onLayoutComplete={handleLayoutComplete}
    >
      {show && childElements}
    </Masonry>
  );
}


export default Gallery;
