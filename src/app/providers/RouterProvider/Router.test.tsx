import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

vi.mock('./PageRouter', async () => {
    const { createMemoryRouter } = await import('react-router-dom');

    return {
        router: createMemoryRouter([
            {
                path: '/',
                element: <div>Test route</div>,
            },
        ]),
    };
});

import { Router } from './RouterProvider';

describe('Router component', () => {
    it('renders route content correctly', () => {
        render(<Router />);
        expect(screen.getByText('Test route')).toBeInTheDocument();
    });
});
