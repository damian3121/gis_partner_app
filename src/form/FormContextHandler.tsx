import { useFormikContext } from 'formik';
import React from 'react'

interface FormContextHandler<T> {
  props: (values: T) => void
}

export function FormContextHandler<T>(
  props: FormContextHandler<T>
) {
  const { values } = useFormikContext<T>();
  props.props(values)

  return null
};