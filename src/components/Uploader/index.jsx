import React, { useRef, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link, Typography } from '@material-ui/core';
import email from '../../assets/images/email.svg';
import github from '../../assets/images/github.svg';
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
    boxSizing: 'border-box',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },

    '& .background': {
      background: '#555',
      borderRadius: '8px',
      boxSizing: 'border-box',
      padding: theme.spacing(2),
      width: '279px',
      maxWidth: '50%',

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1),
        width: '100%',
        maxWidth: '327px'
      }
    },
    '& .btns-wrppaer': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginLeft: theme.spacing(4),

      [theme.breakpoints.down('sm')]: {
        marginLeft: theme.spacing(0),
        marginTop: theme.spacing(2),
        flexDirection: 'row',
        maxWidth: '327px',
        justifyContent: 'space-between',

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

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(0),
      },

      '& .text': {
        fontWeight: 400,
        color: '#82838E',

        [theme.breakpoints.down('sm')]: {
          maxWidth: '150px',
          overflow: 'hidden',
          whiteSpace: 'no-wrap',
          textOverflow: 'ellipsis'
        },
      }
    },
    '& .icons-wrapper': {
      marginBottom: theme.spacing(0),

      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(1),
      },

      '& a:not(:last-child)': {
        marginRight: theme.spacing(2)
      }
    }

  },
  cropImgWrapper: {
    width: '247px',
    height: '264px',

    '& img': {
      maxWidth: '247px',
      maxHeigth: '264px',
    },

    [theme.breakpoints.down('sm')]: {
      width: '311px',
      height: '306px',

      '& img': {
        maxWidth: '311px',
        maxHeight: '306px',
      },
    },
  },
  cropImg: {
    // maxWidth: '263px',
    // maxHeigth: '232px',

    // [theme.breakpoints.down('sm')]: {
    //   maxWidth: '295px',
    //   maxHeigth: '306px',
    // },
    display: 'none'
  },
  button: {
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: (props) =>
      props.selectedImg ? '16px' : '24px',
    lineHeight: props => (props.selectedImg ? '18px' : '28px'),
    fontFamily: 'Roboto',
    background: '#06aff2',

    [theme.breakpoints.down('sm')]: {
      fontSize: props => (props.selectedImg ? '16px' : '16px'),
      lineHeight: props => (props.selectedImg ? '18px' : '18px'),
      padding: theme.spacing(1),
    },
  },
}));
const UploaderHeader = ({ handleImgSearch, handleSelectedImg, toggleIsShowCode, selectedImg, count, duration }) => {

  const classes = useStyles({ selectedImg });
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

  const handlerDragEnter = e => {
    e.preventDefault();
    uploadSection.current.classList.add('drag-enter');
  };
  const handleDragLeave = e => {
    e.preventDefault();
    uploadSection.current.classList.remove('drag-enter');
  };

  return (
    <>
      {
        !selectedImg ?
          (
            <FileDrop
              onDragOver={handlerDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="target"
            >
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
                    <Button variant="contained" color="primary" component="span" classes={{ root: classes.button }}>
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

                {
                  !isMobile ? (
                    <>
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
                          <Button variant="contained" color="primary" component="span" classes={{ root: classes.button }}>
                            Upload Image
                          </Button>
                        </label>
                      </div>
                      <div className="result-desc">
                        <Typography variant="body2" className='text'>Search Result: {count}</Typography>
                        <Typography variant="body2" className='text'>Duration: {duration / 1000} s</Typography>
                      </div>
                      <div className="icons-wrapper">
                        <IconButton type="link" href="https://github.com/milvus-io/milvus">
                          <img src={github} alt="github" />
                        </IconButton>
                        <IconButton type="link" href="mailto:info@milvus.com">
                          <img src={email} alt="email" />
                        </IconButton>

                        {/* <IconButton type="button" onClick={toggleIsShowCode}>
                          <img src={subtract} alt="subtract" />
                        </IconButton> */}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="left">
                        <div className="icons-wrapper">
                          <IconButton type="link" href="https://github.com/milvus-io/milvus">
                            <img src={github} alt="github" />
                          </IconButton>
                        </div>
                        <div className="result-desc">
                          <Typography variant="body2" className='text'>Search Result: {count}</Typography>
                          <Typography variant="body2" className='text'>Duration: {duration / 1000} s</Typography>
                        </div>
                      </div>
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
                          <Button variant="contained" color="primary" component="span" classes={{ root: classes.button }}>
                            Upload Image
                          </Button>
                        </label>
                      </div>
                    </>
                  )
                }

              </div>
            </div>
          )
      }
    </>


  );
};

export default UploaderHeader;