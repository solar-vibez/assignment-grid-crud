## Assumptions made
1. It's unclear how to define columns initial width from definitions, so I decided to leave current `flex: 1` approach, so all columns have the even width.
2. For filters, I've used `filterType` from `ColDefMeta` type to set in-built filters for `text/number/enum` fields.

## Additional library used
1. `jotai` as state manager. It allows state management and sharing with less code that `Redux`, while providing same features. It's used for sharing current selection and data between components
2. `Tailwind CSS` to replace `style`-based approach with classes (personal choice, not a fan of inline styling in most cases). Also provides controllable spacing, gaps, margins etc.
3. `Ant Design Icons` as icon library where needed.
4. 

## Challenges faced

- The complexity of AG Grid library is difficult to comprehend fully sometimes.
