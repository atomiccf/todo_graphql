import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { CREATE_USER } from '../api/registerUser';
import { useRegister } from '../model/useRegister';
import { GraphQLError } from "graphql/index";


const validMock = [
    {
        request: {
            query: CREATE_USER,
            variables: { userInput:
            {
                username: 'test',
                password: 'test',
                first_name: 'test',
                last_name: 'test',
                terms: true,
            }
            },
        },
        result: {
            data: {
                createUser: {
                    accessToken: 'mocked-token',
                },
            },
        },
    },
];

const errorMock = [
    {
        request: {
            query: CREATE_USER,
            variables: { userInput:
                    {
                        username: 'test',
                        password: 'test',
                        first_name: 'test',
                        last_name: '12345',
                        terms: false,
                    }
            },
        },
        result: {
            data: {
                createUser: {
                    accessToken: 'mocked-token',
                },
            },
        },
    },
];

describe('useRegister', () => {
    it('should register a user', async () => {
        const wrapper = ({ children }: any) => (
            <MockedProvider mocks={validMock} addTypename={false}>
            {children}
            </MockedProvider>
    );
        const {result} = renderHook(() => useRegister(), {wrapper});

        await act(async () => {
            const [register] = result.current;
            const response = await register({
                variables: {
                    userInput:
                        {
                            username: 'test',
                            password: 'test',
                            first_name: 'test',
                            last_name: 'test',
                            terms: true,
                        }
                },
            });
            expect(response.data?.createUser?.accessToken).toBe('mocked-token');
        });
    });

    it('should handle invalid credentials', async () => {
        const wrapper = ({ children }: any) => (
            <MockedProvider mocks={errorMock} addTypename={false}>
                {children}
            </MockedProvider>
        );
        const {result} = renderHook(() => useRegister(), {wrapper});

        await act(async () => {
            const [register] = result.current;
            try {
                await register({
                    variables: {
                        userInput:
                            {
                                username: 'test',
                                password: 'test',
                                first_name: 'test',
                                last_name: '12345',
                                terms: false,
                            }
                    },
                });
            } catch (error: any) {
                expect(error.message).toContain('Invalid credentials');
            }
        });
    });
})
