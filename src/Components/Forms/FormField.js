import React from 'react';
import {useFormikContext} from 'formik';

import ErrorMessage from './ErrorMessage';
import TextInput from '../TextInput';

export default function FormField({name, width, ...otherProps}) {
  const {setFieldTouched, setFieldValue, values, errors, touched} =
    useFormikContext();

  return (
    <>
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={text => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
        width={width}
        style={{flex: 1}}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
