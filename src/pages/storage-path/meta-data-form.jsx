import React, { useState, useContext, useEffect } from "react";
import { MenuItem, FormControl, InputLabel } from "@material-ui/core"
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormStyles, useFormValidate } from '../../hooks/form'
import { safetyGet } from '../../utils/helpers'
import Select from '@material-ui/core/Select'
import { FormTextField, FormSelect } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
import Grid from '@material-ui/core/Grid'

const defaultForm = {
  type: "mysql",
  host: "",
  port: "",
  username: "",
  password: ""
}
const MetaDataForm = function (props) {
  const { dbConfig } = useContext(systemContext)
  const {
    currentAddress,
    setMilvusConfig,
    restartNotify
  } = useContext(httpContext)
  const { openSnackBar } = useContext(materialContext)

  const { t } = useTranslation();
  const metaDataTrans = t("storage").metadata;
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})

  const classes = useFormStyles();
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  useEffect(() => {
    const currentConfig = dbConfig[currentAddress] || {}
    setForm({
      type: safetyGet(currentConfig, 'type', 'mysql'),
      host: safetyGet(currentConfig, 'host'),
      port: safetyGet(currentConfig, 'port'),
      username: safetyGet(currentConfig, 'username'),
      password: safetyGet(currentConfig, 'password')
    })
  }, [currentAddress, dbConfig])

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm()
    if (!isValid) {
      return
    }
    const { host, port, username, password, type } = form
    const url = `${type}://${username}:${password}@${host}:${port}/`
    const res = await setMilvusConfig({
      db_config: {
        backend_url: url
      }
    })
    if (res.code === 0) {
      openSnackBar(t("submitSuccess"));
      restartNotify()
    }

  };

  const handleCancel = () => {
    setForm({ ...defaultForm })
    setError({})
  };


  return (
    <>
      <Grid container>
        <Grid item sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="meta-data-type">{metaDataTrans.type}</InputLabel>
            <Select
              name="type"
              labelId="meta-data-type"
              id="meta-data-type-select"
              value={form.type}
              onChange={handleChange}
            >
              <MenuItem value="mysql">Mysql</MenuItem>
              <MenuItem value="sqlite">SQlite</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FormTextField
        name="host"
        label={metaDataTrans.host}
        value={form.host}
        onBlur={() => { handleCheck(form.host, "host") }}
        onChange={handleChange}
        placeholder="0.0.0.0"
        error={error.host}
        helperText={error.host && `${metaDataTrans.host}${t('required')}`}
      />
      <FormTextField
        name="port"
        label={metaDataTrans.port}
        value={form.port}
        onBlur={() => { handleCheck(form.port, "port") }}
        onChange={handleChange}
        placeholder="19121"
        error={error.port}
        helperText={error.port && `${metaDataTrans.port}${t('required')}`}
      />
      <FormTextField
        name="username"
        label={metaDataTrans.username}
        value={form.username}
        onBlur={() => { handleCheck(form.username, "username") }}
        onChange={handleChange}
        placeholder={metaDataTrans.username}
        error={error.username}
        helperText={error.username && `${metaDataTrans.username}${t('required')}`}
      />
      <FormTextField
        name="password"
        label={metaDataTrans.password}
        value={form.password}
        onBlur={() => { handleCheck(form.password, "password") }}
        onChange={handleChange}
        placeholder={metaDataTrans.password}
        error={error.password}
        helperText={error.password && `${metaDataTrans.password}${t('required')}`}
      />
      <FormActions />
    </>
  );
}

export default MetaDataForm;
