export function validateUserInput({ firstName, lastName, email, department }) {
  const errors = {};

  if (!firstName || firstName.trim() === "") {
    errors.firstName = "First name is required";
  }

  if (!lastName || lastName.trim() === "") {
    errors.lastName = "Last name is required";
  }

  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email format is invalid";
  }

  if (!department || department.trim() === "") {
    errors.department = "Department is required";
  }

  return errors;
}
