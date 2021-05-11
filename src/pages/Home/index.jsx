import React, { useState, useEffect, useContext, useRef } from "react";
import useStyles from "./index.util";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { rootContext } from "../../context/Root";
import { getImgUrl, convertBase64UrlToBlob, getBase64Image } from "../../utils/helper";
import Main from '../../components/Main';
import { search, getCount } from '../../utils/http';
import DemoImg from "../../assets/demo.jpg";
import UploaderHeader from '../../components/Uploader';
import { CircularProgress } from '@material-ui/core';

const Home = () => {
  const classes = useStyles();
  const { openSnackBar } = useContext(rootContext);
  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [partialLoading, setPartialLoading] = useState(false);
  const [selected, setSelected] = useState({
    src: '',
    isSelected: false
  });
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState(null);
  const [isShowCode, setIsShowCode] = useState(false);

  const getImage = (url) => {
    return new Promise(function (resolve, reject) {
      var img = document.createElement('img');
      img.onload = function () {
        resolve({ width: this.width, height: this.height });
      };
      img.onerror = function (e) {
        console.log(e);
        reject(url);
      };
      img.src = url;
    });
  };

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
    fd.append("Num", `${window.innerWidth < 800 ? 8 : 20}`);
    fd.append("Page", `${scrollPage || page}`);

    // setBlob(file);
    const start = new Date().getTime();
    try {
      const res = await search(fd);
      const count = await getCount();
      const results = [];
      // if (!res.length) {
      //   setNoData(true);
      //   return;
      // }
      for (let i = 0; i < res.length; i++) {
        const { width, height } = await getImage(res[i][0]);
        results.push({
          width, height,
          src: res[i][0],
          distance: res[i][1]
        });
      }
      setImgs((v) => [
        ...v,
        ...results
      ]);

      const end = new Date().getTime();
      setCount(count);
      setDuration(end - start);
    } catch (error) {
      console.log(error);
    } finally {
      setPage(v => v + 1);
      setLoading(false);
    }
  };

  const handleImgToBlob = (src, reset = false) => {
    const image = document.createElement('img');
    image.crossOrigin = "";
    image.src = src;
    image.onload = function () {
      const base64 = getBase64Image(image);
      const imgBlob = convertBase64UrlToBlob(base64);
      handleImgSearch(imgBlob, reset);
      setFile(imgBlob);
    };
  };

  const loadItems = async () => {
    try {
      setPartialLoading(true);
      await handleImgSearch(file, false, page);
    } catch (error) {
      console.log(error);
    } finally {
      setPartialLoading(false);
    }
  };

  const handleSelectedImg = (file, src) => {
    setFile(file);
    setSelected({
      src: src,
      isSelected: true
    });
  };

  const toggleIsShowCode = () => {
    setIsShowCode((v) => !v);
    window.dispatchEvent(new Event('resize'));
  };

  const handleSearch = (src) => {
    handleImgToBlob(src, true);
    setSelected({
      src: src,
      isSelected: true
    });
  };

  useEffect(() => {
    handleImgToBlob(DemoImg);
  }, []);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={`${classes.contentContainer} ${isShowCode ? 'shrink' : ''}`}>
          <Button
            variant="text"
            startIcon={<ChevronLeftIcon />}
            className={classes.button}
          >
            Back to Demo
          </Button>
          <UploaderHeader
            handleImgSearch={handleImgSearch}
            handleSelectedImg={handleSelectedImg}
            toggleIsShowCode={toggleIsShowCode}
            selectedImg={selected.src}
            count={count}
            duration={duration}
          />
          <div className={classes.layoutSection}>
            <Main
              pins={imgs}
              loadItems={loadItems}
              loading={partialLoading}
              isSelected={selected.isSelected}
              minCols={1}
              isShowCode={isShowCode}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        {
          isShowCode ?
            (
              <div className={classes.codeContainer}>
                123
              </div>
            ) : null
        }

      </div>
      {
        loading && !partialLoading ?
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
