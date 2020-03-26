import React, { useEffect, useState, useRef } from 'react'
import FileDrop from 'react-file-drop'
import Gallery from '../../components/Gallery'
import Cropper from '../../components/Cropper'
import { getImgUrl } from '../../utils/helpers'
import { CircularProgress } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import "./index.less"

const imgSrcs = [
  "https://i.pinimg.com/236x/b0/22/04/b02204649aa8c87e66e503a5497ad6be.jpg",
  "https://thumbs.dreamstime.com/b/autumn-oak-leaf-fantastic-beautiful-spray-bubbles-blue-background-magic-autumn-blue-background-yellow-oak-leaf-158238643.jpg",
  "https://i.pinimg.com/236x/5b/4d/f3/5b4df30773e19538f75f4c75d215bb31.jpg",
  "https://i.pinimg.com/236x/9d/2c/2d/9d2c2d0a7d917e254cdbc515cd8f41c2.jpg",
  "https://i.pinimg.com/236x/55/6f/dc/556fdc059220a96534fbb8af3baadfc1.jpg",
  "https://i.pinimg.com/236x/d0/ad/be/d0adbea0e6507657897bcecb34ae99ac.jpg",
]
const generateImgs = (count) => {
  let arr = []
  while (arr.length < count) {
    arr.push({
      src: imgSrcs[(Math.round(Math.random() * 10) + 5) % 5]
    })
  }
  return arr
}

const Home = props => {
  const [show, setShow] = useState(false)
  const [imgs, setImgs] = useState(generateImgs(50))
  const [loading, setLoading] = useState(false)
  const [selectedImg, setSelectedImg] = useState("")
  const dropRef = useRef(null)
  const inputRef = useRef(null)

  const handleDrop = (files, event) => {
    const src = getImgUrl(files[0])
    console.log(files[0])
    setSelectedImg(files[0] ? src : "")
    setShow(false)
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
  const handleInput = () => {
    inputRef.current.click()
  }
  const handleInputChange = (e) => {
    const file = inputRef.current.files[0] || ""
    const src = getImgUrl(file)
    setSelectedImg(file ? src : "")
  }
  const handleSearch = src => {
    setSelectedImg(src)
  }
  return <div className="home-wrapper" onScroll={handleScroll}>
    <div className={`file-drop ${show && 'open'}`} ref={dropRef}>
      <FileDrop onDrop={handleDrop} className="target" >
        <div className="tip" >Drop Image here!</div>
      </FileDrop>
    </div>
    <div className={`cropper-wrapper ${selectedImg && 'show'}`}>
      <Cropper src={selectedImg} className="crop-img-wrapper" imgClassName="crop-img"></Cropper>
    </div>
    <div className="imgs-wrapper">
      <Gallery handleSearch={handleSearch} imgs={imgs} ></Gallery>
      {
        loading && (<div className="loading-wrapper">
          <CircularProgress></CircularProgress>
        </div>)
      }

    </div>
    <span className="upload" onClick={handleInput}>
      <CloudUpload></CloudUpload>
    </span>
    <input type="file" ref={inputRef} className="input" onChange={handleInputChange}></input>

  </div>
}

export default Home