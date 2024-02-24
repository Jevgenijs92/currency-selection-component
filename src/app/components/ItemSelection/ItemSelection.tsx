'use client';
import { useState, useMemo } from 'react';
import Item from '@/app/components/Item/Item';
import './ItemSelection.scss';
import { ItemModel, ItemSelectionProps } from '@/app/models/models';
import SelectedItem
  from '@/app/components/SelectedItem/SelectedItem';

function createItemMap<T extends ItemModel>(items: T[]): Record<string | number, T> {
  return items.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {} as Record<string | number, T>);
}

export default function ItemSelection<T extends ItemModel>({
                                                             items = [],
                                                             preSelectedItemIds = [],
                                                             selectionChange = () => {}
                                                           }: ItemSelectionProps<T>) {

  const itemMap = useMemo(() => createItemMap(items), [items]);

  const [selectedItemIds, setSelectedItemIds] = useState<(string | number)[]>(
    preSelectedItemIds);

  const selectedItems = useMemo(
    () => selectedItemIds.map((id) => itemMap[id]).filter(Boolean) as T[],
    [selectedItemIds, itemMap]
  );

  const handleSelectionChange = (itemId: string | number,
                                 selected: boolean) => {

    const newSelectedIds = selected
      ? [...selectedItemIds, itemId]
      : selectedItemIds.filter((id) => id !== itemId);

    setSelectedItemIds(newSelectedIds);
    const newSelectedItems = newSelectedIds.map((id) => itemMap[id])
      .filter(Boolean) as T[];
    selectionChange(newSelectedItems);
  };

  return (
    <div className="item-selection" role="group" aria-label="Item Selection">
      <div className="item-selection__group" role="region" aria-live="polite">
        {selectedItems.map((item) =>
          <SelectedItem key={item.id}
                        item={item}
                        selectionChange={() => handleSelectionChange(item.id,
                          false)}
                        isSelected/>
        )}
      </div>
      <div className="item-selection__group" role="region" aria-live="polite">
        {items.map((item) =>
          <Item key={item.id}
                item={item}
                isSelected={selectedItemIds.includes(item.id)}
                selectionChange={(selected) => handleSelectionChange(item.id,
                  selected)}/>
        )}
      </div>
    </div>
  );
}