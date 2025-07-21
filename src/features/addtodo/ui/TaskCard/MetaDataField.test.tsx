import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetaDataField } from './MetaDataField';

describe('MetaDataField', () => {
    const props = {
        priority: { id: '1', name: 'High', color: 'red' },
        status: { id: '2', name: 'In Progress', color: 'blue' },
        date: '2025-07-21',
    };

    it('renders priority name and color', () => {
        render(<MetaDataField {...props} />);
        const priorityElement = screen.getByText('High');

        expect(priorityElement).toBeInTheDocument();
        expect(getComputedStyle(priorityElement).color).toBe('rgb(255, 0, 0)');
    });

    it('renders status name and color', () => {
        render(<MetaDataField {...props} />);
        const statusElement = screen.getByText('In Progress');

        expect(statusElement).toBeInTheDocument();
        expect(getComputedStyle(statusElement).color).toBe('rgb(0, 0, 255)');
    });

    it('renders creation date with correct text', () => {
        render(<MetaDataField {...props} />);
        const dateElement = screen.getByText(`Created on ${props.date}`);

        expect(dateElement).toBeInTheDocument();
        expect(dateElement).toHaveClass('text-xs');
    });
});
