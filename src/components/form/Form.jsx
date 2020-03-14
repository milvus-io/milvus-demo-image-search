import React from 'react'
import PropTypes from "prop-types";
import { TextField, Grid, FormControl, InputLabel, Switch, Select, Slider, MenuItem, Typography } from '@material-ui/core'
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
            range = [],
            unit = "G",
            sliderLabelSm,
            marks = true,
            step = 1,
            ...others
          } = v
          return (
            <div style={{ width: inline ? inlineWidth : "100%" }} key={name}>
              {
                type === 'textField' && (
                  <Grid sm={sm} item>
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
                  <Grid item sm={sm}>
                    <FormControl classes={{ root: classes.selector }}>
                      <InputLabel id={`selector-label-${name}`}>{v.label}</InputLabel>
                      <Select
                        labelId={`selector-label-${name}`}
                        id={`selector-${name}`}
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
                type === "switch" && (
                  <Grid container alignItems="center">
                    <Grid item sm={sm}>{v.label}</Grid>
                    <Grid item sm={sm}>
                      <Switch
                        checked={v.value}
                        onChange={onChange}
                        color="primary"
                      />
                    </Grid>
                  </Grid>

                )
              }

              {
                type === 'slider' && (
                  <Grid container>
                    <Grid item sm={sliderLabelSm}>
                      <Typography>{v.label}</Typography>
                    </Grid>
                    {
                      range[0] && (<Grid item sm={1}>
                        <Typography varient="p" component="p" align="center">
                          {range[0]}{unit}
                        </Typography>
                      </Grid>)
                    }

                    <Grid item sm={sm}>
                      <Slider
                        step={step}
                        marks={marks}
                        valueLabelDisplay="auto"
                        min={Number(range[0])} max={Number(range[1])}
                        onChange={onChange}
                        {...others}
                      />
                    </Grid>
                    {
                      range[1] && (
                        <Grid item sm={1}>
                          <Typography varient="p" component="p" align="center">
                            {range[1]}{unit}
                          </Typography>
                        </Grid>
                      )
                    }

                  </Grid>

                )
              }
              {
                type === "other" && (
                  <Grid item sm={sm}>
                    <Component ></Component>
                  </Grid>
                )
              }
            </div>

          )
        })
      }
      {
        handleSubmit && handleCancel && <FormActions save={handleSubmit} cancel={handleCancel} disableCancel={!isFormChange} />
      }


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