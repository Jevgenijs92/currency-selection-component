import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectedItem from './SelectedItem';

const mockItem = { id: 'EUR', label: 'EUR', selected: true };

describe('SelectedItem Component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<SelectedItem item={mockItem}
                                                            isSelected
                                                            selectionChange={() => {}}/>);

    expect(getByTestId('selected-item-EUR')).toBeInTheDocument();
    expect(getByText('EUR')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('selected-item-close-button-EUR')).toBeInTheDocument()
      .toBeVisible();
  });

  it('calls selection change on button click', () => {
    const removeItemMock = jest.fn();
    const { getByTestId } = render(<SelectedItem item={mockItem}
                                                 isSelected
                                                 selectionChange={removeItemMock}/>);

    const closeButton = getByTestId('selected-item-EUR')
      .querySelector('.selected-item__close-button');

    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(removeItemMock).toHaveBeenCalledWith(false);
  });
});
