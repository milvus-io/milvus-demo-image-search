import React, { useContext, useState, useEffect, useMemo } from 'react'
import { makeStyles, Divider } from "@material-ui/core";
import { Settings, ExitToApp } from '@material-ui/icons';
import { AiOutlineHome } from 'react-icons/ai';
import { MdStorage } from 'react-icons/md';

import { useTranslation } from "react-i18next";
import { useRouteMatch, useHistory } from 'react-router-dom'
import Logo from '../../assets/imgs/logo.svg'
import { KEYS } from '../../reducers/data-management'
import { httpContext } from "../../context/http"
import { dataManagementContext } from "../../context/data-management"
import { systemContext } from "../../context/system"
import { CLIENT_HISTORY, DELETE_MUTIPLE, DISCONNECT, INIT } from '../../consts';
import PopConfirm from '../../components/pop-confirm'
import DataMenu from './data-menu'
import ConfigMenu from './config-menu'
import LoginMenu from './login-menu';
import IframeMenu from './iframe-menu'


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  left: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing(8)}px ${theme.spacing(1)}px`,
    height: "100vh",
    backgroundColor: "rgb(27, 36, 48)"
  },
  icon: {
    marginBottom: theme.spacing(4),
    fontSize: "30px",
    fill: "rgb(238, 238, 238)"
  },
  active: {
    fill: theme.palette.primary.main
  },
  menuWrapper: {
    flex: " 0 0 270px",
    backgroundColor: "rgb(35, 47, 62)",
    color: "rgb(238, 238, 238)",
    "& .logo-wrapper": {
      padding: `${theme.spacing(2)}px 0 0 ${theme.spacing(2)}px`,
      width: "120px"
    }
  },
  logoutWrapper: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    "& .circle": {
      display: "inline-block",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: theme.palette.success.main
    },
    "& > span": {
      marginRight: theme.spacing(2),
      fontWeight: "bold"
    },
    "& .icon": {
      cursor: "pointer"
    }
  },
  content: {
    position: "relative",
    flex: 1,
    height: "100vh",
    overflowY: "scroll"
  }
}));

const Layout = props => {
  const classes = useStyles();
  const history = useHistory()
  const { t } = useTranslation();
  const { currentAddress, setCurrentAddress } = useContext(httpContext)
  const { milvusAddress, setMilvusAddress } = useContext(systemContext)
  const { setDataManagement } = useContext(dataManagementContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [firstMenu, setFisrstMenu] = useState('data')
  const [currentRoute, setCurrentRoute] = useState({})

  const collectionMatch = useRouteMatch("/data/collections/:collectionName");
  const partitionMatch = useRouteMatch(
    "/data/collections/:collectionName/partitions/:partitionTag"
  );
  const collectionsMatch = useRouteMatch("/data/collections");

  const effections = [JSON.stringify(collectionsMatch), JSON.stringify(collectionMatch), JSON.stringify(partitionMatch)]
  useEffect(() => {
    const { isExact, params } = collectionMatch || {};
    const { isExact: isPartition, params: partitionParams } =
      partitionMatch || {};
    const { isExact: isCollections } = collectionsMatch || {};
    if (isExact) {
      setCurrentRoute({
        page: "collection",
        collectionName: params.collectionName
      })
    }
    if (isPartition) {
      setCurrentRoute({
        page: "partition",
        collectionName: partitionParams.collectionName,
        partitionTag: partitionParams.partitionTag
      })
    }
    if (isCollections) {
      setCurrentRoute({
        page: "collections",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(effections)]);

  // active first menu by url
  useEffect(() => {

    const path = history.location.pathname

    if (path.includes('/login')) {
      setFisrstMenu('login')
    }
    if (path.includes('/data')) {
      setFisrstMenu('data')
    }
    if (path.includes('/config')) {
      setFisrstMenu('config')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.pathname])

  const { metrics = {}, elk = {} } = useMemo(() => {
    return milvusAddress[currentAddress] || {}
  }, [currentAddress, milvusAddress])

  const handleFirstMenuChange = e => {
    const name = e.currentTarget.dataset.name;
    setFisrstMenu(name);
    if (name === 'data') {
      history.push('/data/collections')
    }
    if (name === 'login') {
      history.push('/login')
    }
    if (name === 'config') {
      history.push('/configs/network')
    }
    if (name === 'iframe') {
      history.push('/iframe')
    }

  };

  const handleExit = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (currentAddress) {
      setCurrentAddress("");
      setMilvusAddress({
        type: DISCONNECT,
        payload: {
          id: currentAddress
        }
      });
      setDataManagement({
        type: DELETE_MUTIPLE,
        payload: {
          id: currentAddress,
          keys: [KEYS.table, KEYS.vectorSearch]
        }
      });
      history.push('/login')
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    try {
      let clients = window.localStorage.getItem(CLIENT_HISTORY) || {};
      clients = JSON.parse(clients);
      setMilvusAddress({ type: INIT, payload: { ...clients } });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const open = Boolean(anchorEl);
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <AiOutlineHome
          data-name="login"
          className={`${classes.icon} ${firstMenu === "login" &&
            classes.active}`}
          onClick={handleFirstMenuChange}
        ></AiOutlineHome>
        <MdStorage
          data-name="data"
          className={`${classes.icon} ${firstMenu === "data" &&
            classes.active}`}
          onClick={handleFirstMenuChange}
        ></MdStorage>
        <Settings
          data-name="config"
          className={`${classes.icon} ${firstMenu === "config" &&
            classes.active}`}
          onClick={handleFirstMenuChange}
        ></Settings>
        {
          ((elk.enable && elk.address) || (metrics.enable && metrics.address)) && <Settings
            data-name="iframe"
            className={`${classes.icon} ${firstMenu === "iframe" &&
              classes.active}`}
            onClick={handleFirstMenuChange}
          ></Settings>
        }



      </div>
      <div className={classes.menuWrapper}>
        <div className="logo-wrapper">
          <img src={Logo} alt="Milvus Logo"></img>
        </div>
        <div className={classes.logoutWrapper}>
          <span className="circle"></span>
          <span>{currentAddress}</span>
          {
            anchorEl && <PopConfirm
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
              handleConfirm={handleLogout}
              text={`${t("disconnect")}${currentAddress}?`}
            ></PopConfirm>
          }
          <ExitToApp className="icon" onClick={handleExit}></ExitToApp>
        </div>
        <Divider />
        {firstMenu === "login" && (
          <LoginMenu></LoginMenu>
        )}
        {firstMenu === "data" && (
          <DataMenu currentRoute={currentRoute}></DataMenu>
        )}
        {
          firstMenu === "config" && (
            <ConfigMenu></ConfigMenu>
          )
        }
        {
          firstMenu === "iframe" && (
            <IframeMenu metrics={metrics} elk={elk}></IframeMenu>
          )
        }
      </div>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

export default Layout;
