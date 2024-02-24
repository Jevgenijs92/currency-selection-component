import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemSelection from './ItemSelection';
import { ItemModel } from '@/app/models/models';

let itemsMock: ItemModel[] = [];

let preSelectedItemsMock: string[] = [];

describe('ItemSelection Component', () => {
  beforeEach(() => {
    itemsMock = [
      { id: 'USD', label: 'USD' },
      { id: 'EUR', label: 'EUR' },
      { id: 'GBP', label: 'GBP' },
      { id: 'JPY', label: 'JPY' },
      { id: 'AUD', label: 'AUD' },
      { id: 'CAD', label: 'CAD' },
      { id: 'CHF', label: 'CHF' },
      { id: 'CNY', label: 'CNY' },
      { id: 'SEK', label: 'SEK' },
    ];

    preSelectedItemsMock = ['EUR', 'CAD'];
  });

  it('renders correctly with selected items', () => {
    const { getByTestId } = render(
      <ItemSelection items={itemsMock} preSelectedItemIds={preSelectedItemsMock}
                     selectionChange={() => {}}/>
    );

    // All available items are rendered
    expect(getByTestId('item-USD')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-EUR')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-GBP')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-JPY')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-AUD')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-CAD')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-CHF')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-CNY')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('item-SEK')).toBeInTheDocument().toBeVisible();

    // Only selected items are rendered
    expect(getByTestId('selected-item-EUR')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('selected-item-CAD')).toBeInTheDocument().toBeVisible();

  });

  it('calls selectionChange when Item is clicked', () => {
    const selectionChangeMock = jest.fn();
    const { getByText, getByTestId, rerender } = render(
      <ItemSelection items={itemsMock} preSelectedItemIds={preSelectedItemsMock}
                     selectionChange={selectionChangeMock}/>
    );

    const itemElement = getByText('USD');
    fireEvent.click(itemElement);

    expect(selectionChangeMock)
      .toHaveBeenCalledWith([itemsMock[1], itemsMock[5], itemsMock[0]]);

    rerender(<ItemSelection items={itemsMock}
                            preSelectedItemIds={[
                              ...preSelectedItemsMock,
                              'USD'
                            ]}
                            selectionChange={selectionChangeMock}/>);

    // Only selected items are rendered as selected
    expect(getByTestId('selected-item-EUR')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('selected-item-CAD')).toBeInTheDocument().toBeVisible();
    expect(getByTestId('selected-item-USD')).toBeInTheDocument().toBeVisible();

    // Selected items in items list are also selected
    expect(getByTestId('item-EUR')).toHaveClass('selected');
    expect(getByTestId('item-CAD')).toHaveClass('selected');
    expect(getByTestId('item-USD')).toHaveClass('selected');
  });

  it('calls selection change when SelectedItem close button is clicked', () => {
    const selectionChangeMock = jest.fn();
    const { getByTestId } = render(
      <ItemSelection items={itemsMock} preSelectedItemIds={preSelectedItemsMock}
                     selectionChange={selectionChangeMock}/>
    );

    const closeButton = getByTestId('selected-item-close-button-EUR');
    fireEvent.click(closeButton);

    expect(selectionChangeMock).toHaveBeenCalledWith([itemsMock[5]]);
  });

  it('handles selectionChange when Item selection changes', () => {
    const selectionChangeMock = jest.fn();
    const { getByTestId } = render(
      <ItemSelection items={itemsMock} preSelectedItemIds={preSelectedItemsMock}
                     selectionChange={selectionChangeMock}/>
    );

    const itemElement = getByTestId('item-USD');
    fireEvent.click(itemElement);

    expect(selectionChangeMock)
      .toHaveBeenCalledWith([itemsMock[1], itemsMock[5], itemsMock[0]]);
  });
});
