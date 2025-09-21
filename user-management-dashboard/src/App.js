import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "./services/userService";

import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Pagination from "./components/Pagination";
import FilterPopup from "./components/FilterPopup";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
    setCurrentPage(1);
  }, [users, filters, sortConfig]);

  async function loadUsers() {
    try {
      const data = await fetchUsers();

      const parsedUsers = data.map((u) => {
        const [firstName = "", lastName = ""] = u.name ? u.name.split(" ") : [];
        return {
          ...u,
          firstName,
          lastName,
          department: u.department || "General",
        };
      });

      setUsers(parsedUsers);
      setError("");
    } catch {
      setError("Failed to fetch users from server.");
    }
  }

  function applyFiltersAndSort() {
    let filtered = users.filter((user) => {
      return (
        (user.firstName || "").toLowerCase().includes((filters.firstName || "").toLowerCase()) &&
        (user.lastName || "").toLowerCase().includes((filters.lastName || "").toLowerCase()) &&
        (user.email || "").toLowerCase().includes((filters.email || "").toLowerCase()) &&
        (user.department || "").toLowerCase().includes((filters.department || "").toLowerCase())
      );
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aVal = (a[sortConfig.key] || "").toString().toLowerCase();
        const bVal = (b[sortConfig.key] || "").toString().toLowerCase();

        if (aVal < bVal) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(filtered);
  }

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleAddClick = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
      setError("");
    } catch {
      setError("Failed to delete user.");
    }
  };

  const handleFormSubmit = async (userData) => {
    if (editingUser) {
      try {
        await updateUser(editingUser.id, userData);
        setUsers(
          users.map((u) => (u.id === editingUser.id ? { ...u, ...userData } : u))
        );
        setShowForm(false);
        setError("");
      } catch {
        setError("Failed to update user.");
      }
    } else {
      try {
        const newUser = await addUser(userData);
        const addedUser = { ...newUser, id: users.length + 1 };
        setUsers([...users, addedUser]);
        setShowForm(false);
        setError("");
      } catch {
        setError("Failed to add user.");
      }
    }
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>User Management Dashboard</h1>

      {error && (
        <div style={{ color: "red", marginBottom: 10 }}>
          <strong>{error}</strong>
        </div>
      )}

      <button onClick={handleAddClick} style={{ marginBottom: 20 }}>
        Add User
      </button>

      <FilterPopup onApply={handleFilterApply} />

      <UserList
        users={filteredUsers}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        pageSize={pageSize}
        currentPage={currentPage}
        onSort={requestSort}
        sortConfig={sortConfig}
      />

      <Pagination
        totalItems={filteredUsers.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {showForm && (
        <UserForm
          initialData={editingUser || {}}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;
