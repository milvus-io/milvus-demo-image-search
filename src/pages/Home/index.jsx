import React, { useEffect, useState, useRef, useContext } from "react";
import FileDrop from "react-file-drop";
import Gallery from "../../components/Gallery";
import Cropper from "../../components/Cropper";
import { getImgUrl } from "../../utils/helpers";
import { CircularProgress, useMediaQuery, IconButton } from "@material-ui/core";
import { VerticalAlignTop } from "@material-ui/icons";
import { Search } from "@material-ui/icons";
import { httpContext } from "../../context/Http";
import "./index.less";
import DemoImg from "../../assets/demo2.jpg";
import { getBase64Image } from "../../utils/helpers";
import MySelect from "react-select";

// let timer = null;

const Home = (props) => {
  const isMobile = !useMediaQuery("(min-width:1000px)");
  const [show, setShow] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [blob, setBlob] = useState("");
  // const [page, setPage] = useState(0);
  const [app, setApp] = useState();
  const [noData, setNoData] = useState(false);
  const [options, setOptions] = useState([]);
  const dropRef = useRef(null);
  const inputRef = useRef(null);
  const imgsWrapperRef = useRef(null);
  const { search, getApps } = useContext(httpContext);
  // const options = [
  //   { value: "example", label: "Default" },
  //   { value: "example2", label: "Face" },
  // ];

  const handleDrop = (files, event) => {
    if (!files[0]) {
      return;
    }
    const src = getImgUrl(files[0]);
    setSelectedImg(files[0] ? src : "");
    setShow(false);
  };
  useEffect(() => {
    const generateOptions = async () => {
      const res = await getApps();
      setOptions(
        res.map((v) => {
          try {
            const { _application_name, _fields } = v;
            const key = Object.keys(_fields).find(
              (k) => _fields[k].type === "object"
            );
            return {
              label: _application_name,
              value: _application_name,
              key,
            };
          } catch (e) {
            throw e;
          }
        })
      );
    };
    generateOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("---reset app---");
    setApp(options[0]);
  }, [options]);

  useEffect(() => {
    window.addEventListener("dragover", (e) => {
      // This prevents the browser from trying to load whatever file the user dropped on the window
      e.preventDefault();
      setShow(true);
    });
    window.addEventListener("dragleave", (e) => {
      e.preventDefault();
      setShow(false);
    });
    window.addEventListener("drop", (e) => {
      e.preventDefault();
      const inArea = e.path.includes(dropRef.current);
      if (!inArea) {
        setShow(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!app) return;
    const image = new Image();
    image.crossOrigin = "";
    image.src = DemoImg;
    image.onload = function () {
      const base64 = getBase64Image(image);
      // setSelectedImg(base64.dataURL);
      /*
       打印信息如下：
       {
        dataURL: "data:image/png;base64,xxx"
        type: "image/jpg"
       }
       */
      // const imgBlob = convertBase64UrlToBlob(base64);
      handleImgSearch(base64.dataURL);
      /*
       打印信息如下：
       Blob {size: 9585, type: "image/jpg"}
       */
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app]);

  // const handleScroll = async (e) => {
  //   const { scrollTop, offsetHeight, scrollHeight } = e.currentTarget;
  //   if (
  //     scrollHeight - scrollTop - offsetHeight < 30 &&
  //     !loading &&
  //     !timer &&
  //     imgs.length
  //   ) {
  //     timer = setTimeout(async () => {
  //       setLoading(true);
  //       setPage((v) => v + 1);
  //       await handleImgSearch(blob, false);
  //       timer = null;
  //     }, 100);
  //   }
  // };

  const handleInput = () => {
    inputRef.current.click();
  };

  const handleInputChange = async (e) => {
    const file = inputRef.current.files[0] || "";
    if (!file) {
      return;
    }
    const src = getImgUrl(file);
    setSelectedImg(file ? src : "");
  };

  const handleImgSearch = async (file, reset = true, selectedApp = {}) => {
    if (reset) {
      setImgs([]);
      // setPage(0);
      setGlobalLoading(true);
      setNoData(false);
    }
    const data = {
      topk: 50,
      nprobe: 10,
      fields: {
        [selectedApp.key || app.key]: {
          data: file,
        },
      },
    };
    // const fd = new FormData();
    // fd.append("file", file);
    // fd.append("Num", 50);
    // fd.append("Page", page);

    setBlob(file);
    try {
      const res = await search(data, selectedApp.value || app.value);
      if (!res.length) {
        setNoData(true);
        return;
      }
      setImgs((v) => [
        ...v,
        ...res.map((v) => ({
          src: v._image_url,
          distance: 1,
        })),
      ]);
    } catch (e) {
      throw e;
    } finally {
      setGlobalLoading(false);
    }
  };
  const handleSearch = (src) => {
    setSelectedImg(src);
  };

  const handleBackToTop = () => {
    document.querySelector(".route-section").scrollTop = 0;
    imgsWrapperRef.current.scrollTop = 0;
  };

  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption);
    setApp(selectedOption);
    handleImgSearch(blob, true, selectedOption);
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: "#333",
    }),
  };

  return (
    <div className="home-wrapper">
      <div className={`file-drop ${show && "open"}`} ref={dropRef}>
        <FileDrop onDrop={handleDrop} className="target">
          <div className="tip">Drop Image here!</div>
        </FileDrop>
      </div>
      <div className={`cropper-wrapper ${selectedImg && "show"}`}>
        <Cropper
          src={selectedImg}
          propSend={handleImgSearch}
          className="crop-img-wrapper"
          imgClassName="crop-img"
        ></Cropper>
        <MySelect
          value={app}
          options={options}
          className="select"
          onChange={handleSelectChange}
          styles={customStyles}
        ></MySelect>
      </div>
      <div
        className="imgs-wrapper"
        ref={imgsWrapperRef}
        // onScroll={handleScroll}
      >
        {imgs.length ? (
          <Gallery
            handleSearch={handleSearch}
            setLoading={setLoading}
            setGlobalLoading={setGlobalLoading}
            imgs={imgs}
          ></Gallery>
        ) : (
          ""
        )}
        {globalLoading && (
          <div className="global-loading-wrapper">
            <CircularProgress></CircularProgress>
          </div>
        )}
        {loading && !noData && (
          <div className="loading-wrapper">
            <CircularProgress></CircularProgress>
          </div>
        )}
        {noData && <p style={{ textAlign: "center" }}>No More Data.</p>}
      </div>
      <span className="upload" onClick={handleInput}>
        <Search></Search>
      </span>
      <input
        type="file"
        ref={inputRef}
        className="input"
        onChange={handleInputChange}
      ></input>
      {isMobile && (
        <IconButton
          onClick={handleBackToTop}
          color="primary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            borderRadius: "50%",
            background: "#2196f3",
            color: "#fff",
          }}
        >
          <VerticalAlignTop></VerticalAlignTop>
        </IconButton>
      )}
    </div>
  );
};

export default Home;
