export interface ItemModel {
  id: string | number;
  label: string;
}

export type ItemProps<T extends ItemModel> = {
  item: T;
  isSelected?: boolean;
  selectionChange: (selected: boolean) => void;
}

export type ItemSelectionProps<T extends ItemModel> = {
  items?: T[];
  preSelectedItemIds?: (string | number)[];
  selectionChange?: (selected: T[]) => void;
}

export interface Currency extends ItemModel {
  symbol: string;
  numericCode: number;
  // other props
}