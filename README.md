Description

This project is a simple User Management Dashboard built with React. It demonstrates CRUD (Create, Read, Update, Delete) operations using a mock API (JSONPlaceholder) and includes features such as pagination, filtering, sorting, client-side validation, and responsive design. The primary focus is on functionality with a clean, human-approachable codebase.

Features
1. View user list with details: ID, First Name, Last Name, Email, Department
2. Add new users with validation
3. Edit existing user details
4. Delete users with confirmation
5. Pagination with page size options: 10, 25, 50, 100
6. Filter users by first name, last name, email, department
7. Client-side validation with descriptive error messages
8. Error handling for API failures
9. Responsive UI for different screen sizes

Setup & Run Instructions

1. Clone the repository

    git clone [repo-url]

    cd user-management-dashboard

2. Install dependencies

    npm install

3. Start the development server

    npm start (This will launch the app in your browser at http://localhost:3000)

4. Run tests

    npm test  (This project uses React Testing Library and Jest via Create React App. Test configurations are managed internally for convenience)

Project Structure

/src

      /components          (Reusable UI components like UserList, UserForm, Pagination, FilterPopup)

      /services            (API service functions in userService.js)

      /utils               (Utility functions like validation.js)

      App.js               (It is the Main application logic including state and handlers)

      index.js             (It is the React entry point)

      /tests               (Unit tests for components)


Dependencies

This project was bootstrapped with React App and uses the following dependencies:

    React ^19.1.1

    React-DOM ^19.1.1

    React Scripts ^5.0.1

    Axios ^1.12.2 (for API calls)

    React Testing Library ^16.3.0 (for unit tests)

    Jest (bundled with CRA for testing)

All dependencies are managed via package.json. Run npm install to install them.

Challenges Faced

1. Simulating the full CRUD behavior with JSONPlaceholder which does not persist data changed through POST/PUT/DELETE requests.
2. Parsing user name data into first and last names, as the API returns a single 'name' string.
3. Handling pagination and filtering efficiently on the client side with limited API capabilities.
4. Implementing proper form validation and user feedback for error states.

Future Improvements

1. Replace mock API with a real backend to persist changes.
2. Add infinite scrolling as an alternative pagination option.
3. Enhance UI with better styling and animations.
4. Expand unit test coverage for all components and API calls.
5. Introduce context or state management libraries (e.g., Redux) for larger scale state handling.
6. Add search and advanced sorting options on all user properties.


Contact
Author: Sai Prudhvi Raj
Email: prudhviperuri@gmail.com
GitHub: https://github.com/prudhviraj123256
