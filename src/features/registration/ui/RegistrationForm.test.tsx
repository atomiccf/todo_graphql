import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm';

const mockCreateUser = vi.fn().mockResolvedValue({
    data: {
        createUser: { accessToken: 'mock-token' }
    }
})

vi.mock('features/registration/model/useRegister', () => ({
    useRegister: () => [mockCreateUser]
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe('RegistrationForm', () => {
    it('renders all inputs and submit button', () => {
        render(<RegistrationForm />, { wrapper: Wrapper });

        expect(screen.getByPlaceholderText(/Enter First Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Last Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Confirm Password/i)).toBeInTheDocument();
        expect(screen.getByRole('checkbox', { name: /terms/i})).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('shows validation errors when submitting empty form', async () => {
        render(<RegistrationForm />, { wrapper: Wrapper });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
            expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
            expect(screen.getAllByText(/Password is required/i).length).toBeGreaterThanOrEqual(1);
            expect(screen.getByText(/Agreement is required/i)).toBeInTheDocument();
        });
    });

    it('shows email format error for invalid email', async () => {
        render(<RegistrationForm />, { wrapper: Wrapper });

        fireEvent.input(screen.getByPlaceholderText(/Enter Email/i), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        await waitFor(() => {
            expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
        });
    });

    it('submits form with valid data and calls createUser', async () => {
        render(<RegistrationForm />, { wrapper: Wrapper })


        fireEvent.input(screen.getByPlaceholderText(/Enter First Name/i), {
            target: { value: 'John' }
        })
        fireEvent.input(screen.getByPlaceholderText(/Enter Last Name/i), {
            target: { value: 'Doe' }
        })
        fireEvent.input(screen.getByPlaceholderText(/Enter Username/i), {
            target: { value: 'johndoe' }
        })
        fireEvent.input(screen.getByPlaceholderText(/Enter Email/i), {
            target: { value: 'john@example.com' }
        })
        fireEvent.input(screen.getByPlaceholderText(/^Enter Password$/i), {
            target: { value: 'Password1!' }
        })
        fireEvent.input(screen.getByPlaceholderText(/Confirm Password/i), {
            target: { value: 'Password1!' }
        })


        fireEvent.click(screen.getByRole('checkbox', { name: /terms/i }))


        fireEvent.click(screen.getByRole('button', { name: /register/i }))


        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledTimes(1)
            expect(mockCreateUser).toHaveBeenCalledWith(
                expect.objectContaining({
                    variables: {
                        userInput: {
                            first_name: 'John',
                            last_name: 'Doe',
                            username: 'johndoe',
                            email: 'john@example.com',
                            password: 'Password1!',
                            terms: true
                        }
                    }
                })
            )
        })
    })
});
