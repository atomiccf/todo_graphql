import { describe, it, expect,vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskCard } from './TaskCard';

// Mocks
vi.mock('shared/hooks/useFormatDate/useFormatDate', () => ({
    useFormatDate: (date: string) => `Formatted: ${date}`,
}));

vi.mock('features/addtodo/ui/TaskCard/TaskStatusView', () => ({
    TaskStatusView: ({ status }: { status: string }) => <div data-testid="status-view">{status}</div>,
}));

vi.mock('features/addtodo/ui/TaskCard/MetaDataField', () => ({
    MetaDataField: ({ priority, status, date }: any) => (
        <div data-testid="metadata-field">{`${priority.name}, ${status.name}, ${date}`}</div>
    ),
}));

describe('TaskCard', () => {
    const task = {
        title: 'Test Task Title',
        description: 'This is a test task description.',
        publicUrl: 'https://example.com/image.png',
        status: { id: '1', name: 'In Progress', color: 'blue' },
        priority: { id: '1', name: 'High', color: 'red' },
        _created_at: '2025-07-20T12:00:00Z',
    };

    it('renders task title, description, and formatted date', () => {
        render(<TaskCard task={task} />);

        expect(screen.getByText('Test Task Title')).toBeInTheDocument();
        expect(screen.getByText('This is a test task description.')).toBeInTheDocument();
        expect(screen.getByTestId('status-view')).toHaveTextContent('blue');
        expect(screen.getByTestId('metadata-field')).toHaveTextContent('High, In Progress, Formatted: 2025-07-20T12:00:00Z');
    });

    it('renders image if publicUrl is provided', () => {
        render(<TaskCard task={task} />);
        const image = screen.getByAltText('Task attachment') as HTMLImageElement;

        expect(image).toBeInTheDocument();
        expect(image.src).toBe(task.publicUrl);
    });

    it('does not render image if publicUrl is empty', () => {
        const noImageTask = { ...task, publicUrl: '' };
        render(<TaskCard task={noImageTask} />);

        expect(screen.queryByAltText('Task attachment')).not.toBeInTheDocument();
    });
});
