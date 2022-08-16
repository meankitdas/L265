import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Formik} from 'formik';

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => (
        <>
          <View style={styles.container}>{children}</View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
