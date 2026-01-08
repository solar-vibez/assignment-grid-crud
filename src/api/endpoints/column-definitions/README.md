## Column Definitions

### What are Column Definitions?

Column definitions are used to define which columns are displayed in a data grid, and how those columns behave.

- Columns may contain different types of data:
  - <i>E.g., text, numbers, dates, boolean values, complex objects.</i>
- Depending on the type of data, we may want different behavior for cells in that column:
  - <i>E.g., different cell renderers, different cell editors.</i>
- Various (server-side) factors may also affect column behavior:
  - <i>E.g., user permissions, user preferences, application state.</i>
- Based on this we may want to define properties such as:
  - Whether a column is visible or hidden by default.
  - Whether cells in a column are editable or not.

### Column definitions are provided by the API

- Cleopatra Enterprise (which serves as our back-end) has complex logic and state that determines column definitions.
  - We do not want to duplicate this logic in the front-end application.
  - Instead, we want the back-end to provide the front-end with the appropriate column definitions.
  - An endpoint has been provided in this project to mock such server responses.
- This folder contains typings for the column definitions returned by the API endpoint.
  - The typings are also fully commented to explain the purpose of each property.
  - You will need to infer which properties can be used to implement the desired behavior.
  - When working on the assignment, it is recommended to refer back to these typings frequently.

### Defining Column Definitions in AG Grid

- AG Grid accepts a `columnDefs` property in its grid options to define column definitions.
  - Here, it's also possible to specify which cell renderers and cell editors to use for specific columns.
  - AG Grid provides a number of built-in cell renderers and cell editors, and also allows for custom components.
  - You will need to investigate which AG Grid options to leverage to implement the desired behavior.
- The column definitions returned by the API cannot be used directly in AG Grid.
  - You will need to map them to a functional AG Grid implementation.
  - You will need to specify which (custom) cell renderers or cell editors AG Grid should use.
  - Typically, the `context` in `ApiColDef` contains properties relevant to cell rendering and editing, while the other
    properties define general column behavior.
