import React from 'react';
import {describe, it, expect, vi} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import {InputField} from './InputField';

describe('InputField', () => {
    it('renders label and input correctly', () => {
        render(
            <InputField
                id="username"
                label="Username"
                value=""
                onChange={() => {
                }}
            />
        );

        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'username');
    });

    it('calls onChange when input value changes', () => {
        const handleChange = vi.fn();
        render(
            <InputField
                id="email"
                label="Email"
                value=""
                onChange={handleChange}
                type="email"
            />
        );

        const input = screen.getByLabelText('Email');
        fireEvent.change(input, {target: {value: 'test@example.com'}});

        expect(handleChange).toHaveBeenCalledOnce();
        expect(handleChange).toHaveBeenCalledWith('test@example.com');
    });

    it('renders children inside input wrapper', () => {
        render(
            <InputField
                id="password"
                label="Password"
                value=""
                onChange={() => {
                }}
            >
                <button>Show</button>
            </InputField>
        );

        expect(screen.getByText('Show')).toBeInTheDocument();
    });

    it('applies custom class names', () => {
        render(
            <InputField
                id="custom"
                label="Custom"
                value=""
                onChange={() => {
                }}
                className="custom-wrapper"
                inputClassName="custom-input"
            />
        );

        const wrapper = screen.getByLabelText('Custom').parentElement?.parentElement;
        const input = screen.getByLabelText('Custom');

        expect(wrapper?.className).toContain('custom-wrapper');
        expect(input.className).toContain('custom-input');
    });
});
