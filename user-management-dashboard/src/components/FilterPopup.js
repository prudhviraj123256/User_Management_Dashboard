import React, { useState } from 'react';

function FilterPopup({ onApply }) {
  const [filters, setFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    onApply(filters);
  };

  const clearFilters = () => {
    setFilters({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
    });
    onApply({});
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: 10,
      marginBottom: 20,
      maxWidth: 400,
    }}>
      <h4>Filter Users</h4>
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={filters.firstName}
          onChange={handleChange}
          style={{ width: '100%', padding: 5 }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={filters.lastName}
          onChange={handleChange}
          style={{ width: '100%', padding: 5 }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={filters.email}
          onChange={handleChange}
          style={{ width: '100%', padding: 5 }}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={filters.department}
          onChange={handleChange}
          style={{ width: '100%', padding: 5 }}
        />
      </div>
      <button onClick={applyFilters} style={{ marginRight: 10 }}>Apply</button>
      <button onClick={clearFilters}>Clear</button>
    </div>
  );
}

export default FilterPopup;
