# Assignment

This document outlines the requirements and guidelines for completing the assignment.

This boilerplate project has been provided to help you get started quickly.

<hr />

## Objective

Implement a component based on AG Grid with basic CRUD functionality.
Row data and desired column/cell behavior are dynamically provided via mock API endpoints.

<hr />

## Getting Started

1. Install Volta: https://docs.volta.sh/ (or manually ensure the correct Node version is used).
2. Install NPM dependencies: `npm install`
3. Start the development server: `npm start`
4. Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/)
5. Familiarize yourself with the code in `src` folder, especially the `README.md` files and comments
6. Familiarize yourself with the [AG Grid documentation](https://www.ag-grid.com/react-data-grid/)
7. Skim available [Ant Design Components](https://ant.design/components/overview/), use these for UI elements as needed

<hr />

## Submission

1. Ensure the project can be run successfully by following the instructions in the "Getting Started" section.
2. Ensure your code is committed to a Git repository, and provide a zip archive or link to the repository for review (don't include the contents of `node_modules`!).
3. Provide an accompanying document describing your approach, any assumptions made, challenged faced, and any areas where you would like to improve or expand the implementation given more time.

<hr />

## Requirements

<b>Notes:</b>

- Due to the scope of the assignment and complexity of the AG Grid library, it is expected that not all requirements will be fully met.
- The requirements are listed in order of priority. Work through the list from top to bottom as time allows.
- Requirements 1-4 are considered the most important, and should be prioritized.
- A screenshot of our application has been included to give you an indication: [View screenshot](src/assets/screenshot_reference.jpg)
- Don't worry about matching it exactly, focus on implementing the functionality described in the requirements.
- Focus on demonstrating your understanding of the concepts and your ability to implement key features.
- Ensure your code follows established conventions and best practices for code quality, and organization.
- You are free to make reasonable assumptions where necessary, document these in your accompanying document.
- You may use any additional libraries or tools as needed, but please document these choices and their purpose.

<hr />

### 1. Display grid data

1. In the `MainGrid` component, display row data fetched from the mock API.
2. In the `MainGrid` component, display columns based on column definitions fetched from the mock API.
3. Implement desired column behaviour (inferred from the column definitions) using AG Grid options.
4. Ensure cell content is displayed correctly based on the column definitions received from the API.

#### Recommended reading:

- `src/api/endpoints/column-definitions/README.md`
- [AG Grid Documentation - Column Definitions](https://www.ag-grid.com/react-data-grid/column-definitions/)
- [AG Grid API Reference - Grid Options - Column Definitions](https://www.ag-grid.com/react-data-grid/grid-options/#reference-columns)
- [AG Grid Documentation - Cell Content](https://www.ag-grid.com/react-data-grid/cell-content/)

<hr />

### 2. Implement cell editing

1. Implement cell editing functionality using AG Grid's built-in editors or custom editors as needed.
2. Use the column definitions received from the API to determine the desired cell editor behavior.
3. Implement a mock API call to update the row data when a cell is edited.

#### Recommended reading:

- [AG Grid Documentation - Cell Editing](https://www.ag-grid.com/react-data-grid/cell-editing/)
- [AG Grid Documentation - Provided Cell Editors](https://www.ag-grid.com/react-data-grid/provided-cell-editors/)

<hr />

### 3. Implement adding and deleting rows

1. Create a UI for adding and deleting rows.
2. This UI should not be part of the `MainGrid` component itself, but rather a separate component (e.g., a toolbar above the grid).
3. Newly created rows should be added to the bottom of the grid by default.
4. Deleting rows should be possible when one or more rows are selected.
5. Implement mock API calls to add and delete rows.

#### Recommended reading:

- [AG Grid Documentation - Client-Side Data - Transaction Updates](https://www.ag-grid.com/react-data-grid/data-update-transactions/)

<hr />

### 4. Implement detail panel

1. Implement a resizeable detail panel at the bottom of the screen (e.g., using an AntD `Splitter` component).
2. Inside the detail panel, create a simple UI to view and edit the description field of the currently selected row in the main grid.
3. If no rows or multiple rows are selected, instead show a message indicating that a single row must be selected.
4. Ensure the detail panel updates when the selection changes.
5. Ensure the detail panel updates when the row is edited or deleted in the main grid.

#### Recommended reading:

- [Ant Design - Components - Splitter](https://ant.design/components/splitter)
- [Ant Design - Components - Input](https://ant.design/components/input)
- [AG Grid API Reference - Selection Events](https://www.ag-grid.com/react-data-grid/row-selection-api-reference/#selection-events)

<hr />

### 5. Add additional fields to detail panel

1. In the detail panel, below the description field, add additional fields to view and edit.
2. Focus on fields that are also displayed in the main grid.

<hr />

### 6. Implement adding rows at specific positions

1. Modify the UI for adding rows to allow rows to be added below the currently selected row in the main grid, at the top of the grid, or at the bottom of the grid (default).

<hr />

### 7. Implement quick search

1. Implement a quick search input field above the main grid.
2. As the user types in the quick search input field, filter the rows in the main grid to only show rows that contain the search term in any of their fields.

<hr />

### 8. Handle deleting cell values

1. Handle deleting cell values in the main grid (e.g., when the user presses the Delete key while a cell is selected).
2. Use the column definitions received from the API to determine if a cell value can have an empty value.
3. Ensure that the cell has a valid value if the user tries to delete a value that cannot be empty.
