import React from 'react';
import { useField } from 'formik';
import '../../styles/Form.css';

function SelectInput({ label, children, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="field">
      <label htmlFor={props.id || props.name} className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select {...field} {...props}>
            {children}
          </select>
        </div>
      </div>
      {meta.touched && meta.error ? (
        <div className="Form-error-message">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default SelectInput;
