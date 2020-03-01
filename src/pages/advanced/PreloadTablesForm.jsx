import React, { useEffect, useState, useContext, useMemo } from "react";
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from "../../hooks/form";
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'


const PreloadTablesForm = props => {
  const classes = useFormStyles()
  const { t } = useTranslation();
  const preload_table = t("advanced").preload_table;
  return (
    <div className={classes.root}>
      <FormTextField label={preload_table.title} />
      <Typography variant="caption" component="p" align="left" paragraph>
        {preload_table.desc}
      </Typography>
      <FormActions />
    </div>
  )
}

export default PreloadTablesForm