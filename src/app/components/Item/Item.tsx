import { ItemModel, ItemProps } from '@/app/models/models';
import './Item.scss';

export default function Item<T extends ItemModel>({
                                                    item,
                                                    isSelected = false,
                                                    selectionChange
                                                  }: ItemProps<T>) {

  const handleSelectionChange = (selected: boolean) => {
    selectionChange(selected);
  };

  return (
    <button type="button"
            className={`item ${isSelected ? 'selected' : ''}`}
            onClick={() => handleSelectionChange(!isSelected)}
            data-testid={`item-${item.id}`}
            role="checkbox"
            aria-checked={isSelected}>
      <div className="item__selected">
        <span className="item__selected__icon"
              hidden={!isSelected}
              aria-hidden={!isSelected}
              data-testid={`item-selected-icon-${item.id}`}>X</span>
      </div>
      <span className="item__label">{item.label}</span>
    </button>
  );
}