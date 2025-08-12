import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TaskStatusView } from './TaskStatusView';

describe('TaskStatusView', () => {
    it('renders with the correct border color based on status', () => {
        const statusColor = 'red';
        const { container } = render(<TaskStatusView status={statusColor} />);

        const div = container.firstChild as HTMLElement;

        expect(div).toBeInTheDocument();
        expect(div).toHaveStyle(`border-color: ${statusColor}`);
        expect(div.className).toContain('w-5');
        expect(div.className).toContain('h-5');
        expect(div.className).toContain('rounded-full');
        expect(div.className).toContain('bg-white');
        expect(div.className).toContain('border-4');
    });
});
