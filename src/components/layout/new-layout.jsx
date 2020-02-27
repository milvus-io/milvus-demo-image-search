import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Popover, Typography, Box, Button, Tab } from "@material-ui/core";
import { Home, Settings, Storage, ExitToApp } from '@material-ui/icons';
import { useTranslation } from "react-i18next";
import Logo from '../../assets/imgs/logo.svg'
import { KEYS } from '../../reducers/data-management'
import { httpContext } from "../../context/http"
import { dataManagementContext } from "../../context/data-management"
import { systemContext } from "../../context/system"
import { CLIENT_HISTORY, DELETE_MUTIPLE, ADD, DISCONNECT, INIT } from '../../consts';
import { cloneObj } from '../../utils/helpers'
import MyTabs from '../../components/tab'
import TabPanel from '../../components/tab-panel'
import { useQuery } from '../../hooks'

import DataMenu from './data-menu'
import ConfigMenu from './config-menu'
import LoginMenu from './login-menu';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  left: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(8)}px ${theme.spacing(1)}px`,
    height: "100vh",
    backgroundColor: "rgb(27, 36, 48)",
  },
  icon: {
    marginBottom: theme.spacing(4),
    fontSize: "30px",
    fill: "rgb(238, 238, 238)",

  },
  active: {
    fill: theme.palette.primary.main
  },
  menuWrapper: {
    flex: " 0 0 270px",
    backgroundColor: "rgb(35, 47, 62)",
    color: "rgb(238, 238, 238)",
    '& .logo-wrapper': {
      padding: `${theme.spacing(2)}px 0 0 ${theme.spacing(2)}px`,
      width: "120px"
    }
  },
  menu: {
    padding: theme.spacing(2),
    height: 'calc(100vh - 117px)',
    overflowY: 'auto',
    backgroundColor: "rgb(35, 47, 62)",
    fontSize: "14px",
    fontWeight: 400
  },
  logoutWrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
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
    flex: 1,
    height: "100vh",
    overflowY: "scroll",
  }
}));

const Layout = props => {
  const classes = useStyles()
  const query = useQuery()
  const { t } = useTranslation();
  const buttonTrans = t("button");
  const { currentAddress, setCurrentAddress } = useContext(httpContext)
  const { milvusAddress, setMilvusAddress } = useContext(systemContext)
  const { setDataManagement } = useContext(dataManagementContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [firstMenu, setFisrstMenu] = useState('data')
  const [tabValue, setTabValue] = useState(0)
  const [tabName, setTabName] = useState("")
  useEffect(() => {
    setTabName(query.get('tabName'))
  }, [query])
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

  // const handleAdd = () => {
  //   setMilvusAddress({
  //     type: ADD,
  //     payload: {
  //       id: '127.0.0.1:19121',
  //       values: {
  //         connected: true
  //       }
  //     }
  //   })
  // }

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

  const handleTabChange = (event, newValue) => {
    console.log(newValue)
    setTabValue(newValue);
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
        <div className="logo-wrapper">
          <img src={Logo} alt="Milvus Logo"></img>

        </div>
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
        <div className={classes.menu}>
          {
            firstMenu === 'login'
              ? (<LoginMenu></LoginMenu>)
              : firstMenu === 'data'
                ? (<DataMenu></DataMenu>)
                : (<ConfigMenu></ConfigMenu>)
          }

        </div>
      </div>
      <div className={classes.content}>
        {
          firstMenu === 'data' ? (
            <>
              <MyTabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 10
                }}
              >
                <Tab label={tabName || ""} />
                <Tab label="search" />
              </MyTabs>
              <TabPanel value={tabValue} index={0} >{props.children}</TabPanel>
              <TabPanel value={tabValue} index={1} >Seach page</TabPanel>
            </>

          ) : props.children
        }

      </div>



    </div>
  )
}

export default Layout