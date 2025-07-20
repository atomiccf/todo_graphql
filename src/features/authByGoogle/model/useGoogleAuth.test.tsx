import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useGoogleAuth } from '../model/useGoogleAuth';
import { GOOGLE_AUTH } from '../api/googleAuth';
import { GraphQLError } from "graphql/index";

const googleAuthMock = [
    {
        request: {
            query: GOOGLE_AUTH,
            variables: { idToken: 'mocked-google-token' },
        },
        result: {
            data: {
                googleAuth: {
                    accessToken: 'mocked-token',
                },
            },
        },
    },
];

const errorMock = {
    request: {
        query: GOOGLE_AUTH,
        variables: { idToken: 'invalid-token' },
    },
    result: {
        errors: [new GraphQLError('Invalid credentials')],
    },
};

describe('GoogleAuth', () => {
    it('performs google auth and returns token', async () => {
        const wrapper = ({ children }: any) => (
            <MockedProvider mocks={googleAuthMock} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(() => useGoogleAuth(), { wrapper });

        await act(async () => {
            const [googleLogin] = result.current;
            const response = await googleLogin({
                variables: { idToken: 'mocked-google-token' },
            });
            expect(response.data?.googleAuth?.accessToken).toBe('mocked-token');
        });
    });

    it('returns an error for invalid credentials', async () => {
        const wrapper = ({ children }: any) => (
            <MockedProvider mocks={[errorMock]} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(() => useGoogleAuth(), { wrapper });

        await act(async () => {
            const [googleLogin] = result.current;

            try {
                await googleLogin({
                    variables: { idToken: 'invalid-token' },
                });
                throw new Error('Expected error was not thrown');
            } catch (error: any) {
                expect(error.message).toContain('Invalid credentials');
            }
        });
    });

});
