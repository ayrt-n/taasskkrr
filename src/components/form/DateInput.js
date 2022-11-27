import React from 'react';
import { useField } from 'formik';
import '../../styles/Form.css';

function DateInput({ label, ...props }) {
  const [field, meta] = useField(props);

  if (field.value == null) {
    field.value = ''
  }

  return (
    <div className="field">
      <label htmlFor={props.id || props.name} className="label">{label}</label>
      <div className="control">
        <div className="date">
          <input type="date" {...field} {...props} />
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="Form-error-message">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default DateInput;
