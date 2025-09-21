import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (err) {
    throw new Error("Error fetching users");
  }
}

export async function addUser(user) {
  try {
    const response = await axios.post(BASE_URL, user);
    return response.data;
  } catch (err) {
    throw new Error("Error adding user");
  }
}

export async function updateUser(id, user) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, user);
    return response.data;
  } catch (err) {
    throw new Error("Error updating user");
  }
}

export async function deleteUser(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (err) {
    throw new Error("Error deleting user");
  }
}
