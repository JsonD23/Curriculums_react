// __tests__/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../Login';
import axios from 'axios';
import Swal from 'sweetalert2';

// Mock axios and Swal
jest.mock('axios');
jest.mock('sweetalert2');

describe('Login Component', () => {
  test('renders login form and handles successful login', async () => {
    // Mock axios post request
    axios.post.mockResolvedValue({ data: { msg: 'Login successful' } });
    
    // Mock Swal
    Swal.fire = jest.fn().mockResolvedValue({});

    // Render component
    render(<Login />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'tester@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'tester' } });

    // Submit form
    fireEvent.click(screen.getByText(/login/i));

    // Wait for Swal to be called and navigate
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Éxito!',
        text: 'Login successful',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    });

    // Optionally, you could also check for the redirect
    // but this requires additional setup or libraries
  });

  test('shows error message on failed login', async () => {
    // Mock axios post request to fail
    axios.post.mockRejectedValue({
      response: { data: { detail: 'Invalid credentials' } }
    });

    // Mock Swal
    Swal.fire = jest.fn().mockResolvedValue({});

    // Render component
    render(<Login />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });

    // Submit form
    fireEvent.click(screen.getByText(/login/i));

    // Wait for Swal to be called with the error message
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith({
        title: 'Error!',
        text: 'Invalid credentials',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    });
  });
});
