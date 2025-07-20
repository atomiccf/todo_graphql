import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';


const mockedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate,
}));

vi.mock('@react-oauth/google', () => ({
    GoogleLogin: (props: any) => (
        <>
            <button
                data-testid="success-btn"
                onClick={() => {
                    props.onSuccess?.({ credential: 'mocked_token' });
                }}
            >
                Google Login Success Mock
            </button>
            <button
                data-testid="error-btn"
                onClick={() => {
                    props.onError?.();
                }}
            >
                Google Login Error Mock
            </button>
        </>
    ),
}));


const mockGoogleAuthFn = vi.fn();

vi.mock('features/authByGoogle/model/useGoogleAuth', () => ({
    useGoogleAuth: () => [mockGoogleAuthFn],
}));
import { GoogleLoginButton } from './GoogleLoginButton';
describe('GoogleLoginButton', () => {
    beforeEach(() => {
        mockedNavigate.mockClear();
        mockGoogleAuthFn.mockClear();
        localStorage.clear();
    });

    it('renders GoogleLogin button', () => {
        render(<GoogleLoginButton />);
        expect(screen.getByText('Google Login Success Mock')).toBeInTheDocument();
    });

    it('successful login stores token and navigates', async () => {
        mockGoogleAuthFn.mockResolvedValue({
            data: {
                googleAuth: {
                    accessToken: 'fake_jwt_token',
                },
            },
        });

        render(<GoogleLoginButton />);
        fireEvent.click(screen.getByText('Google Login Success Mock'));

        await waitFor(() => {
            expect(mockGoogleAuthFn).toHaveBeenCalledWith({
                variables: {
                    googleAuthInput: {
                        idToken: 'mocked_token',
                    },
                },
            });
        });

        await waitFor(() => {
            expect(localStorage.getItem('jwt')).toBe('fake_jwt_token');
            expect(mockedNavigate).toHaveBeenCalledWith('/app/dashboard');
        });
    });

    it('login without token logs error', async () => {
        mockGoogleAuthFn.mockResolvedValue({
            data: {
                googleAuth: {
                    accessToken: null,
                },
            },
        });

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<GoogleLoginButton />);
        fireEvent.click(screen.getByText('Google Login Error Mock'));

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Login Failed');
        });

        consoleErrorSpy.mockRestore();
    });

    it('handles google auth error', async () => {
        mockGoogleAuthFn.mockRejectedValue(new Error('Network error'));

        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<GoogleLoginButton />);
        fireEvent.click(screen.getByText('Google Login Error Mock'));

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Login Failed');
        });

        consoleErrorSpy.mockRestore();
    });

    it('calls onError callback on login failure', () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        render(<GoogleLoginButton />);

        fireEvent.click(screen.getByText('Google Login Error Mock'));

        expect(consoleErrorSpy).toHaveBeenCalledWith('Login Failed');

        consoleErrorSpy.mockRestore();
    });
});
