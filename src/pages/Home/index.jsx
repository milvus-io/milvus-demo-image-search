import React, { useEffect, useState, useRef } from 'react'
import FileDrop from 'react-file-drop'
import Gallery from '../../components/Gallery'
import { CircularProgress } from '@material-ui/core'
import "./index.less"

const imgSrcs = [
  "https://i.pinimg.com/236x/b0/22/04/b02204649aa8c87e66e503a5497ad6be.jpg",
  "https://i.pinimg.com/236x/81/df/9c/81df9cd806fb9a6d728f3d30e51805c7.jpg",
  "https://i.pinimg.com/236x/5b/4d/f3/5b4df30773e19538f75f4c75d215bb31.jpg",
  "https://i.pinimg.com/236x/9d/2c/2d/9d2c2d0a7d917e254cdbc515cd8f41c2.jpg",
  "https://i.pinimg.com/236x/55/6f/dc/556fdc059220a96534fbb8af3baadfc1.jpg",
  "https://i.pinimg.com/236x/d0/ad/be/d0adbea0e6507657897bcecb34ae99ac.jpg"
]
const generateImgs = (count) => {
  let arr = []
  while (arr.length < count) {
    arr.push({
      src: imgSrcs[(Math.round(Math.random() * 10) + 5) % 5]
    })
  }
  console.log(arr)
  return arr
}

const Home = props => {
  const [show, setShow] = useState(false)
  const [imgs, setImgs] = useState(generateImgs(50))
  const [loading, setLoading] = useState(false)
  const dropRef = useRef(null)
  const handleDrop = (files, event) => {
    console.log('handleDrop!', files, event);
  }
  useEffect(() => {
    window.addEventListener("dragover", (e) => {
      // This prevents the browser from trying to load whatever file the user dropped on the window
      e.preventDefault();
      setShow(true)
    })
    window.addEventListener("dragleave", (e) => {
      e.preventDefault();
      setShow(false)
    })
    window.addEventListener("drop", (e) => {
      e.preventDefault();
      const inArea = e.path.includes(dropRef.current)
      if (!inArea) {
        setShow(false)
      }
    })
  }, [])
  const handleScroll = e => {
    const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget
    if (scrollHeight - scrollTop - offsetHeight < 10 && !loading) {
      setLoading(true)
      setTimeout(() => {
        setImgs(v => [...v, ...generateImgs(20)])
        setLoading(false)
      }, 1000)
    }
  }
  return <div className="home-wrapper" onScroll={handleScroll}>
    <div className={`file-drop ${show && 'open'}`} ref={dropRef}>
      <FileDrop onDrop={handleDrop} className="target" >
        <div className="tip" >Drop Image here!</div>
      </FileDrop>
    </div>
    <div className="imgs-wrapper">
      <Gallery imgs={imgs} ></Gallery>
      {
        loading && (<div className="loading-wrapper">
          <CircularProgress></CircularProgress>
        </div>)
      }

    </div>
  </div>
}

export default Home