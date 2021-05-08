import React, { useState, useRef } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link, Typography } from '@material-ui/core';
import email from '../../assets/images/email.svg';
import github from '../../assets/images/github.svg';
import star from '../../assets/images/star.svg';
import subtract from '../../assets/images/subtract.svg';
import IconButton from '../IconButton';
import { getImgUrl } from '../../utils/helper';



const useStyles = makeStyles(theme => ({
  uploadSection: {
    width: "100%",
    border: "1px dashed #000",
    padding: theme.spacing(9, 9),
    borderRadius: "4px",
    boxSizing: "border-box",

    "& .desc": {
      fontWeight: 400,
      fontSize: "24px",
      lineHeight: "28px",
      color: "#82838E",
      textAlign: "center",
      marginBottom: theme.spacing(5),
    },
  },
  uploadWrapper: {
    textAlign: "center",
    marginBottom: theme.spacing(1),
    "& .input": {
      display: "none",
    },
  },
  uploadedWrapper: {
    display: 'flex',
    padding: theme.spacing(1),
    boxSizing: 'border-box',

    '& .img-wrapper': {
      width: '295px',
      height: '264px',
      background: '#555',
      borderRadius: '8px',
      boxSizing: 'border-box',
      padding: '16px',
      marginRight: '32px',
      '& img': {
        width: '100%',
        height: '100%'
      }
    },
    '& .btns-wrppaer': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    },
    '& .result-desc': {
      marginBottom: theme.spacing(2),

      '& .text': {
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '14px',
        color: '#82838E'
      }
    },
    '& .icons-wrapper': {
      marginBottom: theme.spacing(1)
    }

  }
}));
const UploaderHeader = ({ handleImgSearch, count, duration }) => {

  const classes = useStyles();
  const [selectedImg, setSelectedImg] = useState(null);
  const inputRef = useRef(null);

  const handleInputChange = async e => {
    const file = inputRef.current.files[0] || "";
    if (!file) {
      return;
    }
    const src = getImgUrl(file);
    setSelectedImg(src);
    handleImgSearch(file);
    e.target.value = "";
  };

  return (
    <div className={classes.uploaderHeader}>

      {
        !selectedImg ?
          (
            <div className={classes.uploadSection} >
              <p className="desc">
                Drag or click ‘Browse’ to upload an image to try milvus vector
                similarity search
              </p>
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
          ) : (
            <div className={classes.uploadedWrapper}>
              <div className="img-wrapper">
                <img src={selectedImg} alt="image" />
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
                    <Button variant="contained" color="primary" component="span">
                      Upload Image
                    </Button>
                  </label>
                </div>
                <div className="result-desc">
                  <Typography variant="body2" className='text'>{count}</Typography>
                  <Typography variant="body2" className='text'>{duration}</Typography>
                </div>
                <div className="icons-wrapper">
                  <IconButton type="link" href="#">
                    <img src={star} alt="star" />
                  </IconButton>
                  <IconButton type="link" href="#">
                    <img src={github} alt="github" />
                  </IconButton>
                  <IconButton type="link" href="#">
                    <img src={email} alt="email" />
                  </IconButton>
                  <IconButton type="link" href="#">
                    <img src={subtract} alt="subtract" />
                  </IconButton>
                </div>
                <Link href="#" color="inherit" className='text'>
                  Download Milvus SDK
                </Link>
              </div>
            </div>
          )
      }

    </div>


  );
};

export default UploaderHeader;