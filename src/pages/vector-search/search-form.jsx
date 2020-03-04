import React, { useContext, useState, useEffect } from 'react'
import { dataManagementContext } from '../../context/data-management'
import { httpContext } from "../../context/http"
import { materialContext } from '../../context/material'
import { useTranslation } from "react-i18next";
import { useFormValidate } from '../../hooks/form'
import { useQuery } from '../../hooks'
import { COLLECTION_NAME } from '../../consts'
import { FormTextField } from '../../components/common/FormTextComponents'
import { Grid, IconButton, Select, MenuItem, InputLabel } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import WithTip from '../../components/with-tip'

const defaultForm = { topk: 2, nprobe: 16, vectors: '', collectionName: "" }

const NetworkFrom = (props) => {
  const query = useQuery()
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})

  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { openSnackBar } = useContext(materialContext)
  const { searchVectors } = useContext(httpContext)
  const { allCollections } = useContext(dataManagementContext)

  const { t } = useTranslation();
  const vectorTrans = t("vector");
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

  useEffect(() => {
    if (form.collectionName) {
      return
    }
    const collectionName =
      query.get(COLLECTION_NAME)
        ? query.get(COLLECTION_NAME)
        : (allCollections[0] ? allCollections[0].table_name : "")
    console.log(collectionName)
    setForm(v => ({
      ...v,
      collectionName
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCollections])

  return (
    <Grid container spacing={1} style={{ maxWidth: "1000px" }}>
      <Grid item sm={3} >
        <InputLabel htmlFor="collection-name">Collection Name</InputLabel>
        <Select
          name="collectionName"
          value={form.collectionName}
          onChange={handleChange}
          inputProps={{
            name: 'collectionName',
            id: 'collection-name',
          }}
          style={{ width: "100%" }}
        >
          {
            allCollections.map(v => (
              <MenuItem key={v.table_name} value={v.table_name}>{v.table_name}({v.dimension})</MenuItem>
            ))
          }
        </Select>
      </Grid >
      <FormTextField
        name="topk"
        type="number"
        sm={3}
        label={<>
          <span>{vectorTrans.tTop}</span>
          <WithTip title={tipsTrans.tTop} placement="bottom"></WithTip>
        </>}
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
        sm={3}
        label={<>
          <span>{vectorTrans.tNprobe}</span>
          <WithTip title={tipsTrans.tNprobe} placement="bottom"></WithTip>
        </>}
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
        label={<>
          <span>{vectorTrans.tQuery}</span>
          <WithTip title={tipsTrans.tQuery} placement="bottom"></WithTip>
        </>}
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