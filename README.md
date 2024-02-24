# ItemSelection Component Documentation
## Overview
The ItemSelection component is a React component designed to facilitate the selection of items from a list. It provides a user interface for choosing items from a pool of available options. This component is particularly useful in scenarios where users need to select multiple items from a list.

## Usage
To use the ItemSelection component, follow these steps:

- Import the ItemSelection component into your project.
```
import ItemSelection from 'path/to/ItemSelection';
```
- Include the ItemSelection component in your JSX/HTML markup.
```
<ItemSelection
items={yourArrayOfItems}
preSelectedItemIds={yourArrayOfPreselectedItemIds}
selectionChange={handleSelectionChange}
/>
```

## Props

#### items - An array of available items that the user can choose from.
Type: Array of type `T` which extends ItemModel interface:
```
interface ItemModel { 
    id: string | number; 
    label: string; 
}
```
Description: An array of items that the user can choose from.

#### preSelectedItemIds
Type: (string | number)[] (array of item IDs)
Default: []
Description: An array containing the IDs of items that should be preselected when the component is rendered.

#### selectionChange
Type: (items: T[]) => void (callback function)
Default: (items) => {}
Description: A callback function that is triggered whenever the selection of items changes. It receives an array of currently selected items as an argument.

```
import ItemSelection from 'path/to/ItemSelection';

function YourComponent() {
  const handleSelectionChange = (selectedItems) => {
    // Add your logic for handling the selection change
  };

  return (
    <ItemSelection
      items={yourArrayOfItems}
      preSelectedItemIds={yourArrayOfPreselectedItemIds}
      selectionChange={handleSelectionChange}
    />
  );
}

```

## Notes

- Ensure that the items array and the preSelectedItemIds array are properly populated with the required data.
- This component utilizes React hooks (useState and useMemo) for managing state and optimizing performance.
