import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { TextField, Button } from '@material-ui/core';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
  const history = useHistory();

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={(data, { resetForm }) => {
        console.log(data);
        axiosWithAuth()
          .post('/api/login', data)
          .then((res) => {
            console.log(res);
            resetForm({});
            history.push('/bubble-page');
          });
      }}
    >
      {({ values }) => (
        <Form>
          <Field
            name="username"
            values={values.username}
            variant="outlined"
            label="Username"
            as={TextField}
          />
          <Field
            name="password"
            values={values.password}
            variant="outlined"
            label="Password"
            as={TextField}
          />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
