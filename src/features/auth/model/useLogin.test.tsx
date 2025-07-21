import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useLogin } from './useLogin';
import { USER_LOGIN } from '../api/loginUser';
import { GraphQLError } from 'graphql';

const loginMock = {
    request: {
        query: USER_LOGIN,
        variables: { email: 'test@example.com', password: 'password123' },
    },
    result: {
        data: {
            loginUser: {
                accessToken: 'mocked-token'
            },
        },
    },
};

const errorMock = {
    request: {
        query: USER_LOGIN,
        variables: { email: 'wrong@example.com', password: 'wrongpass' },
    },
    result: {
        errors: [new GraphQLError('Invalid credentials')],
    },
};

describe('useLogin', () => {
    it('performs login and returns data', async () => {
        const wrapper = ({ children }: any) => (
            <MockedProvider mocks={[loginMock]} addTypename={false}>
            {children}
            </MockedProvider>
    );

        const { result } = renderHook(() => useLogin(), { wrapper });

        await act(async () => {
            const [login] = result.current;
            const response = await login({
                variables: { email: 'test@example.com', password: 'password123' },
            });
            expect(response.data?.loginUser?.accessToken).toBe('mocked-token');
        });
    });

    it('returns an error for invalid credentials', async () => {
        const wrapper = ({ children }: any) => (
            <MockedProvider mocks={[errorMock]} addTypename={false}>
            {children}
            </MockedProvider>
    );

        const { result } = renderHook(() => useLogin(), { wrapper });

        await act(async () => {
            const [login] = result.current;
            try {
                await login({
                    variables: { email: 'wrong@example.com', password: 'wrongpass' },
                });
            } catch (error: any) {
                expect(error.message).toBe('Invalid credentials');
            }
        });
    });
});
