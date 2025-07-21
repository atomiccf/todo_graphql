import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useAddTask } from './useAddTask';
import { ADD_TASK } from '../api/addTask';
import * as useAddTaskModule from 'features/addtodo/model/useAddTask';

const mocks = [
    {
        request: {
            query: ADD_TASK,
            variables: {
                taskInput: {
                    title: 'Test Task',
                    date: '2025-07-20',
                    priority: 'High',
                    description: 'This is a test task',
                    image: null,
                    userId: '12345',
                },
            },
        },
        result: {
            data: {
                addTask: {
                    id: '1',
                    title: 'Test Task',
                    __typename: 'Task',
                },
            },
        },
    },
];

describe('useAddTask', () => {
    it('should call ADD_TASK mutation successfully', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={mocks} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(() => useAddTask(), { wrapper });

        act(() => {
            result.current[0]({
                variables: {
                    taskInput: {
                        title: 'Test Task',
                        date: '2025-07-20',
                        priority: 'High',
                        description: 'This is a test task',
                        image: null,
                        userId: '12345',
                    }
                },
            });
        });

        // Wait for the mutation to resolve
        await waitFor(() => {
            expect(result.current[1].loading).toBe(false);
        });

        expect(result.current[1].data).toEqual({
            addTask: {
                id: '1',
                title: 'Test Task',
                __typename: 'Task',
            },
        });

        expect(result.current[1].error).toBeUndefined();
    });

    it('should return error when mutation fails', async () => {
        const errorMocks = [
            {
                request: {
                    query: ADD_TASK,
                    variables: {
                        taskInput: {
                            title: 'Fail Task',
                            date: '2025-07-20',
                            priority: 'High',
                            description: 'This is a test task',
                            image: null,
                            userId: '12345',
                        },
                    },
                },
                error: new Error('Mutation failed'),
            },
        ];

        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={errorMocks} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(() => useAddTask(), { wrapper });

        await act(async () => {
            try {
                await result.current[0]({
                    variables: {
                        taskInput: {
                            title: 'Fail Task',
                            date: '2025-07-20',
                            priority: 'High',
                            description: 'This is a test task',
                            image: null,
                            userId: '12345',
                        },
                    }
                });
            } catch (error) {
            }
        });

        await waitFor(() => {
            expect(result.current[1].loading).toBe(false);
        });

        expect(result.current[1].error).toBeDefined();
        expect(result.current[1].data).toBeUndefined();
    });
});
