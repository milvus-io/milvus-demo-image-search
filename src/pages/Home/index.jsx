import React, { useState, useEffect, useContext } from "react";
import useStyles from "./index.util";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Button } from "@material-ui/core";
import { rootContext } from "../../context/Root";
import {
  convertBase64UrlToBlob,
  getBase64Image,
} from "../../utils/helper";
import Masonry from "../../components/Masonry";
import { search, getCount } from "../../utils/http";
import DemoImg from "../../assets/demo.jpg";
import UploaderHeader from "../../components/Uploader";
import { CircularProgress } from "@material-ui/core";
import MilvusDialog from "../../components/MilvusDialog";
import { useMobileScreen } from '../../hooks';

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
  const { open } = dialog;
  const { isMobile } = useMobileScreen();

  const formatImgData = async (
    list,
    setFunc
  ) => {
    const results = list.map(item => {
      const distance = item[1].toFixed(6);
      const src = item[0][0];
      const origin_src = src.replace(/pc_suo_|mobile_suo_/g, '');
      const [width, height] = item[0][1].split('X');
      return {
        distance,
        src,
        width: Number(width),
        height: Number(height),
        origin_src,
      };
    });
    setFunc(v => [...v, ...results]);
  };

  const handleImgSearch = async (file, reset = false, scrollPage) => {
    setLoading(true);
    if (reset) {
      setImgs([]);
      setPage(0);
      setNoData(false);
    }
    const fd = new FormData();
    fd.append("file", file);
    fd.append("Num", `${window.innerWidth < 800 ? 16 : 50}`);
    fd.append("Page", `${scrollPage || page}`);
    fd.append("Device", `${isMobile ? 1 : 0}`);

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
      formatImgData(res, setImgs);
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
    // eslint-disable-next-line
  }, []);

  // remind users to register every 30s
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setDialog({
          open: true,
          type: "custom",
          params: {
            component: <MilvusDialog />,
          },
        });
      }, 30000);
    }
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
              <Masonry
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
