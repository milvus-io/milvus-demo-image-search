import React, { useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/styles'
import { FaDatabase } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { systemContext } from '../../context/system'
import { useTranslation } from "react-i18next";
import { useConnectMilvus } from '../../hooks'
import { UPDATE } from '../../consts'

const LoginMenu = props => {
  const { milvusAddress } = useContext(systemContext)
  const connectMilvus = useConnectMilvus()

  const classes = makeStyles(theme => ({
    root: {
      paddingTop: theme.spacing(1),
      '& > h3': {
        color: "#fff",
        fontSize: "20px"
      }
    },
    icon: {
      marginRight: theme.spacing(1)
    },
    wrapper: {
      marginBottom: theme.spacing(1),
      cursor: 'pointer'
    }
  }))()
  const history = useHistory()
  const { t } = useTranslation();

  useEffect(() => {
    history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleConnect = (e) => {
    const { url } = e.currentTarget.dataset
    connectMilvus(url, UPDATE)
  }


  return (
    <div className={classes.root}>
      <h3>{t("recentConnect")}</h3>
      {Object.keys(milvusAddress).map(key => {
        const { url } = milvusAddress[key];
        return (
          <div className={classes.wrapper} data-url={url} key={url} onClick={handleConnect}>
            <FaDatabase className={classes.icon} />
            <span>{url}</span>
          </div>
        )
      })}
    </div>
  )
}

export default LoginMenu