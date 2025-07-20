import React from 'react'
import {describe, it, expect, beforeEach, afterEach, vi} from 'vitest'
import {MockedProvider} from '@apollo/client/testing'
import {useMutation, ApolloError} from '@apollo/client'
import {renderHook, waitFor} from '@testing-library/react'
import {USER_LOGIN} from './loginUser'
import {OperationDefinitionNode} from "graphql/language";

interface TestWrapperProps {
    children: React.ReactNode
    mocks?: any
    addTypename?: boolean
}



const TestWrapper: React.FC<TestWrapperProps> = ({children, mocks = [], addTypename = false}) => (
    <MockedProvider mocks={mocks} addTypename={addTypename}>
        {children}
    </MockedProvider>
)

describe('USER_LOGIN mutation', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should have correct mutation structure', () => {
        const definition = USER_LOGIN.definitions[0] as OperationDefinitionNode
        expect(USER_LOGIN.kind).toBe('Document')
        expect(USER_LOGIN.definitions).toHaveLength(1)
        expect(definition.operation).toBe('mutation')
        expect(definition.name?.value).toBe('loginUser')
    })

    it('should execute successful login mutation', async () => {
        const mockLoginInput = {
            email: 'test@example.com',
            password: 'password123'
        }

        const mockResponse = {
            loginUser: {
                accessToken: 'mock-access-token-12345'
            }
        }

        const mocks = [
            {
                request: {
                    query: USER_LOGIN,
                    variables: {
                        loginInput: mockLoginInput
                    }
                },
                result: {
                    data: mockResponse
                }
            }
        ]

        const {result} = renderHook(
            () => useMutation(USER_LOGIN),
            {
                wrapper: ({children}) => (
                    <TestWrapper mocks={mocks}>{children}</TestWrapper>
                )
            }
        )

        const [loginUser] = result.current

        await waitFor(async () => {
            const response = await loginUser({
                variables: {
                    loginInput: mockLoginInput
                }
            })

            expect(response.data).toEqual(mockResponse)
            expect(response.data?.loginUser.accessToken).toBe('mock-access-token-12345')
        })
    })

    it('should handle network error', async () => {
        const mockLoginInput = {
            email: 'test@example.com',
            password: 'password123'
        }

        const mocks = [
            {
                request: {
                    query: USER_LOGIN,
                    variables: {
                        loginInput: mockLoginInput
                    }
                },
                error: new Error('Network error occurred')
            }
        ]

        const {result} = renderHook(
            () => useMutation(USER_LOGIN),
            {
                wrapper: ({children}) => (
                    <TestWrapper mocks={mocks}>{children}</TestWrapper>
                )
            }
        )

        const [loginUser] = result.current

        await waitFor(async () => {
            try {
                await loginUser({
                    variables: {
                        loginInput: mockLoginInput
                    }
                })
            } catch (error) {
                if (error instanceof Error) {
                    expect(error.message).toContain('Network error occurred')
                }
            }
        })
    })

    it('should handle GraphQL errors', async () => {
        const mockLoginInput = {
            email: 'invalid@example.com',
            password: 'wrongpassword'
        }

        const mocks = [
            {
                request: {
                    query: USER_LOGIN,
                    variables: {
                        loginInput: mockLoginInput
                    }
                },
                result: {
                    errors: [
                        {
                            message: 'Invalid credentials',
                            code: 'AUTHENTICATION_ERROR',
                            path: ['loginUser']
                        }
                    ]
                }
            }
        ]

        const {result} = renderHook(
            () => useMutation(USER_LOGIN),
            {
                wrapper: ({children}) => (
                    <TestWrapper mocks={mocks}>{children}</TestWrapper>
                )
            }
        )

        const [loginUser] = result.current

        await waitFor(async () => {
            try {
                await loginUser({
                    variables: {
                        loginInput: mockLoginInput
                    }
                })
            } catch (error) {
                const apolloError = error as ApolloError
                expect(apolloError.graphQLErrors).toHaveLength(1)
                expect(apolloError.graphQLErrors[0].message).toBe('Invalid credentials')
            }
        })
    })


})
