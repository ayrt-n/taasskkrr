import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import SidebarCollapsableList from '../SidebarCollapsableList';

// Set up props
const title = 'Collapsable List'

describe('SidebarCollapsableList component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SidebarCollapsableList title={title}>
        <div>Test 1</div>
        <div>Test 2</div>
        <div>Test 3</div>
      </SidebarCollapsableList>
    );

    expect(container).toMatchSnapshot();
  });

  describe('on click', () => {
    it('adds collapsed class to collapsable list', () => {
      render(<SidebarCollapsableList title={title} />);
      const collapsableList = screen.getByTestId('collapsable-list');
      const collapsableListDiv = screen.getByTestId('collapse-list-div');

      expect(collapsableList.className).not.toContain('collapsed');
      userEvent.click(collapsableListDiv);
      expect(collapsableList.className).toContain('collapsed');
    });
  })
});