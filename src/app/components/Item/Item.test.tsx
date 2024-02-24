import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Item from './Item';
import { ItemModel } from '@/app/models/models';

const mockItem: ItemModel = { id: 'EUR', label: 'EUR' };

describe('Item Component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<Item item={mockItem}
                                                    selectionChange={() => {}}/>);

    expect(getByTestId('item-EUR')).toBeInTheDocument().not
      .toHaveClass('selected');
    expect(getByText('EUR')).toBeInTheDocument();
    expect(getByTestId('item-selected-icon-EUR')).not.toBeVisible();
  });

  it('renders with selected class when selected', () => {
    const { getByTestId } = render(<Item item={mockItem} isSelected
                                         selectionChange={() => {}}/>);

    expect(getByTestId('item-EUR')).toHaveClass('selected');
    expect(getByTestId('item-selected-icon-EUR')).toBeVisible();
  });

  it('calls selectionChange on button click', () => {
    const selectionChangeMock = jest.fn();
    const { getByTestId } = render(<Item item={mockItem}
                                         selectionChange={selectionChangeMock}/>);

    const button = getByTestId('item-EUR');
    fireEvent.click(button);

    expect(selectionChangeMock).toHaveBeenCalledWith(true);
  });

  it('updates selection when item prop changes', () => {
    const { getByTestId, rerender, getByText } = render(<Item item={mockItem}
                                                              selectionChange={() => {}}/>);

    expect(getByTestId('item-EUR')).not.toHaveClass('selected');
    expect(getByTestId('item-selected-icon-EUR')).not.toBeVisible();
    expect(getByText('EUR')).toBeVisible();

    rerender(<Item item={mockItem} isSelected selectionChange={() => {}}/>);

    expect(getByTestId('item-EUR')).toHaveClass('selected');
    expect(getByTestId('item-selected-icon-EUR')).toBeVisible();
    expect(getByText('EUR')).toBeVisible();
  });
});
