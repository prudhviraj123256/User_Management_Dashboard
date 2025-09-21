import React, { useState, useEffect } from 'react';
import { validateUserInput } from '../utils/validation';

function UserForm({ initialData = {}, onSubmit, onCancel }) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      ...initialData
    });
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateUserInput(user);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(user);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <div style={{ marginBottom: 10 }}>
        <label>First Name:</label><br />
        <input
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          style={{ width: '100%', padding: 6 }}
        />
        {errors.firstName && <div style={{ color: 'red' }}>{errors.firstName}</div>}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Last Name:</label><br />
        <input
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          style={{ width: '100%', padding: 6 }}
        />
        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Email:</label><br />
        <input
          name="email"
          value={user.email}
          onChange={handleChange}
          style={{ width: '100%', padding: 6 }}
        />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>Department:</label><br />
        <input
          name="department"
          value={user.department}
          onChange={handleChange}
          style={{ width: '100%', padding: 6 }}
        />
        {errors.department && <div style={{ color: 'red' }}>{errors.department}</div>}
      </div>

      <button type="submit" style={{ marginRight: 10 }}>Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default UserForm;
