import React, { useEffect, useRef } from 'react'
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import './index.less';

let timer = null
const CroppeDemo = props => {
  const imgRef = useRef(null)
  const myCropper = useRef(null)
  const { propSend, src, className, imgClassName } = props

  const handleImgLoaded = e => {
    const cropper = new Cropper(imgRef.current, {
      viewMode: 3,
      autoCropArea: 0.98,
      crop(event) {
        console.log(event);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        console.log(event.detail.rotate);
        console.log(event.detail.scaleX);
        console.log(event.detail.scaleY);
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          handleSend()
        }, 1000)
      },
    });
    myCropper.current = cropper
  }

  // update cropper img
  useEffect(() => {
    if (src && myCropper.current) {
      myCropper.current.destroy()
      myCropper.current.crop()
    }
  }, [src])
  // const handleDownload = () => {
  //   const cropperInstance = myCropper.current
  //   const url = cropperInstance.getCroppedCanvas().toDataURL('image/png')

  //   // 生成一个 a 标签
  //   const a = document.createElement('a');
  //   // 创建一个点击事件
  //   const event = new MouseEvent('click');
  //   // 将 a 的 download 属性设置为我们想要下载的图片的名称，若 name 不存在则使用'图片'作为默认名称
  //   a.download = '图片';

  //   // 将生成的 URL 设置为 a.href 属性
  //   a.href = url;
  //   // 触发 a 的点击事件
  //   a.dispatchEvent(event);
  //   console.log(url)
  // }
  const handleSend = () => {
    const cropperInstance = myCropper.current

    cropperInstance.getCroppedCanvas().toBlob((blob) => {
      propSend(blob)

    }/*, 'image/png' */);

  }
  return (<div>
    <div className={className}>
      {
        src && <img
          ref={imgRef}
          src={src}
          alt="test"
          className={imgClassName}
          draggable={false}
          onLoad={handleImgLoaded}
        ></img>
      }

      {/* <button onClick={handleDownload}>download</button>
      <button onClick={handleSend}>send</button> */}

    </div>
  </div>)
}
export default CroppeDemo