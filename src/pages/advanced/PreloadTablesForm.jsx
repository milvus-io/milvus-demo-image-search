import React, { useEffect, useState, useContext, useMemo } from "react";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'

import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'


const PreloadTablesForm = props => {
  const classes = useFormStyles()
  const { t } = useTranslation();
  const preload_table = t("advanced").preload_table;
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="p" align="left" >
        {preload_table.title}
      </Typography>
      <Typography variant="caption" component="p" align="left" paragraph>
        {preload_table.desc}
      </Typography>
      <FormTextField label="tables" />
      <FormActions />
    </div>
  )
}

export default PreloadTablesForm