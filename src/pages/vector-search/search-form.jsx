import React, { useContext, useState, useEffect } from 'react'
import { systemContext } from '../../context/system'
import { httpContext } from "../../context/http"
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormValidate } from '../../hooks/form'
import { FormTextField } from '../../components/common/FormTextComponents'
import FormActions from '../../components/common/FormActions'
import { Grid, IconButton, TextareaAutosize } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";

const defaultForm = { topk: 2, nprobe: 16, vectors: '' }

const NetworkFrom = (props) => {
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})

  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { openSnackBar } = useContext(materialContext)
  const { searchVectors } = useContext(httpContext)

  const { t } = useTranslation();
  const vectorTrans = t("vector");
  const buttonTrans = t("button");
  const tipsTrans = vectorTrans.tips;
  const { searchSuccess, collectionName, partitionTag } = props

  const handleSubmit = async e => {
    e.preventDefault();
    const isValid = validateForm()
    if (!isValid) {
      return
    }
    const regx = /[^(0-9|,|.)]/g;
    const newVectors = form.vectors
      .replace(regx, "")
      .split(",")
      .filter(v => v || v === 0)
      .map(v => Number(v));

    setForm(v => ({
      ...v,
      vectors: JSON.stringify(newVectors)
    }))
    const data = {
      ...form,
      vectors: [newVectors],
    }
    partitionTag && (data['partition_tags'] = [partitionTag])
    const res = await searchVectors(collectionName, { search: data })

    searchSuccess(res.result[0] || []);
  };

  return (
    <Grid container spacing={1} style={{ maxWidth: "1000px" }}>
      <FormTextField
        name="topk"
        type="number"
        label={vectorTrans.tTop}
        value={form.topk}
        onBlur={() => { handleCheck(form.topk, "topk") }}
        onChange={handleChange}
        placeholder={vectorTrans.tTop}
        error={error.topk}
        needMarginBottom={false}
        helperText={`${vectorTrans.tTop}${t('required')}`}
      />
      <FormTextField
        name="nprobe"
        type="number"
        label={vectorTrans.tNprobe}
        value={form.nprobe}
        onBlur={() => { handleCheck(form.nprobe, "nprobe") }}
        onChange={handleChange}
        placeholder={vectorTrans.tNprobe}
        error={error.nprobe}
        needMarginBottom={false}
        helperText={`${vectorTrans.tNprobe}${t('required')}`}
      />
      <FormTextField
        name="vectors"
        sm={8}
        label={vectorTrans.tQuery}
        value={form.vectors}
        onBlur={() => { handleCheck(form.vectors, "vectors") }}
        onChange={handleChange}
        placeholder={vectorTrans.tQuery}
        error={error.vectors}
        needMarginBottom={false}
        helperText={`${vectorTrans.tQuery}${t('required')}`}
      />
      <Grid item sm={4}>
        <IconButton
          onClick={handleSubmit}
          color="primary"
          aria-label="search"
          component="span" >
          <SearchIcon ></SearchIcon>
        </IconButton>
      </Grid>
    </Grid>

  );
}
export default NetworkFrom