import React, { useContext, useState } from 'react';
import { Typography, makeStyles, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { rootContext } from '../../context/Root';
import CustomInput from '../CustomInput/CustomInput';
import { uploadUserInfo } from '../../context/Api'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    maxWidth: '600px',
    borderRadius: '15px 0',
    padding: theme.spacing(5, 3),
    margin: '0 auto',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      padding: theme.spacing(3, 2),
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    boxShadow: '10px 20px 50px rgba(0, 0, 0, 0.15)',
    '& .title-bar': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#010e29',
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        marginBottom: theme.spacing(2),
      },
      '& .icon-wrapper': {
        width: '24px',
        height: '24px',
        cursor: 'pointer',
        '& svg': {
          fontSize: '24px',
          color: '#06aff2',
          pointerEvents: 'none',
        },
      },
    },
    '& .desc': {
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down(theme.breakpoints.values.md)]: {
        marginBottom: theme.spacing(2),
      },
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      marginBottom: theme.spacing(1),
    },
    '& div': {
      margin: theme.spacing(1, 0),
      background: '#fff',
    },
    '& .flex-box': {
      display: 'flex',
      justifyContent: 'space-between',
      '& div': {
        flexGrow: 1,
      },
      '& div:first-child': {
        marginRight: theme.spacing(2),
      },
    },
  },
  btnWrapper: {
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      width: '100%',
      textAlign: 'center',
      '& .sub-btn': {
        width: '100%',
      },
    },
    textAlign: 'right',
  },
}));


const RegisterForm = ({ isMobile, id }) => {
  const classes = useStyles();
  const { openSnackBar, hideDialog } = useContext(rootContext);

  const [firstName, setFirstName] = useState({
    value: '',
    showError: false,
  });
  const [lastName, setLastName] = useState({
    value: '',
    showError: false,
  });
  const [company, setCompany] = useState({
    value: '',
    showError: false,
  });
  const [position, setPosition] = useState({
    value: '',
    showError: false,
  });
  const [workPhone, setWorkPhone] = useState({
    value: '',
    showError: false,
  });

  const handleFirstNameChange = (value) => {
    const showError = !value;
    setFirstName({ value, showError });
  };
  const handleLastNameChange = (value) => {
    const showError = !value;
    setLastName({ value, showError });
  };
  const handleCompanyChange = (value) => {
    const showError = !value;
    setCompany({ value, showError });
  };
  const handlePositionChange = (value) => {
    setPosition({ value, showError: false });
  };
  const handlePhoneChange = (value) => {
    const showError = !Number.isNaN(Number(value));
    setWorkPhone({
      value,
      showError,
    });
  };
  const validateInput = () => {
    return (
      !firstName.value || !lastName.value || !company.value
    );
  };

  const handleSubmit = async () => {
    const params = {
      name: `${firstName.value}.${lastName.value}`,
      company: company.value,
      postion: position.value,
      phone: workPhone.value,
      demo_name: 'imageSearch',
    };
    try {
      const res = await uploadUserInfo(id, params);
      console.log(res)
      if (id) {
        window.localStorage.setItem('registered', 'true');
        openSnackBar('You are successfully submit!');
      }
    } catch (error) {
      console.log(error)
    } finally {
      hideDialog()
    }
  };

  return (
    <div className={classes.root}>
      <div className="title-bar">
        <Typography variant="h5">Get started for free</Typography>
        <div className="icon-wrapper" onClick={hideDialog}>
          <CloseIcon />
        </div>
      </div>

      <Typography variant="body1" className="desc">
        Get started by completing the form below.
      </Typography>
      <form className={classes.form}>
        {isMobile ? (
          <>
            <CustomInput
              placeholder="First name*"
              value={firstName.value}
              showError={firstName.showError}
              onChange={handleFirstNameChange}
              errType="required"
            />
            <CustomInput
              placeholder="Last name*"
              value={lastName.value}
              showError={lastName.showError}
              onChange={handleLastNameChange}
              errType="required"
            />
          </>
        ) : (
          <>
            <div className="flex-box">
              <CustomInput
                placeholder="First name*"
                value={firstName.value}
                showError={firstName.showError}
                onChange={handleFirstNameChange}
                errType="required"
              />
              <CustomInput
                placeholder="Last name*"
                value={lastName.value}
                showError={lastName.showError}
                onChange={handleLastNameChange}
                errType="required"
              />
            </div>
          </>
        )}
        <CustomInput
          placeholder="Your phone number"
          value={workPhone.value}
          onChange={handlePhoneChange}
        />
        <CustomInput
          placeholder="Your company name*"
          value={company.value}
          showError={company.showError}
          onChange={handleCompanyChange}
          errType="required"
        />
        <CustomInput
          placeholder="Your job title"
          value={position.value}
          onChange={handlePositionChange}
        />
      </form>
      <div className={classes.btnWrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={validateInput()}
          onClick={handleSubmit}
          className="sub-btn"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
