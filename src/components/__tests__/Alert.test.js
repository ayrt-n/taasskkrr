import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Alert from '../Alert';

describe('Alert component', () => {
  it('takes a type and renders an Alert of that class', () => {
    render(<Alert type="danger" />);
    const alertDiv = screen.getByTestId('alert');
    expect(alertDiv).toHaveClass('danger');
  });

  it('renders the correct message when supplied', () => {
    render(<Alert message="Test message" />);
    const alertMessage = screen.getByTestId('alert-message');
    expect(alertMessage).toHaveTextContent('Test message');
  });

  it('renders the correct body when supplied', () => {
    render(<Alert body="More details on the alert" />);
    const alertBody = screen.getByTestId('alert-body');
    expect(alertBody).toHaveTextContent('More details on the alert');
  });

  it('renders a list of the details when supplied', () => {
    const details = ['Details', 'Another details', 'More details'];

    render(<Alert details={details} />);
    const alertDetails = screen.queryAllByTestId('alert-detail');

    expect(alertDetails).toHaveLength(3);
    expect(alertDetails[0]).toHaveTextContent(details[0]);
    expect(alertDetails[1]).toHaveTextContent(details[1]);
    expect(alertDetails[2]).toHaveTextContent(details[2]);
  });

  it('does not render body or details when not supplied', () => {
    render(<Alert message="Test message" />);

    const alertBody = screen.queryByTestId('alert-body');
    const alertDetails = screen.queryAllByTestId('alert-details');

    expect(alertBody).toBeNull();
    expect(alertDetails).toHaveLength(0);
  });
});
