import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link, Typography } from '@material-ui/core';
import email from '../../assets/images/email.svg';
import github from '../../assets/images/github.svg';
import star from '../../assets/images/star.svg';
import subtract from '../../assets/images/subtract.svg';
import IconButton from '../IconButton';
import { getImgUrl } from '../../utils/helper';
import { FileDrop } from "react-file-drop";
import Cropper from '../Cropper';
import { useMobileScreen } from '../../hooks';


const useStyles = makeStyles(theme => ({
  uploadSection: {
    width: "100%",
    border: "1px dashed #000",
    padding: theme.spacing(9, 9),
    borderRadius: "4px",
    boxSizing: "border-box",
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 2.5)
    },

    '&.drag-enter': {
      border: '1px dashed #06aff2'
    },

    "& .desc": {
      color: "#82838E",
      textAlign: "center",
      marginBottom: theme.spacing(5),

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
      },
    },
  },
  uploadWrapper: {
    textAlign: "left",
    display: 'inline-block',
    marginBottom: theme.spacing(1),

    "& .input": {
      display: "none",
    },
  },
  uploadedWrapper: {
    display: 'flex',
    padding: theme.spacing(1),
    boxSizing: 'border-box',

    '& .background': {
      background: '#555',
      borderRadius: '8px',
      boxSizing: 'border-box',
      padding: theme.spacing(2),
      maxWidth: '50%',
      width: '295px',
      height: '264px',


      [theme.breakpoints.down('sm')]: {
        width: '145px',
        height: '150px',
        padding: theme.spacing(1),
      }
    },
    '& .btns-wrppaer': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginLeft: theme.spacing(4),

      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(1),
      },
      // [theme.breakpoints.down('sm')]: {
      //   flex: 3
      // },

      "& .button": {
        color: '#fff'
      }

    },
    '& .result-desc': {
      marginBottom: theme.spacing(2),

      '& .text': {
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '14px',
        color: '#82838E',

      }
    },
    '& .icons-wrapper': {
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(0),
      },

      '& a:not(:last-child)': {
        marginRight: theme.spacing(2)
      }
    }

  },
  cropImgWrapper: {
    width: '263px',
    height: '232px',

    '& img': {
      maxWidth: '263px',
      maxHeigth: '232px',
    },

    [theme.breakpoints.down('sm')]: {
      width: '129px',
      height: '134px',

      '& img': {
        maxWidth: '129px',
        maxHeigth: '134px',
      },
    },
  },
  cropImg: {
    maxWidth: '263px',
    maxHeigth: '232px',

    [theme.breakpoints.down('sm')]: {
      maxWidth: '129px',
      maxHeight: '134px',
    },
  },
}));
const UploaderHeader = ({ handleImgSearch, handleSelectedImg, toggleIsShowCode, selectedImg, count, duration }) => {

  const classes = useStyles();
  const { isMobile } = useMobileScreen();
  const inputRef = useRef(null);
  const uploadSection = useRef(null);

  const handleInputChange = async e => {
    const file = inputRef.current.files[0] || "";
    if (!file) {
      return;
    }

    const src = getImgUrl(file);
    handleSelectedImg(file, src);
    handleImgSearch(file, true);
    e.target.value = "";
  };

  const handleDrop = (files, event) => {
    event.preventDefault();
    uploadSection.current.classList.remove('drag-enter');
    if (!files[0]) {
      return;
    }
    const src = getImgUrl(files[0]);
    // setSelectedImg(files[0] ? src : "");

    handleSelectedImg(files[0], src);
    handleImgSearch(files[0], true);
  };

  useEffect(() => {
    if (uploadSection.current) {
      uploadSection.current.addEventListener('dragenter', (e) => {
        e.preventDefault();
        uploadSection.current.classList.add('drag-enter');
      }, false);
      uploadSection.current.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadSection.current.classList.add('drag-enter');
      }, false);
      uploadSection.current.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadSection.current.classList.remove('drag-enter');
      }, false);
    }

    return () => {
      if (uploadSection.current) {
        uploadSection.current.removeEventListener('dragenter', (e) => {
          e.preventDefault();
          uploadSection.current.classList.add('drag-enter');
        }, false);
        uploadSection.current.removeEventListener('dragover', (e) => {
          e.preventDefault();
          uploadSection.current.classList.add('drag-enter');
        }, false);
        uploadSection.current.removeEventListener('dragleave', (e) => {
          e.preventDefault();
          uploadSection.current.classList.remove('drag-enter');
        }, false);
      }

    };
  }, []);

  return (
    <div className={classes.uploaderHeader}>
      {
        !selectedImg ?
          (
            <FileDrop onDrop={handleDrop} className="target" >
              <div className={classes.uploadSection} ref={uploadSection}>
                {
                  isMobile ?
                    (
                      <Typography variant='h4' className="desc">
                        Click ‘Browse’ to upload an image to try milvus vector similarity search.
                      </Typography>
                    ) : (
                      <Typography variant='h4' className="desc">
                        Drag or click ‘Browse’ to upload an image to try milvus vector
                        similarity search.
                      </Typography>
                    )
                }
                <div className={classes.uploadWrapper}>
                  <input
                    accept="image/*"
                    className="input"
                    id="contained-button-file"
                    type="file"
                    ref={inputRef}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                      Upload Image
                  </Button>
                  </label>
                </div>
              </div >
            </FileDrop>
          ) : (
            <div className={classes.uploadedWrapper}>
              <div className="background">
                <Cropper
                  src={selectedImg}
                  propSend={handleImgSearch}
                  className={classes.cropImgWrapper}
                  imgClassName={classes.cropImg}
                  viewMode={3}
                ></Cropper>
              </div>

              <div className="btns-wrppaer">
                <div className={classes.uploadWrapper}>
                  <input
                    accept="image/*"
                    className="input"
                    id="contained-button-file"
                    type="file"
                    ref={inputRef}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" className='button'>
                      Upload Image
                    </Button>
                  </label>
                </div>
                <div className="result-desc">
                  <Typography variant="body2" className='text'>Search Result: {count}</Typography>
                  <Typography variant="body2" className='text'>Duration: {duration / 1000} s</Typography>
                </div>
                <div className="icons-wrapper">
                  <IconButton type="link" href="#">
                    <img src={star} alt="star" />
                  </IconButton>
                  <IconButton type="link" href="#">
                    <img src={github} alt="github" />
                  </IconButton>
                  {
                    !isMobile ? (
                      <>
                        <IconButton type="link" href="#">
                          <img src={email} alt="email" />
                        </IconButton>
                        <IconButton type="button" onClick={toggleIsShowCode}>
                          <img src={subtract} alt="subtract" />
                        </IconButton>
                      </>
                    ) : null
                  }
                </div>
                {
                  !isMobile ? (
                    <Link href="#" color="inherit" className='text'>
                      Download Milvus SDK
                    </Link>
                  ) : null
                }
              </div>
            </div>
          )
      }
    </div>


  );
};

export default UploaderHeader;