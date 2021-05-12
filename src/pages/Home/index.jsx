import React, { useState, useEffect, useContext, useRef } from "react";
import useStyles from "./index.util";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { rootContext } from "../../context/Root";
import {
  convertBase64UrlToBlob,
  getBase64Image,
} from "../../utils/helper";
import Main from "../../components/Main";
import { search, getCount } from "../../utils/http";
import DemoImg from "../../assets/demo.jpg";
import UploaderHeader from "../../components/Uploader";
import { CircularProgress } from "@material-ui/core";
import RegisterForm from "../../components/RegisterForm";

const Home = () => {
  const classes = useStyles();
  const { setDialog, dialog } = useContext(rootContext);
  const [imgs, setImgs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [partialLoading, setPartialLoading] = useState(false);
  const [selected, setSelected] = useState({
    src: "",
    isSelected: false,
  });
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState(null);
  const [isShowCode, setIsShowCode] = useState(false);
  const [noData, setNoData] = useState(false);
  const [isNeedLoadMore, setIsNeedLoadMore] = useState(false);
  const { open } = dialog;
  let timer = null;

  const getImage = (url) => {
    return new Promise(function (resolve, reject) {
      var img = document.createElement("img");
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

  const sliceAndSet = (list, setFunc) => {
    const sliceNum = window.innerWidth < 800 ? 2 : 4;

    const setData = async (tempArr) => {
      const tempResults = [];
      for (let i = 0; i < tempArr.length; i++) {
        const { width, height } = await getImage(tempArr[i][0]);
        tempResults.push({
          width,
          height,
          src: tempArr[i][0],
          distance: tempArr[i][1].toFixed(6),
        });
      }
      setFunc((v) => {
        return [...v, ...tempResults];
      });
    };

    while (list.length > sliceNum) {
      const tempArr = list.splice(0, sliceNum);
      setData(tempArr);
    }
    setData(list);
    setIsNeedLoadMore(true);
  };

  const handleImgSearch = async (file, reset = false, scrollPage) => {
    setLoading(true);
    setIsNeedLoadMore(false);
    if (reset) {
      setImgs([]);
      setPage(0);
      setNoData(false);
    }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("Num", `${window.innerWidth < 800 ? 16 : 50}`);
    fd.append("Page", `${scrollPage || page}`);

    // setBlob(file);
    const start = new Date().getTime();
    try {
      const res = await search(fd);
      const end = new Date().getTime();
      const count = await getCount();
      if (!res.length) {
        setNoData(true);
        return;
      }

      sliceAndSet(res, setImgs);

      setCount(count);
      setDuration(end - start);
    } catch (error) {
      console.log(error);
    } finally {
      setPage((v) => v + 1);
      setLoading(false);

    }
  };

  const handleImgToBlob = (src, reset = false) => {
    const image = document.createElement("img");
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
    if (!isNeedLoadMore) return;
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
      isSelected: true,
    });
  };

  const toggleIsShowCode = () => {
    return;
    setIsShowCode((v) => !v);
    window.dispatchEvent(new Event("resize"));
  };

  const handleSearch = (src) => {
    handleImgToBlob(src, true);
    setSelected({
      src: src,
      isSelected: true,
    });
  };

  const handleGoBack = () => {
    window.window.location.href = 'https://zilliz.com/milvus-demos';
  };

  useEffect(() => {
    handleImgToBlob(DemoImg);
  }, []);

  // remind users to register every 30s
  useEffect(() => {
    if (timer) {
      clearInterval(timer);
    }

    if (!timer) {
      timer = setInterval(() => {
        setDialog({
          open: true,
          type: "custom",
          params: {
            component: <RegisterForm />,
          },
        });
      }, 30000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [open, setDialog]);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div
          className={`${classes.contentContainer} ${isShowCode ? "shrink" : ""
            }`}
        >
          <div className="top-part">
            <Button
              variant="text"
              startIcon={<ChevronLeftIcon />}
              className={classes.button}
              onClick={handleGoBack}
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
          </div>

          <div className={classes.layoutSection}>
            {noData ? (
              <div className="no-data">
                <p style={{ textAlign: "center" }}>No More Data.</p>
              </div>
            ) : (
              <Main
                pins={imgs}
                loadItems={loadItems}
                loading={partialLoading}
                isSelected={selected.isSelected}
                minCols={1}
                isShowCode={isShowCode}
                handleSearch={handleSearch}
              />
            )}
          </div>
        </div>
        {isShowCode ? <div className={classes.codeContainer}>123</div> : null}
      </div>
      {loading && !partialLoading ? (
        <div className={classes.loadingWrapper}>
          <CircularProgress />
        </div>
      ) : null}
    </section>
  );
};

export default Home;
