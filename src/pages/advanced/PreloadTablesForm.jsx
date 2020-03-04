import React, { useEffect, useState, useContext } from "react";
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
  const { serverConfig, milvusConfigs = {} } = useContext(systemContext);
  const {
    currentAddress = "",
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext);

  const savePreload = async () => {
    const newMilvusConfigs = { ...milvusConfigs, db_config: { ...milvusConfigs.db_config, preload_table: preload } }
    setMilvusConfig(newMilvusConfigs).then(res => {
      if (res.code === 0) {
        openSnackBar(t('submitSuccess'))
        restartNotify()
      }
    })
  }
  const resetPreload = () => {
    const { db_config = {} } = milvusConfigs
    setPreload(db_config.preload_table || "")
  }

  useEffect(() => {
    resetPreload()
    // eslint-disable-next-line
  }, [currentAddress, serverConfig])

  return (
    <div className={classes.root}>
      <FormTextField label={preload_table.title} value={preload} onChange={e => setPreload(e.target.value)} />
      <Typography variant="caption" component="p" align="left" paragraph>
        {preload_table.desc}
      </Typography>
      <FormActions save={savePreload} cancel={resetPreload} />
    </div>
  )
}

export default PreloadTablesForm