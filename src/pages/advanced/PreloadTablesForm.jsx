import React, { useEffect, useState, useContext, useRef } from "react";
import { materialContext } from '../../context/material'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'

const PreloadTablesForm = props => {
  const classes = useFormStyles()
  const [preload, setPreload] = useState('')
  const { t } = useTranslation();
  const preload_table = t("advanced").preload_table;
  const { openSnackBar } = useContext(materialContext)
  const { serverConfig } = useContext(systemContext);
  const {
    currentAddress = "",
    getMilvusConfigs,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext);
  const configsContainer = useRef(null);

  const savePreload = async () => {
    const currSettings = { ...configsContainer.current, db_config: { ...configsContainer.current.db_config, preload_table: preload } }
    setMilvusConfig(currSettings).then(res => {
      if (res.code === 0) {
        openSnackBar(t('submitSuccess'))
        restartNotify()
      }
    })
  }

  useEffect(() => {
    const initSetting = async () => {
      const allConfigs = await getMilvusConfigs();
      const { db_config = {} } = allConfigs || {}
      configsContainer.current = allConfigs || {}
      setPreload(db_config.preload_table || "")
    }
    initSetting()
  }, [currentAddress, serverConfig])

  return (
    <div className={classes.root}>
      <FormTextField label={preload_table.title} value={preload} onChange={e => setPreload(e.target.value)} />
      <Typography variant="caption" component="p" align="left" paragraph>
        {preload_table.desc}
      </Typography>
      <FormActions save={savePreload} />
    </div>
  )
}

export default PreloadTablesForm