import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Priority from '../Priority';

describe('Priority component', () => {
  describe('when given different priority enums', () => {
    it('correctly renders low priority', () => {
      const { container } = render(<Priority priorityEnum={0} />)
      expect(container).toMatchSnapshot();
    });

    it('correctly renders medium priority', () => {
      const { container } = render(<Priority priorityEnum={1} />)
      expect(container).toMatchSnapshot();
    });

    it('correctly renders high priority', () => {
      const { container } = render(<Priority priorityEnum={2} />)
      expect(container).toMatchSnapshot();
    });
  })
});
