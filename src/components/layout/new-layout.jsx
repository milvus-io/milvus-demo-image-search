import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Popover, Typography, Box, Button } from "@material-ui/core";
import { Home, Settings, Storage, ExitToApp } from '@material-ui/icons';
import { useTranslation } from "react-i18next";
import Logo from '../../assets/imgs/logo.svg'
import { ADD, DISCONNECT, INIT } from '../../reducers/milvus-servers'
import { DELETE_MUTIPLE, KEYS } from '../../reducers/data-management'
import { httpContext } from "../../context/http"
import { dataManagementContext } from "../../context/data-management"
import { systemContext } from "../../context/system"
import { cloneObj } from '../../utils/helpers'

import DataMenu from './data-menu'
import ConfigMenu from './config-menu'
import LoginMenu from './login-menu';
import { CLIENT_HISTORY } from '../../consts';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  left: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(8)}px ${theme.spacing(1)}px`,
    height: "100vh",
    borderRight: "1px solid #eee"
  },
  icon: {
    marginBottom: theme.spacing(4),
    fontSize: "30px",
  },
  active: {
    fill: theme.palette.primary.main
  },
  menuWrapper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
    flex: " 0 0 300px",
    borderRight: "1px solid #eee",
    '& > img': {
      width: "120px"
    }
  },
  logoutWrapper: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
    borderBottom: "1px solid #eee",
    '& .circle': {
      display: "inline-block",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: theme.palette.success.main,

    },
    '& > span': {
      marginRight: theme.spacing(2),
      fontWeight: "bold"
    },
    '& .icon': {
      cursor: "pointer"
    },
  },
  content: {
    position: "relative",
    flex: 1
  }
}));

const Layout = props => {
  const classes = useStyles()
  const { t } = useTranslation();
  const buttonTrans = t("button");
  const { currentAddress, setCurrentAddress } = useContext(httpContext)
  const { milvusAddress, setMilvusAddress } = useContext(systemContext)
  const { setDataManagement } = useContext(dataManagementContext)

  const [anchorEl, setAnchorEl] = useState(null)
  const [firstMenu, setFisrstMenu] = useState('login')

  const handleFirstMenuChange = e => {
    const name = e.currentTarget.dataset.name
    setFisrstMenu(name)
  }

  const handleExit = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = () => {
    setMilvusAddress({
      type: ADD,
      payload: {
        id: '127.0.0.1:19121',
        values: {
          connected: true
        }
      }
    })
  }

  const handleLogout = () => {
    if (currentAddress) {
      const copyAddress = cloneObj(milvusAddress)
      delete copyAddress[currentAddress]
      const addresses = Object.keys(copyAddress)
      setCurrentAddress(addresses.length ? addresses[0] : "")
      setMilvusAddress({
        type: DISCONNECT,
        payload: {
          id: currentAddress
        }
      })
      setDataManagement({
        type: DELETE_MUTIPLE,
        payload: {
          id: currentAddress,
          keys: [KEYS.table, KEYS.vectorSearch]
        }
      })
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    try {
      let clients = window.localStorage.getItem(CLIENT_HISTORY) || {}
      clients = JSON.parse(clients)
      setMilvusAddress({ type: INIT, payload: { ...clients } })
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const open = Boolean(anchorEl)
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <Home
          data-name="login"
          className={`${classes.icon} ${firstMenu === 'login' && classes.active}`}
          onClick={handleFirstMenuChange}
        ></Home>
        <Storage
          data-name="data"
          className={`${classes.icon} ${firstMenu === 'data' && classes.active}`}
          onClick={handleFirstMenuChange}

        ></Storage>
        <Settings
          data-name="config"
          className={`${classes.icon} ${firstMenu === 'config' && classes.active}`}
          onClick={handleFirstMenuChange}
        ></Settings>
      </div>
      <div className={classes.menuWrapper}>
        <img src={Logo} alt="Milvus Logo"></img>
        <div className={classes.logoutWrapper}>
          <span className="circle"></span>
          <span>{currentAddress}</span>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography>{`${t("disconnect")}${currentAddress}?`}</Typography>
              <div style={{ textAlign: "right" }}>
                <Button onClick={handleClose}>{buttonTrans.cancel}</Button>
                <Button color="primary" className={classes['ml-2']} onClick={handleLogout}>
                  {buttonTrans.confirm}
                </Button>
              </div>
            </Box>
          </Popover>
          <ExitToApp className="icon" onClick={handleExit}></ExitToApp>
        </div>
        <div>
          {
            firstMenu === 'login'
              ? (<LoginMenu></LoginMenu>)
              : firstMenu === 'data'
                ? (<DataMenu></DataMenu>)
                : (<ConfigMenu></ConfigMenu>)
          }

        </div>
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

export default Layout