import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { act } from "react";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  put: jest.fn(() => Promise.resolve({ data: {} })),
  delete: jest.fn(() => Promise.resolve()),
}));

test("renders the User Management Dashboard heading", async () => {
  await act(async () => {
    render(<App />);
  });

  await waitFor(() => {
    expect(
      screen.getByText(/User Management Dashboard/i)
    ).toBeInTheDocument();
  });
});
