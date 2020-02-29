import {
  makeStyles
} from "@material-ui/core";
import {
  validateEmpty
} from "../utils/helpers";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "300px"
  },
  "ml-2": {
    marginLeft: theme.spacing(2)
  },
  "mt-4": {
    marginTop: theme.spacing(4)
  },
  formItem: {
    display: "flex",
    alignItems: "flex-end"
  },
  select: {
    width: '300px'
  },
  desc: {
    fontSize: "14px",
    color: "#B0B0B9",
    maxWidth: "500px"
  },
  icon: {
    marginLeft: theme.spacing(2),
    cursor: "pointer"
  },
  formControl: {
    marginTop: theme.spacing(2)
  },
  action: {
    textAlign: 'left'
  },
  gridItem:{
    padding: `0px !important` ,
    textAlign: 'left'
  }
}));

export function useFormStyles() {
  const classes = useStyles();
  return classes;
}

export function useFormValidate(form, setForm, setError) {
  // just validate is required
  const validateForm = () => {
    return Object.keys(form)
      .map(key => {
        if (!validateEmpty(form[key])) {
          setError(v => ({
            ...v,
            [key]: true
          }));
          return false;
        }
        return true;
      })
      .every(v => v);
  };

  const handleCheck = (val, key) => {
    setError(v => ({
      ...v,
      [key]: !validateEmpty(val)
    }));
  };

  // if value is string we can use it
  const handleChange = e => {
    const val = e.target.value;
    const name = e.target.name;
    setForm(v => {
      return {
        ...v,
        [name]: val
      };
    });
  };

  return {
    validateForm,
    handleCheck,
    handleChange
  };
}