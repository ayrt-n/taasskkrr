import React from 'react';
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import SidebarItem from '../SidebarItem';

describe('SidebarItem component', () => {
  it('correctly renders sidebar item', () => {
    const { container } = render(
      <SidebarItem icon='icon.jpg' title='Sidebar Item' action='/sidebar-action' />,
      {wrapper: MemoryRouter}
    );

    expect(container).toMatchSnapshot();
  });

  it('correctly renders sidebar sub-item', () => {
    const { container } = render(
      <SidebarItem icon='icon.jpg' title='Sidebar Sub-Item' action='/sidebar-action' subItem={true} />,
      {wrapper: MemoryRouter}
    );

    expect(container).toMatchSnapshot();
  });
});