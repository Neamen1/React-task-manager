import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskFormModal from '../components/TaskFormModal';

describe('TaskFormModal', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  test('renders the TaskFormModal component', () => {
    render(<TaskFormModal onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('progress')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByText('Clear Form')).toBeInTheDocument();
  });

  test('handles form submission', () => {
    render(<TaskFormModal onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByPlaceholderText('progress'), { target: { value: 50 } });
    fireEvent.change(screen.getByTestId('select-option'), { target: { value: 'in progress' } });

    fireEvent.click(screen.getByText('Add Task'));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Task',
      description: 'Test Description',
      status: 'in progress',
      progress: '50',
    });
  });

  test('resets the form fields when Clear Form button is clicked', () => {
    render(<TaskFormModal onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByPlaceholderText('progress'), { target: { value: 50 } });

    fireEvent.click(screen.getByText('Clear Form'));

    expect(screen.getByPlaceholderText('Title').value).toBe('');
    expect(screen.getByPlaceholderText('Description').value).toBe('');
    expect(screen.getByTestId('select-option')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('progress').value).toBe('0');
  });

  test('prevents non-numeric input for progress field', () => {
    render(<TaskFormModal onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('progress'), { target: { value: 'abc' } });

    expect(screen.getByPlaceholderText('progress').value).toBe('0');
  });
});
