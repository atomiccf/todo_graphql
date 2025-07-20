import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { App } from './App';

vi.mock('shared/hooks/useFetchCurrentUser/useFetchCurrentUser', () => ({
    useFetchCurrentUser: vi.fn(),
}));


vi.mock('features/require-auth', () => ({
    RequireAuth: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));


vi.mock('widgets/Header/ui/Header', () => ({
    Header: () => <div data-testid="header">Mocked Header</div>,
}));


vi.mock('features/navigationSidebar/ui/NavigationSidebar', () => ({
    NavigationSidebar: () => <div data-testid="sidebar">Mocked Sidebar</div>,
}));


vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        Outlet: () => <div data-testid="outlet">Mocked Outlet</div>,
    };
});

describe('App component', () => {
    it('renders layout with Header, Sidebar, and Outlet', () => {
        render(<App />);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('outlet')).toBeInTheDocument();
    });
});
