import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList from "../components/UserList";

const sampleUsers = [
  {
    id: 1,
    firstName: "Ramesh",
    lastName: "Kumar",
    email: "ramesh@example.com",
    department: "Sales",
  },
  {
    id: 2,
    firstName: "Akhil",
    lastName: "Reddy",
    email: "akhil@example.com",
    department: "Marketing",
  },
];

describe("UserList Component", () => {
  it("renders user details", () => {
    render(
      <UserList
        users={sampleUsers}
        onEdit={() => {}}
        onDelete={() => {}}
        pageSize={10}
        currentPage={1}
        sortConfig={{ key: null, direction: null }}
        onSort={() => {}}
      />
    );

    expect(screen.getByText("Ramesh")).toBeInTheDocument();
    expect(screen.getByText("Kumar")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();

    expect(screen.getByText("Akhil")).toBeInTheDocument();
    expect(screen.getByText("Reddy")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", () => {
    const mockEdit = jest.fn();

    render(
      <UserList
        users={sampleUsers}
        onEdit={mockEdit}
        onDelete={() => {}}
        pageSize={10}
        currentPage={1}
        sortConfig={{ key: null, direction: null }}
        onSort={() => {}}
      />
    );

    fireEvent.click(screen.getAllByText("Edit")[0]);
    expect(mockEdit).toHaveBeenCalledWith(sampleUsers[0]);
  });

  it("calls onDelete when Delete button is clicked", () => {
    const mockDelete = jest.fn();

    render(
      <UserList
        users={sampleUsers}
        onEdit={() => {}}
        onDelete={mockDelete}
        pageSize={10}
        currentPage={1}
        sortConfig={{ key: null, direction: null }}
        onSort={() => {}}
      />
    );

    fireEvent.click(screen.getAllByText("Delete")[1]);
    expect(mockDelete).toHaveBeenCalledWith(sampleUsers[1].id);
  });
});
