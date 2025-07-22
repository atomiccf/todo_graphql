import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NavigationSidebar } from './NavigationSidebar';


vi.mock('shared/model/user/store', () => ({
    useUserStore: vi.fn(() => ({
        getUser: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john@test.com'
        }
    }))
}));

vi.mock('features/navigationSidebar/hooks/useSetActiveLink', () => ({
    useSetActiveLink: vi.fn(() => 'dashboard')
}));

vi.mock('assets/unknown_user.png', () => ({ default: 'avatar.png' }));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

describe('NavigationSidebar', () => {
    it('renders user information', () => {
        render(
            <TestWrapper>
                <NavigationSidebar />
            </TestWrapper>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@test.com')).toBeInTheDocument();
    });

    it('renders all navigation items', () => {
        render(
            <TestWrapper>
                <NavigationSidebar />
            </TestWrapper>
        );

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Vital Task')).toBeInTheDocument();
        expect(screen.getByText('My Task')).toBeInTheDocument();
        expect(screen.getByText('Task Categories')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Help')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('has correct navigation links', () => {
        render(
            <TestWrapper>
                <NavigationSidebar />
            </TestWrapper>
        );

        const dashboardLink = screen.getByText('Dashboard').closest('a');
        const categoriesLink = screen.getByText('Task Categories').closest('a');

        expect(dashboardLink).toHaveAttribute('href', '/app/dashboard');
        expect(categoriesLink).toHaveAttribute('href', '/app/categories');
    });

    it('displays user avatar', () => {
        render(
            <TestWrapper>
                <NavigationSidebar />
            </TestWrapper>
        );

        const avatar = screen.getByAltText('Rounded Image');
        expect(avatar).toHaveAttribute('src', 'avatar.png');
    });
});
