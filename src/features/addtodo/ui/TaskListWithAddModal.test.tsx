import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskListWithAddModal } from './TaskListWithAddModal';
import {Task} from "features/addtodo/api/getTaskList";


const todayTimestamp = Date.now();

const sampleTasks: Task[] = [
    {
        title: 'Today Task 1',
        _created_at: String(todayTimestamp),
        description: 'This is a task for today',
        priority: {
            id: '1',
            name: 'High',
            color: '#FF0000',
        },
        status: {
            id: '1',
            name: 'Pending',
            color: '#FFA500',
        },
        publicUrl: 'http://example.com/task/1',
        is_completed: false,
    },
    {
        title: 'Older Task 1',
        _created_at: String(new Date(todayTimestamp - 86400000).getTime()), // yesterday
        description: 'Older task description',
        priority: {
            id: '2',
            name: 'Low',
            color: '#00FF00',
        },
        status: {
            id: '2',
            name: 'Completed',
            color: '#008000',
        },
        publicUrl: 'http://example.com/task/2',
        is_completed: true,
    },
];

vi.mock('./AddTaskModal/AddTaskModal', () => ({
    AddTaskModal: ({ isOpen, closeModal }: any) => (
        <div data-testid="modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <button onClick={closeModal}>Close Modal</button>
        </div>
    ),
}));

describe('TaskListWithAddModal', () => {
    it('renders today tasks correctly', () => {
        render(<TaskListWithAddModal allTasks={sampleTasks} />);
        expect(screen.getByText('Today Task 1')).toBeInTheDocument();
        expect(screen.queryByText('No tasks for today')).not.toBeInTheDocument();
    });

    it('shows "No tasks for today" message when no tasks', () => {
        render(<TaskListWithAddModal allTasks={[]} />);
        expect(screen.getByText('No tasks for today')).toBeInTheDocument();
    });

    it('toggles older tasks visibility when button clicked', () => {
        render(<TaskListWithAddModal allTasks={sampleTasks} />);
        const toggleButton = screen.getByRole('button', { name: /show earlier tasks/i });
        expect(toggleButton).toBeInTheDocument();

        expect(screen.queryByText('Older Task 1')).not.toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(screen.getByText('Older Task 1')).toBeInTheDocument();
        expect(toggleButton.textContent).toMatch(/hide earlier tasks/i);

            fireEvent.click(toggleButton);
        expect(screen.queryByText('Older Task 1')).not.toBeInTheDocument();
        expect(toggleButton.textContent).toMatch(/show earlier tasks/i);
    });

    it('opens and closes modal on button click', () => {
        render(<TaskListWithAddModal allTasks={sampleTasks} />);

        expect(screen.queryByTestId('modal')).toHaveStyle({ display: 'none' });

        const addButton = screen.getByRole('button', { name: /add task/i });
        fireEvent.click(addButton);
        expect(screen.getByTestId('modal')).toHaveStyle({ display: 'block' });

        const closeButton = screen.getByText('Close Modal');
        fireEvent.click(closeButton);
        expect(screen.getByTestId('modal')).toHaveStyle({ display: 'none' });
    });

    it('calls refetchTasks when modal closes', () => {
        const refetchMock = vi.fn();
        render(<TaskListWithAddModal allTasks={sampleTasks} refetchTasks={refetchMock} />);

        fireEvent.click(screen.getByRole('button', { name: /add task/i }));
        fireEvent.click(screen.getByText('Close Modal'));

        expect(refetchMock).toHaveBeenCalledTimes(1);
    });
});
