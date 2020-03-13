import {
  makeStyles
} from "@material-ui/core";
import {
  validateEmpty
} from "../utils/helpers";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    maxWidth: '800px'
  },
  icon: {
    marginLeft: theme.spacing(2),
    cursor: "pointer",
    fontSize: '1rem'
  },
  formControl: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },

  gridItem: {
    padding: `0px !important`,
    textAlign: 'left'
  },
  part: {
    marginBottom: theme.spacing(1)
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