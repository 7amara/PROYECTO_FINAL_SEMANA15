import React from 'react';
import { Form } from 'react-bootstrap';

const FormInput = ({ label, type, placeholder, value, onChange, controlId, required = true }) => {
  return (
    <Form.Group controlId={controlId} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </Form.Group>
  );
};

export default FormInput;
