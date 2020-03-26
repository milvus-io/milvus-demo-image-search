import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import { Search } from '@material-ui/icons'
import "./index.less"
import Zmage from 'react-zmage'
const columnWidth = 244 // image width + 8px(margin)
const masonryOptions = {
  transitionDuration: 500,
  columnWidth
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }

const Gallery = props => {
  const [show, setShow] = useState(false)
  const [paddingLeft, setPaddingLeft] = useState(0)
  const childElements = props.imgs.map((v, i) => {
    return (
      <li className="image-element-class" key={`${v.src}${i}`}>
        <Zmage backdrop="rgba(0,0,0,.8)" src={v.src} draggable={false} alt="result" />
        <div className="desc">
          <p>123123123</p>
          <Search color="primary" onClick={() => { props.handleSearch(v.src) }}></Search>
        </div>
      </li>
    );
  });
  // const handleImagesLoaded = (e) => {
  //   console.log(e)
  // }
  const handleLayoutComplete = (e) => {
    setShow(true)
  }
  useEffect(() => {
    const cb = () => {
      if (window.innerWidth <= 1024) {
        setPaddingLeft(window.innerWidth % columnWidth / 2)
      } else {
        setPaddingLeft(0)
      }
    }
    window.addEventListener("resize", cb)
    cb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Masonry
      className={'my-gallery'} // default ''
      elementType={'ul'} // default 'div'
      options={masonryOptions} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      imagesLoadedOptions={imagesLoadedOptions} // default {}
      // onImagesLoaded={handleImagesLoaded}
      onLayoutComplete={handleLayoutComplete}
      style={{ paddingLeft: paddingLeft }}
    >
      {show && childElements}
    </Masonry>
  );
}


export default Gallery;
