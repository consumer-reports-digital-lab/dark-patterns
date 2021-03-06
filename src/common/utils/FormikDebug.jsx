import React from 'react';
import { FormikConsumer } from 'formik';

const FormikDebug = () => {
  if (!process.env.GATSBY_APP_SHOW_DEBUG) return (<></>)

  return (

    <div
      style={{
        margin: '3rem 0',
        borderRadius: 4,
        background: '#f6f8fa',
        boxShadow: '0 0 1px  #eee inset',
      }}
    >
      <div
        style={{
          textTransform: 'uppercase',
          fontSize: 11,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          fontWeight: 500,
          padding: '.5rem',
          background: '#555',
          color: '#fff',
          letterSpacing: '1px',
        }}
      >
        Formik State
      </div>
      <FormikConsumer>
        {({ validationSchema, validate, onSubmit, ...rest }) => (
          <pre
            style={{
              fontSize: '.65rem',
              padding: '.25rem .5rem',
              overflowX: 'scroll',
            }}
          >
            {/* {console.log("REST:", rest)} */}
            {JSON.stringify(rest, null, 2)}
          </pre>
        )}
      </FormikConsumer>
    </div>
  )
}

export default FormikDebug