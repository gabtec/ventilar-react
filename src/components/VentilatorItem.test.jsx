import { describe, test, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import VentilatorItem from './VentilatorsItem';

const ventsByWard = {
  ventCategory: 'vi',
  ventsAvailable: 1,
  wardID: 4,
  park: {
    id: 4,
    name: 'HSA_Intensiva',
  },
};

describe('Accordion test', () => {
  test('Should show title', () => {
    // ARRANGE
    render(<VentilatorItem ventilator={ventsByWard} />);

    // ACT
    // await screen.findAllByRole('p');

    // ASSERT
    // expect(screen.getByRole('heading')).toHaveTextContent('hello there');
    expect(screen.getByRole('button')).toHaveTextContent('Requisitar');
  });
});
