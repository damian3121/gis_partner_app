import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, makeStyles, Grid, Theme } from '@material-ui/core';
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab';
import MuiTextField from '@material-ui/core/TextField';
import { TextField } from 'formik-material-ui';
import { TableHeader } from '../../component/table/TableHeader';
import { Fragment, useState, useEffect } from 'react';
import { mapAxiosError } from '../../utils/RestUtils';
import { Notyfication, AlertType } from '../../component/notification/Notification';
import { useLoading } from '../../hooks/useLoading';
import { UserDetails, userService } from '../../service/userService';
import { AddressFilter, addressService, AddressValue } from '../../service/addressService';
import { FormContextHandler } from '../../form/FormContextHandler';
import { translation } from '../../translation'

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
  voivodeship: AddressValue;
  county: AddressValue;
  commune: AddressValue;
  city: AddressValue;
  street: AddressValue;
  buildingNumber: AddressValue;
  postalCode: AddressValue;
}

interface ErrorValue {
  name: string;
  surname: string;
  email: string;
  voivodeship: string;
  county: string;
  commune: string;
  city: string;
  street: string;
  buildingNumber: string;
  postalCode: string;
}

interface Props {
  selectedUser: UserDetails | null;
  onUserAdded(added: UserDetails): void;
}

function errorHandler(
  values: Values,
  counties: Array<AddressValue>,
  commune: Array<AddressValue>,
  cities: Array<AddressValue>,
  streets: Array<AddressValue>,
  buildingumbers: Array<AddressValue>,
  postalCodes: Array<AddressValue>
): Partial<ErrorValue> {
  const errors: Partial<ErrorValue> = {};
  const countyExistsInVoivodeship = values.county && counties.find(it => it.value == values.county.value)
  const communeExistsInCounty = values.commune && commune.find(it => it.value == values.commune.value)
  const cityExistsInCommune = values.city && cities.find(it => it.value == values.city.value)
  const streetExistsInCommune = values.street && streets.find(it => it.value == values.street.value)
  const buildingNumbersExistsAtStreet = values.buildingNumber && buildingumbers.find(it => it.value == values.buildingNumber.value)
  const postalCodesExistsAtStreet = values.postalCode && postalCodes.find(it => it.value == values.postalCode.value)

  if (!communeExistsInCounty) {
    errors.commune = translation.communeNotExistsInCounty
  }

  if (!countyExistsInVoivodeship) {
    errors.county = translation.countyNotExistsInVoivodeship
  }

  if (!cityExistsInCommune) {
    errors.city = translation.cityNotExistsInCommune
  }

  if (!streetExistsInCommune) {
    errors.street = translation.streetNotExistsInCity
  }

  if (!buildingNumbersExistsAtStreet) {
    errors.buildingNumber = translation.buildingNumberNotExistsAtStreet
  }

  if (!postalCodesExistsAtStreet) {
    errors.postalCode = translation.postalCodeNotExistsAtStreet
  }

  if (!values.name) {
    errors.name = translation.emptyValue
  }

  if (!values.surname) {
    errors.surname = translation.emptyValue
  }

  if (!values.email) {
    errors.email = translation.emptyValue
  }

  if (!values.voivodeship || !values.voivodeship.value) {
    errors.voivodeship = translation.emptyValue
  }

  if (!values.county || !values.county.value) {
    errors.county = translation.emptyValue
  }

  if (!values.commune || !values.commune.value) {
    errors.commune = translation.emptyValue
  }

  if (!values.city || !values.city.value) {
    errors.city = translation.emptyValue
  }

  if (!values.buildingNumber || !values.buildingNumber.value) {
    errors.buildingNumber = translation.emptyValue
  }

  if (!values.postalCode || !values.postalCode.value) {
    errors.postalCode = translation.emptyValue
  }

  return errors;
}

export function UserDetailsView({
  selectedUser: selectedUser,
  onUserAdded: onUserAdded
}: Props) {
  const cls = useStyle();

  const [currentFormState, setCurrentFormState] = useState<Values>()
  const [filters, setFilters] = useState<Array<AddressFilter>>([])

  const voivodeships = useLoading(
    () => addressService.getAllVoivodeships()
  )[0] || [];

  const counties = useLoading(
    () => addressService.getAllCountiesByVoivodeship(filters), filters
  )[0] || []

  const communes = useLoading(
    () => addressService.getAllCommunesByCounty(filters), filters
  )[0] || []

  const cities = useLoading(
    () => addressService.getAllCitiesByCommune(filters), filters
  )[0] || []

  const streets = useLoading(
    () => addressService.getAllStreetsByCommune(filters), filters
  )[0] || []

  const buildingNumbers = useLoading(
    () => addressService.getAllBuildingNumbersByStreet(filters), filters
  )[0] || []

  const postalCodes = useLoading(
    () => addressService.getAllPostalCodesByStreet(filters), filters
  )[0] || []

  useEffect(() => {
    setFilters([
      {
        level: 'woj',
        v: (currentFormState && currentFormState.voivodeship) ? currentFormState.voivodeship.value : ''
      },
      {
        level: 'pow',
        v: (currentFormState && currentFormState.county) ? currentFormState.county.value : ''
      },
      {
        level: 'gmi',
        v: (currentFormState && currentFormState.commune) ? currentFormState.commune.value : ''
      },
      {
        level: 'msc',
        v: (currentFormState && currentFormState.city) ? currentFormState.city.value : ''
      },
      {
        level: 'ulc',
        v: (currentFormState && currentFormState.street) ? currentFormState.street.value : ''
      }
    ])
  }, [currentFormState])

  const userNameProvider = selectedUser ? selectedUser.name : '';
  const userSurnameProvider = selectedUser ? selectedUser.surname : '';
  const userEmailProvider = selectedUser ? selectedUser.email : ''
  const userVoivodeshipProvider = selectedUser ? selectedUser.voivodeship : '';
  const userCountyProvider = selectedUser ? selectedUser.county : '';
  const userCommuneProvider = selectedUser ? selectedUser.commune : '';
  const userCityProvider = selectedUser ? selectedUser.city : '';
  const userStreetProvider = selectedUser ? selectedUser.street : '';
  const userBuildingNumberProvider = selectedUser ? selectedUser.buildingNumber : '';
  const userPostalCodeProvider = selectedUser ? selectedUser.postalCode : '';

  const isSelectedMode = selectedUser !== null;
  const [viewDetailsMode, setViewDetails] = useState(isSelectedMode);

  useEffect(() => {
    setViewDetails(isSelectedMode)
  }, [selectedUser]);

  return (
    <Fragment>
      <TableHeader>
        {viewDetailsMode ? translation.details : translation.addNewOne}
      </TableHeader>
      <Formik
        enableReinitialize
        initialValues={{
          name: userNameProvider,
          surname: userSurnameProvider,
          email: userEmailProvider,
          voivodeship: {
            value: userVoivodeshipProvider
          },
          county: {
            value: userCountyProvider
          },
          commune: {
            value: userCommuneProvider
          },
          city: {
            value: userCityProvider
          },
          street: {
            value: userStreetProvider
          },
          buildingNumber: {
            value: userBuildingNumberProvider
          },
          postalCode: {
            value: userPostalCodeProvider
          }
        }}
        validate={values => {
          return errorHandler(values, counties, communes, cities, streets, buildingNumbers, postalCodes);
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const item = await userService.create({
              name: values.name ? values.name : '',
              surname: values.surname ? values.surname : '',
              email: values.email ? values.email : '',
              voivodeship: values.voivodeship ? values.voivodeship.value : '',
              county: values.county ? values.county.value : '',
              commune: values.commune ? values.commune.value : '',
              city: values.city ? values.city.value : '',
              street: values.street ? values.street.value : '',
              buildingNumber: values.buildingNumber ? values.buildingNumber.value : '',
              postalCode: values.postalCode ? values.postalCode.value : ''
            });
            onUserAdded(item)
            setViewDetails(false)
            Notyfication({ type: AlertType.SUCCES, content: translation.successAddedUser })
          } catch (e) {
            mapAxiosError(e, {
              409() {
                Notyfication({ type: AlertType.ERROR, content: translation.userNotExists })
              }
            });
          }

          setSubmitting(false)
        }}
      >
        {({
          submitForm,
          isSubmitting,
          touched,
          errors
        }) => (
            <Form className={cls.formTypeDisplay}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name='name'
                    type='text'
                    label={translation.name}
                    fullWidth={true}
                    variant='filled'
                    className={cls.fieldMargin}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name='surname'
                    type='text'
                    label={translation.surname}
                    fullWidth={true}
                    variant='filled'
                    className={cls.fieldMargin}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Field
                    component={TextField}
                    name='email'
                    type='email'
                    label={translation.email}
                    fullWidth={true}
                    variant='filled'
                    className={cls.fieldMargin}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name='voivodeship'
                    component={Autocomplete}
                    options={voivodeships}
                    getOptionLabel={(option: AddressValue) => option.value}
                    className={cls.fieldMargin}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        name="voivodeship"
                        error={touched['voivodeship'] && !!errors['voivodeship']}
                        helperText={touched['voivodeship'] && errors['voivodeship']}
                        label={translation.voivodeship}
                        variant='filled'
                      />
                    )
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name='county'
                    component={Autocomplete}
                    options={counties}
                    getOptionLabel={(option: AddressValue) => option.value}
                    className={cls.fieldMargin}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        error={touched['county'] && !!errors['county']}
                        helperText={touched['county'] && errors['county']}
                        label={translation.county}
                        name='county'
                        variant='filled'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name='commune'
                    component={Autocomplete}
                    options={communes}
                    getOptionLabel={(option: AddressValue) => option.value}
                    className={cls.fieldMargin}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        error={touched['commune'] && !!errors['commune']}
                        helperText={touched['commune'] && errors['commune']}
                        label={translation.commune}
                        name='commune'
                        variant='filled'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name='city'
                    component={Autocomplete}
                    options={cities}
                    getOptionLabel={(option: AddressValue) => option.value}
                    className={cls.fieldMargin}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        error={touched['city'] && !!errors['city']}
                        helperText={touched['city'] && errors['city']}
                        label={translation.city}
                        name='city'
                        variant='filled'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name='street'
                    component={Autocomplete}
                    options={streets}
                    getOptionLabel={(option: AddressValue) => option.value}
                    className={cls.fieldMargin}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        error={touched['street'] && !!errors['street']}
                        helperText={touched['street'] && errors['street']}
                        label={translation.street}
                        name='street'
                        variant='filled'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name='buildingNumber'
                    component={Autocomplete}
                    options={buildingNumbers}
                    getOptionLabel={(option: AddressValue) => option.value}
                    className={cls.fieldMargin}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        error={touched['buildingNumber'] && !!errors['buildingNumber']}
                        helperText={touched['buildingNumber'] && errors['buildingNumber']}
                        label={translation.buildingNumber}
                        name='buildingNumber'
                        variant='filled'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name='postalCode'
                    component={Autocomplete}
                    options={postalCodes}
                    getOptionLabel={(option: AddressValue) => option.value}
                    className={cls.fieldMargin}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        error={touched['postalCode'] && !!errors['postalCode']}
                        helperText={touched['postalCode'] && errors['postalCode']}
                        label={translation.postalCode}
                        name='postalCode'
                        variant='filled'
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Button
                  variant='contained'
                  color='primary'
                  className={cls.buttonToRight}
                  disabled={isSubmitting}
                  hidden={viewDetailsMode}
                  onClick={submitForm}
                >
                  {translation.add}
                </Button>
              </Grid>
              <FormContextHandler
                props={setCurrentFormState}
              />
            </Form>
          )}
      </Formik>
    </Fragment >
  );
}
