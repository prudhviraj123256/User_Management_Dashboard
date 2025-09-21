import React from "react";

function UserList({
  users,
  onEdit,
  onDelete,
  pageSize,
  currentPage,
  onSort = () => {},
  sortConfig = { key: null, direction: null },
}) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentUsers = users.slice(startIndex, endIndex);

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? " ▲" : " ▼";
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("id")}>
            ID{getSortIndicator("id")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("firstName")}>
            First Name{getSortIndicator("firstName")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("lastName")}>
            Last Name{getSortIndicator("lastName")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("email")}>
            Email{getSortIndicator("email")}
          </th>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("department")}>
            Department{getSortIndicator("department")}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{user.id}</td>
              <td>{user.firstName || user.name?.split(" ")[0]}</td>
              <td>{user.lastName || user.name?.split(" ")[1]}</td>
              <td>{user.email}</td>
              <td>{user.department || "N/A"}</td>
              <td>
                <button onClick={() => onEdit(user)} style={{ marginRight: 8 }}>
                  Edit
                </button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", padding: 10 }}>
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserList;
