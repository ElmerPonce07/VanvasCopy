import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Register from '../src/Register';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
  });

  test('renders input and register button', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByPlaceholderText(/enter your first name/i);
    const lastNameInput = screen.getByPlaceholderText(/enter your last name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm your password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

<<<<<<< Updated upstream
  test('navigates to login page after registering', async () => {
=======
  test('submit registration form and navigate to login', async () => {
>>>>>>> Stashed changes
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
    const firstNameInput = screen.getByPlaceholderText(/enter your first name/i);
    const lastNameInput = screen.getByPlaceholderText(/enter your last name/i);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const confirmPasswordInput = screen.getByPlaceholderText(/confirm your password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } });
<<<<<<< Updated upstream

    await act(async () => {
      fireEvent.click(registerButton);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/students/register',
      expect.anything()
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
=======
  
    await act(async () => {
      fireEvent.click(registerButton);
    });
  
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/students/register',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'John',
          lastName: 'Doe',
          studentEmail: 'john.doe@gmail.com',
          studentPassword: 'password',
          isAdmin: false,
        }),
      })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
>>>>>>> Stashed changes
