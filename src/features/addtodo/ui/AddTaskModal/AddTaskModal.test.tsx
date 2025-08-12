import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AddTaskModal } from './AddTaskModal';
import * as useAddTaskModule from 'features/addtodo/model/useAddTask';

vi.mock('features/addtodo/model/useAddTask', () => ({
    useAddTask: () => [
        vi.fn().mockResolvedValue({}),
    ],
}));

const mockAddTask = vi.fn().mockResolvedValue({});
vi.spyOn(useAddTaskModule, 'useAddTask')
    .mockReturnValue([mockAddTask, { loading: false }] as any);

vi.mock('shared/hooks/useGetCurrentUserId/useGetCurrentUserId', () => ({
    useGetCurrentUserId: () => 'mock-user-id',
}));

vi.mock('shared/ui/Modal/Modal', () => ({
    Modal: ({ children, isOpen }: any) => isOpen ? <div data-testid="modal">{children}</div> : null,
}));

vi.mock('features/addtodo/ui/AddTaskModal/TaskFormDataFields/TitleField', () => ({
    TitleField: () => <input aria-label="title" defaultValue="Test title" />,
}));
vi.mock('features/addtodo/ui/AddTaskModal/TaskFormDataFields/DateField', () => ({
    DateField: () => <input aria-label="date" defaultValue="2025-12-31" />,
}));
vi.mock('features/addtodo/ui/AddTaskModal/TaskFormDataFields/DescriptionField', () => ({
    DescriptionField: () => <input aria-label="description" defaultValue="Some desc" />,
}));
vi.mock('features/addtodo/ui/AddTaskModal/TaskFormDataFields/ImageField', () => ({
    ImageField: () => <input aria-label="image" type="file" />,
}));
vi.mock('features/addtodo/ui/AddTaskModal/TaskFormDataFields/PriorityField', () => ({
    PriorityField: () => <input aria-label="priority" defaultValue="high" />,
}));

describe('AddTaskModal', () => {
    const closeModal = vi.fn();

    beforeEach(() => {
        closeModal.mockClear();
        mockAddTask.mockClear();
    });

    it('renders when isOpen is true', () => {
        render(<AddTaskModal isOpen={true} closeModal={closeModal} />);
        expect(screen.getByTestId('modal')).toBeInTheDocument();
        expect(screen.getByText('Task')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
        render(<AddTaskModal isOpen={false} closeModal={closeModal} />);
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('calls closeModal and resets form on Go Back click', () => {
        render(<AddTaskModal isOpen={true} closeModal={closeModal} />);
        fireEvent.click(screen.getByRole('button', { name: 'Go Back' }));
        expect(closeModal).toHaveBeenCalledOnce();
    });

});
