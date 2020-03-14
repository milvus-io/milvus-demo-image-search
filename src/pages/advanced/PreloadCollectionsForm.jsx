import React, { useEffect, useState, useContext } from "react";
import { materialContext } from '../../context/material'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import Form from '../../components/form/Form'

const PreloadCollectionsForm = props => {
  const classes = useFormStyles()
  const [preload, setPreload] = useState('')
  const [isFormChange, setIsformChange] = useState(false)
  const { t } = useTranslation();
  const preload_table = t("advanced").preload_table;
  const { openSnackBar } = useContext(materialContext)
  const { serverConfig, milvusConfigs = {} } = useContext(systemContext);
  const {
    currentAddress = "",
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext);

  const savePreload = async () => {
    const newMilvusConfigs = {
      db_config: {
        // auto_flush_interval: milvusConfigs.db_config.auto_flush_interval,
        // backend_url: milvusConfigs.db_config.backend_url,
        preload_table: preload.split(',').map(a => a.trim()).join(',')
      }
    }
    setMilvusConfig(newMilvusConfigs).then(res => {
      if (res.code === 0) {
        openSnackBar(t('submitSuccess'))
        restartNotify()
        setIsformChange(false)
      }
    })
  }
  const resetPreload = () => {
    const { db_config = {} } = milvusConfigs
    setPreload(db_config.preload_table || "")
    setIsformChange(false)
  }

  useEffect(() => {
    resetPreload()
    // eslint-disable-next-line
  }, [currentAddress, serverConfig])
  const formConfigs = [{
    type: "textField",
    name: "preload_table",
    fullWidth: true,
    label: preload_table.title,
    value: preload,
    placeholder: preload_table.title,
    onChange: e => { setPreload(e.target.value); setIsformChange(true) }
  }, {
    type: "other",
    name: "preload_table_desc",
    sm: 12,
    component: () => (
      <Typography variant="caption" component="p" align="left" paragraph>
        {preload_table.desc}
      </Typography>
    )
  }]
  return (
    <div className={classes.root}>
      <Form
        config={formConfigs}
        handleSubmit={savePreload}
        handleCancel={resetPreload}
        isFormChange={isFormChange}
      ></Form>
    </div>
  )
}

export default PreloadCollectionsForm