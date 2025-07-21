import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { vi, describe, it, expect } from 'vitest';
import { useGetTasks } from './useGetTasks';
import { GET_TASK_LIST } from '../api/getTaskList';

const TestComponent = ({ userId }: { userId: string | null | undefined }) => {
    const { loading, error, data } = useGetTasks(userId);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data</div>;

    return (
        <ul>
            {data.getAllTasks.map((task: any) => (
                <li key={task.id}>{task.title}</li>
            ))}
        </ul>
    );
};

const mocks = [
    {
        request: {
            query: GET_TASK_LIST,
            variables: { userId: '123' },
        },
        result: {
            data: {
                tasks: [
                    { id: '1', title: 'Task 1' },
                    { id: '2', title: 'Task 2' },
                ],
            },
        },
    },
];

describe('useGetTasks', () => {
    it('should skip the query if userId is null or undefined', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <TestComponent userId={null} />
            </MockedProvider>
        );


        await waitFor(() => {
            expect(screen.getByText('No data')).toBeInTheDocument();
        });
    });
    it('should show error message on error', async () => {
        const errorMocks = [
            {
                request: {
                    query: GET_TASK_LIST,
                    variables: { userId: 'error' },
                },
                error: new Error('Something went wrong'),
            },
        ];

        render(
            <MockedProvider mocks={errorMocks} addTypename={false}>
                <TestComponent userId="error" />
            </MockedProvider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Error: Something went wrong/)).toBeInTheDocument();
        });
    });
});
