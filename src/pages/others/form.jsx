import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { systemContext } from '../../context/system'
// import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from '@material-ui/core/Switch'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'

// import { UPDATE } from "../../consts";
const NetworkForm = props => {
  const classes = makeStyles(theme => ({
    gridItem: {
      marginBottom: theme.spacing(2)
    },
    formControlLabel: {
      marginBottom: theme.spacing(2),
      marginLeft: `0 !important`
    },
  }))()
  // const { metricConfig } = useContext(systemContext)
  // const {
  //   currentAddress,
  //   setMilvusConfig,
  //   restartNotify
  // } = useContext(httpContext)
  const { t } = useTranslation();
  const others = t("others");

  return (
    <>
      <FormControlLabel
        classes={{ root: classes.formControlLabel }}
        value="start"
        control={<Switch color="primary" />}
        label={others.enable}
        labelPlacement="start"
      />
      <FormTextField label={others.address} />
      <FormActions />
    </>
  )
};

export default NetworkForm;
