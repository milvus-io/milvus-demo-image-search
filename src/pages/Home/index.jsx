import React, { useState, useEffect, useContext, useRef } from "react";
import useStyles from "./index.util";
// import Button from "../../components/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { Masonry, Box, Image, Spinner } from "gestalt";
import { rootContext } from "../../context/Root";
import axios from "axios";
import { getImgUrl, convertBase64UrlToBlob, getBase64Image } from "../../utils/helper";
import Main from '../../components/Main';
import { search } from '../../utils/http';
import white from '../../assets/images/white.jpg';
import DemoImg from "../../assets/demo.jpg";
import UploaderHeader from '../../components/Uploader';
import { CircularProgress } from '@material-ui/core';

const Home = () => {
  const classes = useStyles();
  const { openSnackBar } = useContext(rootContext);

  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);


  const handleImgSearch = async (
    file,
    reset,
    scrollPage
  ) => {
    setLoading(true);
    if (reset) {
      setImgs([]);
      setPage(0);
      // setGlobalLoading(true);
      // setNoData(false);
    }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("Num", `${window.innerWidth < 800 ? 16 : 20}`);
    fd.append("Page", `${scrollPage || page}`);

    // setBlob(file);
    try {

      const res = await search(fd);
      console.log(loading);
      // if (!res.length) {
      //   setNoData(true);
      //   return;
      // }

      setImgs((v) => [
        ...v,
        ...res.map((v) => ({
          src: v[0],
          distance: v[1],
        })),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handleImgToBlob = (src) => {
    const image = new Image();
    image.crossOrigin = "";
    image.src = src;
    console.log(src);
    console.log('img:', image);
    image.onload = function () {
      console.log(222222);
      const base64 = getBase64Image(image);

      /*
       打印信息如下：
       {
        dataURL: "data:image/png;base64,xxx"
        type: "image/jpg"
       }
       */
      const imgBlob = convertBase64UrlToBlob(base64);
      handleImgSearch(imgBlob);
      /*
       打印信息如下：
       Blob {size: 9585, type: "image/jpg"}
       */
    };
  };

  useEffect(() => {
    handleImgToBlob(DemoImg);
  }, []);

  return (
    <section className={classes.root}>
      <Button
        variant="text"
        startIcon={<ChevronLeftIcon />}
        className={classes.button}
      >
        Back to Demo
      </Button>

      <UploaderHeader handleImgSearch={handleImgSearch} />
      <div className={classes.layoutSection}>
        <Main pins={imgs} />
      </div>
      {
        loading ?
          (
            <div className={classes.loadingWrapper}>
              <CircularProgress />
            </div>
          ) :
          null
      }
    </section>
  );
};

export default Home;
