import React from 'react'
import PropTypes from "prop-types";
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import FormActions from './FormActions'
const useStyles = makeStyles(theme => ({

  selector: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  textField: {
    '& > .MuiFormHelperText-root': {
      visibility: "hidden"
    },
    '& .Mui-error': {
      visibility: "visible"
    }
  },
}))
const Form = props => {
  const {
    config,
    handleSubmit,
    handleCancel,
    isFormChange = true,
  } = props
  const classes = useStyles()
  return (
    <Grid container alignItems="flex-end" spacing={1}>
      {
        config.map(v => {
          const {
            type = "",
            sm = 3,
            onBlur = () => { },
            onChange = () => { },
            name,
            component: Component,
            inline = false,
            inlineWidth,
            selectOptions,
            ...others
          } = v
          return (
            <div style={{ width: inline ? inlineWidth : "100%" }}>
              {
                type === 'textField' && (
                  <Grid sm={sm} key={name} item>
                    <TextField
                      classes={{ root: `${classes.textField}` }}
                      onBlur={onBlur}
                      onChange={onChange}
                      name={name}
                      {...others}
                    />
                  </Grid>
                )
              }
              {
                type === 'select' && (
                  <Grid item sm={sm} key={name}>
                    <FormControl classes={{ root: classes.selector }}>
                      <InputLabel id={`selector-${name}`}>{v.label}</InputLabel>
                      <Select
                        labelId={`selector-${name}`}
                        onChange={onChange}
                        {...others}
                      >
                        {
                          selectOptions.map(option => (
                            <MenuItem value={option.value}>{option.label}</MenuItem>
                          ))
                        }
                      </Select>
                    </FormControl>
                  </Grid>
                )
              }
              {
                type === "other" && (
                  <Grid item sm={sm} key={name}>
                    <Component ></Component>
                  </Grid>
                )
              }
            </div>

          )
        })
      }
      <FormActions save={handleSubmit} cancel={handleCancel} disableCancel={!isFormChange} />

    </Grid>

  )
}

Form.propTypes = {
  config: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func,
  isFormChange: PropTypes.bool
};

export default Form