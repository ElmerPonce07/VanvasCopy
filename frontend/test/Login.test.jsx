import React from 'react';
<<<<<<< Updated upstream
import { render, screen, fireEvent } from '@testing-library/react';
=======
import { render, screen, fireEvent} from '@testing-library/react';
>>>>>>> Stashed changes
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext';
import Login from '../src/Login';

jest.mock('../src/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Login Component', () => {
  const mockLoginAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({ loginAction: mockLoginAction });
  });

  test('render email, password and login button', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('call loginAction with the correct data', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'john.doe@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(mockLoginAction).toHaveBeenCalledWith({
      email: 'john.doe@gmail.com',
      password: 'password',
    });
  });
});