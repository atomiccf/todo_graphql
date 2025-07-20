import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { DashboardPage } from './DashboardPage'
import * as userStore from 'shared/model/user/store'
import * as useGetCurrentUserIdHook from 'shared/hooks/useGetCurrentUserId/useGetCurrentUserId'
import * as useGetTasksHook from 'features/addtodo/model/useGetTasks'
import { Task, TaskResponse, TaskVariables } from 'features/addtodo/api/getTaskList'
import { ApolloQueryResult, NetworkStatus, QueryResult, WatchQueryOptions } from '@apollo/client'

vi.mock('features/addtodo/ui/TaskListWithAddModal', () => ({
    TaskListWithAddModal: ({ allTasks, refetchTasks }: any) => (
        <div>
            <p>TaskListMock</p>
            <p data-testid="task-count">{allTasks.length}</p>
        </div>
    ),
}))

describe('DashboardPage', () => {
    beforeEach(() => {
        vi.spyOn(userStore, 'useUserStore').mockImplementation((selector) =>
            selector({
                user: {
                    getUser: {
                        id: '1',
                        username: 'john_doe',
                        first_name: 'John',
                        last_name: 'Doe',
                        email: 'john@example.com',
                        role: 'user',
                    },
                },
                setUser: vi.fn(),
                clearUser: vi.fn(),
            })
        )

        vi.spyOn(useGetCurrentUserIdHook, 'useGetCurrentUserId').mockReturnValue('123')

        const mockTasks: Task[] = [
            {
                title: 'Test Task',
                description: 'Description of test task',
                is_completed: false,
                priority: { id: '1', name: 'High', color: 'red' },
                status: { id: '2', name: 'In Progress', color: 'blue' },
                _created_at: '2025-07-20T12:00:00Z',
                publicUrl: 'https://example.com/file.pdf',
            },
        ]

        const mockUseGetTasksResult: QueryResult<TaskResponse, TaskVariables> = {
            data: { getAllTasks: mockTasks },
            refetch: vi.fn(),
            loading: false,
            error: undefined,
            networkStatus: 7,
            client: {} as any,
            observable: {} as any,
            fetchMore: vi.fn() as any,
            updateQuery: vi.fn() as any,
            startPolling: vi.fn() as any,
            stopPolling: vi.fn() as any,
            subscribeToMore: vi.fn() as any,
            called: false,
            reobserve: function (
                newOptions?: Partial<WatchQueryOptions<TaskVariables, TaskResponse>> | undefined,
                newNetworkStatus?: NetworkStatus
            ): Promise<ApolloQueryResult<TaskResponse>> {
                throw new Error('Function not implemented.')
            },
            variables: undefined,
        }

        vi.spyOn(useGetTasksHook, 'useGetTasks').mockReturnValue(mockUseGetTasksResult)
    })

    it('renders welcome message with user first name', () => {
        render(<DashboardPage />)
        expect(
            screen.getByRole('heading', {
                name: (name) => name.includes('Welcome back, John'),
            })
        ).toBeInTheDocument()
    })

    it('renders the task list with correct number of tasks', () => {
        render(<DashboardPage />)
        expect(screen.getByText('TaskListMock')).toBeInTheDocument()
        expect(screen.getByTestId('task-count')).toHaveTextContent('1')
    })
})
