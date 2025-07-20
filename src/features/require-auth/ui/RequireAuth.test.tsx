import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RequireAuth } from './RequireAuth';
import { REFRESH_TOKEN } from '../model/graphql';


vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));


const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Import the mocked function
import { jwtDecode } from 'jwt-decode';
const mockJwtDecode = vi.mocked(jwtDecode);

describe('RequireAuth', () => {
    let mockGetItem: any;

    beforeEach(() => {
        mockNavigate.mockClear();
        mockJwtDecode.mockClear();
        mockGetItem = vi.spyOn(Storage.prototype, 'getItem');
        localStorage.clear();
    });

    afterEach(() => {
        mockGetItem?.mockRestore();
        localStorage.clear();
    });

    const renderWithProviders = (mocks: any[] = [], token?: string) => {
        if (token) {
            localStorage.setItem('jwt', token);
        }

        return render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter>
                    <RequireAuth>
                        <div>Protected Content</div>
                    </RequireAuth>
                </MemoryRouter>
            </MockedProvider>
        );
    };

    it('redirects if no token found', async () => {
        mockGetItem.mockReturnValue(null);

        renderWithProviders();

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('redirects if token is invalid or cannot be decoded', async () => {
        mockJwtDecode.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        renderWithProviders([], 'invalid-token');

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('calls refreshToken if token is expired', async () => {
        const expiredTime = Math.floor(Date.now() / 1000) - 100;

        mockJwtDecode.mockReturnValue({ exp: expiredTime });

        const mocks = [
            {
                request: {
                    query: REFRESH_TOKEN,
                },
                result: {
                    data: {
                        refreshToken: {
                            token: 'new-access-token',
                        },
                    },
                },
            },
        ];

        renderWithProviders(mocks, 'expired-token');


        await waitFor(() => {
            expect(screen.getByText('Protected Content')).toBeInTheDocument();
        }, { timeout: 3000 });


        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('navigates to home if refresh token fails', async () => {
        const expiredTime = Math.floor(Date.now() / 1000) - 100;

        mockJwtDecode.mockReturnValue({ exp: expiredTime });

        const mocks = [
            {
                request: {
                    query: REFRESH_TOKEN,
                },
                error: new Error('Refresh failed'),
            },
        ];

        renderWithProviders(mocks, 'expired-token');

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('does nothing if token is valid (not expired)', async () => {
        const futureTime = Math.floor(Date.now() / 1000) + 10000;
        const validToken = 'valid-jwt-token';

        mockJwtDecode.mockReturnValue({ exp: futureTime });

        renderWithProviders([], validToken);

        await waitFor(() => {
            expect(screen.getByText('Protected Content')).toBeInTheDocument();
        });

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
