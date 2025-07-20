import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PriorityOption } from './PriorityOption';

describe('PriorityOption', () => {
    it('renders label, dot, and checkbox correctly', () => {
        render(
            <PriorityOption
                color="#FF0000"
                label="High"
                value="high"
                selected={false}
            />
        );

        expect(screen.getByText('High')).toBeInTheDocument();

        const dot = screen.getByText('•');
        expect(dot).toBeInTheDocument();
        expect(dot).toHaveStyle({ color: '#FF0000' });

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it('shows checkbox as checked when selected=true', () => {
        render(
            <PriorityOption
                color="#00FF00"
                label="Low"
                value="low"
                selected={true}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('calls onChange when checkbox is toggled', () => {
        const onChangeMock = vi.fn();

        render(
            <PriorityOption
                color="#0000FF"
                label="Medium"
                value="medium"
                selected={false}
                onChange={onChangeMock}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(onChangeMock).toHaveBeenCalledOnce();
    });
});
