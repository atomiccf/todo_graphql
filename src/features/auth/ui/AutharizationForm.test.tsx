import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';


const mockLoginUser = vi.fn();
const mockNavigate = vi.fn();

vi.mock('features/authByGoogle/ui/GoogleLoginButton', () => ({ GoogleLoginButton: () => <div /> }));

vi.mock('features/auth/model/useLogin', () => ({
    useLogin: () => [mockLoginUser],
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});
const renderWithRouter = () =>
    render(
        <MemoryRouter>
            <AuthorizationForm />
        </MemoryRouter>
    );


import { AuthorizationForm } from 'features/auth';
import {MemoryRouter} from "react-router-dom";

describe('AuthorizationForm', () => {
    beforeEach(() => {
        mockLoginUser.mockReset();
        mockNavigate.mockReset();
        vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders form fields and submit button', () => {
        renderWithRouter();

        expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        renderWithRouter();

        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByText(/username is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });

        expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it('calls loginUser, stores token, and navigates on successful login', async () => {
        const fakeToken = 'fake-jwt-token';
        mockLoginUser.mockResolvedValue({ data: { loginUser: { accessToken: fakeToken } } });

        renderWithRouter();

        fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'user123' } });
        fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'Passw0rd!' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(mockLoginUser).toHaveBeenCalledWith({
                variables: {
                    loginInput: {
                        username: 'user123',
                        password: 'Passw0rd!',
                    },
                },
            });
            expect(localStorage.setItem).toHaveBeenCalledWith('jwt', fakeToken);
            expect(mockNavigate).toHaveBeenCalledWith('app/dashboard');
        });
    });

    it('logs error when loginUser throws', async () => {
        const error = new Error('Network error');
        mockLoginUser.mockRejectedValue(error);

        renderWithRouter();
        fireEvent.change(screen.getByPlaceholderText(/enter username/i), { target: { value: 'user123' } });
        fireEvent.change(screen.getByPlaceholderText(/enter password/i), { target: { value: 'Passw0rd!' } });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith('Error during login:', error);
        });
    });
});
