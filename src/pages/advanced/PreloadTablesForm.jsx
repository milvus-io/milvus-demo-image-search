import React, { useEffect, useState } from "react";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'


const PreloadTablesForm = props => {
  const classes = useFormStyles()
  const [preload, setPreload] = useState('')
  const { t } = useTranslation();
  const preload_table = t("advanced").preload_table;
  return (
    <div className={classes.root}>
      <FormTextField label={preload_table.title} value={preload} onChange={e => setPreload(e.target.value)} />
      <Typography variant="caption" component="p" align="left" paragraph>
        {preload_table.desc}
      </Typography>
      <FormActions />
    </div>
  )
}

export default PreloadTablesForm