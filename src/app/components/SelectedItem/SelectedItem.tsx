import { ItemModel, ItemProps } from '@/app/models/models';
import './SelectedItem.scss';

export default function SelectedItem<T extends ItemModel>({
                                                            item,
                                                            selectionChange
                                                          }: ItemProps<T>) {
  return (
    <div className="selected-item" data-testid={`selected-item-${item.id}`} role="listitem">
      <span className="selected-item__label">{item.label}</span>
      <button className="selected-item__close-button"
              onClick={() => selectionChange(false)}
              aria-label={`Remove ${item.label}`}
              data-testid={`selected-item-close-button-${item.id}`}>X
      </button>
    </div>
  );
}