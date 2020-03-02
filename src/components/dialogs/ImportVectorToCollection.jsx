import React, { useRef, useContext } from 'react';
import useStyles from './Style'
import Grid from '@material-ui/core/Grid';
import { FaUpload } from 'react-icons/fa';
import { DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import { materialContext } from '../../context/material'
import { useTranslation } from 'react-i18next'
const ImportVectorToCollection = props => {
  const classes = useStyles()
  const { t } = useTranslation()
  const vectorTrans = t('vector')
  const { importVectors = () => { }, partitionTag, } = props;
  const Input = useRef(null)
  const { openSnackBar, hideDialog } = useContext(materialContext)


  const uploadFile = e => {
    const form = Input.current;
    const reader = new FileReader()
    reader.onload = async function (e) {
      // Use reader.result
      const csv = reader.result;
      const regex = /"([^"]*)"/g;
      let currentResult;
      let results = [];
      while ((currentResult = regex.exec(csv)) !== null) {
        results.push(currentResult[1]);
      }
      results = results.map(v => {
        try {
          return JSON.parse(v)
        } catch (error) {
          throw error
        }
      })
      console.log(results)
      await importVectors(results)
      hideDialog()
    }
    reader.onerror = function (e) {
      console.log(e)
    }
    form.onchange = e => {
      const file = e.target.files[0];
      if (!file || file.type !== "text/csv") {
        openSnackBar(vectorTrans.error.fileType, 'warning')
        return
      }
      reader.readAsText(file, 'utf8')

      //TODO: do something with file
    }
    form.click()
  }
  return (
    <>
      <DialogTitle >{`${vectorTrans.import} ${partitionTag}`}</DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
        <Grid classes={{ root: classes.gridRoot }} container spacing={3}>
          <Grid item sm={12} onClick={uploadFile}>
            <div className={classes.upload}>
              <FaUpload size={100} />
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.upload}>Please make sure the csv you upload contains 4096 dimensions vectors</p>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {/* <Button variant="outlined" onClick={() => update()} color="primary">
          {buttonTrans.import}
        </Button>
        <Button variant="outlined" onClick={() => hideDialog()} color="primary">
          {buttonTrans.cancel}
        </Button> */}
      </DialogActions>
      <input ref={Input} id='fileid' type='file' style={{ display: 'none' }} />
    </>)
}

export default ImportVectorToCollection