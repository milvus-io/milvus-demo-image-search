import React, { useContext, useState, useEffect, useMemo } from 'react'
import { httpContext } from "../../context/http"
import { useTranslation } from "react-i18next";
import { useFormValidate } from '../../hooks/form'
import { useQuery } from '../../hooks'
import { COLLECTION_NAME } from '../../consts'
import { FormTextField } from '../../components/common/FormTextComponents'
import { Grid, Button, Select, MenuItem, InputLabel } from '@material-ui/core'
import WithTip from '../../components/with-tip'
import { makeStyles } from '@material-ui/styles'
import { INDEX_CONFIG } from '../../consts'
const defaultForm = { topk: 2, nprobe: 16, ef: 100, vectors: '', collectionName: "" }

const NetworkFrom = (props) => {
  const classes = makeStyles(theme => ({
    labelContainer: {
      display: 'flex',
      justifyContent: 'start',
      alignItems: "center",
    }
  }))()
  const query = useQuery()
  const [form, setForm] = useState({ ...defaultForm })
  const [error, setError] = useState({})
  const [collections, setCollections] = useState([])
  const { validateForm, handleCheck, handleChange } = useFormValidate(form, setForm, setError)

  const { searchVectors, getCollections, currentAddress } = useContext(httpContext)

  const { t } = useTranslation();
  const vectorTrans = t("vector");
  const tipsTrans = vectorTrans.tips;
  const { searchSuccess, search } = props

  const fetchCollections = async () => {
    const res = await getCollections({
      all_required: true
    });
    const { collections = [] } = res || {};
    setCollections(collections)
  }
  useEffect(() => {
    if (!currentAddress) {
      return
    }
    fetchCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress])

  const handleSubmit = async e => {
    e && e.preventDefault();
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
    const params = indexSearchParams.reduce((pre, cur) => {
      pre[cur] = form[cur]
      return pre
    }, {})
    const data = {
      vectors: [newVectors],
      topk: Number(form.topk),
      params
    }
    // partitionTag && (data['partition_tags'] = [partitionTag])
    const res = await searchVectors(form.collectionName, { search: data })

    searchSuccess(res.result[0] || []);
  };
  const queryCollectionName = query.get(COLLECTION_NAME)
  useEffect(() => {
    if (queryCollectionName && queryCollectionName === form.collectionName) {
      return
    }
    const collectionName =
      queryCollectionName
        ? queryCollectionName
        : (collections[0] ? collections[0].collection_name : "")
    setForm(v => ({
      ...v,
      collectionName
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, queryCollectionName])

  useEffect(() => {
    if (!search) return
    handleSubmit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const indexSearchParams = useMemo(() => {
    if (!form.collectionName) return []
    const target = collections.find(v => v.collection_name === form.collectionName) || {}
    return INDEX_CONFIG[target.index] ? INDEX_CONFIG[target.index].search : []
  }, [form.collectionName, collections])

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
            collections.map(v => (
              <MenuItem key={v.collection_name} value={v.collection_name}>{v.collection_name}({v.dimension})</MenuItem>
            ))
          }
        </Select>
      </Grid >
      <FormTextField
        name="topk"
        type="number"
        sm={3}
        label={<div className={classes.labelContainer}>
          <span>{vectorTrans.tTop}</span>
          <WithTip title={tipsTrans.tTop} placement="bottom"></WithTip>
        </div>}
        value={form.topk}
        onBlur={() => { handleCheck(form.topk, "topk") }}
        onChange={handleChange}
        placeholder={vectorTrans.tTop}
        error={error.topk}
        needMarginBottom={false}
        helperText={`${vectorTrans.tTop}${t('required')}`}
      />
      {
        indexSearchParams.includes('nprobe') && <FormTextField
          name="nprobe"
          type="number"
          sm={3}
          label={<div className={classes.labelContainer}>
            <span>{vectorTrans.tNprobe}</span>
            <WithTip title={tipsTrans.tNprobe} placement="bottom"></WithTip>
          </div>}
          value={form.nprobe}
          onBlur={() => { handleCheck(form.nprobe, "nprobe") }}
          onChange={handleChange}
          placeholder={vectorTrans.tNprobe}
          error={error.nprobe}
          needMarginBottom={false}
          helperText={`${vectorTrans.tNprobe}${t('required')}`}
        />
      }
      {
        indexSearchParams.includes('ef') && <FormTextField
          name="ef"
          type="number"
          sm={3}
          label={<div className={classes.labelContainer}>
            <span>Ef</span>
          </div>}
          value={form.ef}
          onBlur={() => { handleCheck(form.ef, "ef") }}
          onChange={handleChange}
          placeholder={""}
          error={error.ef}
          needMarginBottom={false}
          helperText={`ef is ${t('required')}`}
        />
      }

      <FormTextField
        name="vectors"
        sm={9}
        label={<div className={classes.labelContainer}>
          <span>{vectorTrans.tQuery}</span>
          <WithTip title={tipsTrans.tQuery} placement="bottom"></WithTip>
        </div>}
        value={form.vectors}
        onBlur={() => { handleCheck(form.vectors, "vectors") }}
        onChange={handleChange}
        placeholder={'[1,3,4,5]'}
        error={error.vectors}
        needMarginBottom={false}
        helperText={`${vectorTrans.tQuery}${t('required')}`}
      />
      <Grid item sm={4}>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          size="small"
          color="primary"
        >
          Search
        </Button>
      </Grid>
    </Grid>

  );
}
export default NetworkFrom