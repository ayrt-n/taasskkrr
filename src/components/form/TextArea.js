import React from 'react';
import { useField } from 'formik';
import '../../styles/Form.css';

function TextArea({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="field">
      <label htmlFor={props.id || props.name} className="label">{label}</label>
      <textarea className="textarea" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="Form-error-message">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default TextArea;
