import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Grid, Theme } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { TableHeader } from '../../component/table/TableHeader';
import { Fragment, useState, useEffect } from 'react';
import { mapAxiosError } from '../../utils/RestUtils';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import { useLoading } from '../../hooks/useLoading';
import { UserDetails, userService } from '../../service/userService';

const useStyle = makeStyles((theme: Theme) => ({
  fieldMargin: {
    margin: '3px',
  },
  formTypeDisplay: {
    display: 'flow-root'
  },
  buttonToRight: {
    position: 'relative',
    float: 'right',
    marginTop: '10px',
    marginBottom: '10px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

interface Values {
  name: string;
  surname: string;
  email: string;
}

interface Props {
  selectedUser: UserDetails | null;
  onUserAdded(added: UserDetails): void;
}

export function UserDetailsView({
  selectedUser: selectedUser,
  onUserAdded: onUserAdded
}: Props) {
  const cls = useStyle();

  const existingUserName = selectedUser ? selectedUser.name : null;
  const existingUserSurname = selectedUser ? selectedUser.surname : null;
  const existingUserEmail = selectedUser ? selectedUser.email : null
  const isSelectedMode = selectedUser !== null;
  const [viewDetailsMode, setViewDetails] = useState(isSelectedMode);

  useEffect(() => {
    setViewDetails(isSelectedMode)
  }, [selectedUser]);

  return (
    <Fragment>
      <TableHeader>
        {viewDetailsMode ? 'Szczegóły' : 'Dodaj nowy'}
      </TableHeader>
      <Formik
        enableReinitialize
        initialValues={{
          name: existingUserName,
          surname: existingUserSurname,
          email: existingUserEmail
        }}
        validate={values => {
          const errors: Partial<Values> = {};
          if (!values.name) {
            errors.name = 'Pole nie może być puste';
          }

          if (!values.surname) {
            errors.surname = 'Pole nie może być puste';
          }

          if (!values.email) {
            errors.email = 'Pole nie może być puste';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const item = await userService.create({
              name: values.name ? values.name : '',
              surname: values.surname ? values.surname : '',
              email: values.email ? values.email : ''
            });
            onUserAdded(item)
            selectedUser = {
              id: 0,
              email: '',
              name: '',
              surname: ''
            }
            setViewDetails(false)
            Notyfication({ type: AlertType.SUCCES, content: "Dodano użytkownika" })
          } catch (e) {
            mapAxiosError(e, {
              409() {
                Notyfication({ type: AlertType.ERROR, content: "Użytkownik już istnieje" })
              }
            });
          }

          setSubmitting(false)
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={cls.formTypeDisplay}>
            <Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  name="name"
                  type="text"
                  label="name"
                  fullWidth={true}
                  variant="filled"
                  className={cls.fieldMargin}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  name="surname"
                  type="text"
                  label="Nazwisko"
                  fullWidth={true}
                  variant="filled"
                  className={cls.fieldMargin}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth={true}
                  variant="filled"
                  className={cls.fieldMargin}
                />
              </Grid>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                color="primary"
                className={cls.buttonToRight}
                disabled={isSubmitting}
                hidden={viewDetailsMode}
                onClick={submitForm}
              >
                {'dodaj'}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Fragment >
  );
}
