import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import TaskListComponent from '../components/TaskListComponent';

// Mock TaskComponent since it's imported and used within TaskListComponent
jest.mock('../components/TaskComponent', () => ({ task }) => <div>{task.name}</div>);

// Mock axios
jest.mock('axios');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

test('renders TaskListComponent with tasks', async () => {
  const mockTasks = [
    { id: 1, name: 'Task 1', status: 'draft' },
    { id: 2, name: 'Task 2', status: 'in progress' },
    { id: 3, name: 'Task 3', status: 'done' },
  ];

  axios.get.mockResolvedValue({ data: mockTasks });

  render(<TaskListComponent />);

  // Check if columns are rendered
  expect(screen.getByText('draft')).toBeInTheDocument();
  expect(screen.getByText('in progress')).toBeInTheDocument();
  expect(screen.getByText('done')).toBeInTheDocument();

  // Wait for tasks to be fetched and rendered
  await waitFor(() => {
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });
});

test('displays error message on API failure', async () => {
  axios.get.mockRejectedValue(new Error('Network Error'));

  render(<TaskListComponent />);

  // Check if columns are rendered
  expect(screen.getByText('draft')).toBeInTheDocument();
  expect(screen.getByText('in progress')).toBeInTheDocument();
  expect(screen.getByText('done')).toBeInTheDocument();

  // Check console.error is called
  await waitFor(() => {
    expect(console.error).toHaveBeenCalledWith(
      'Error getting data from API:',
      expect.any(Error)
    );
  });
});
