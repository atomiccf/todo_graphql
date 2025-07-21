import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';


vi.mock('react-router-dom', () => {
    return {
        useLocation: vi.fn(),
    };
});


import { useSetActiveLink } from './useSetActiveLink'; // Adjust path as needed
import { useLocation } from 'react-router-dom';


const mockedUseLocation = useLocation as ReturnType<typeof vi.fn>;

describe('useSetActiveLink', () => {
    beforeEach(() => {
        mockedUseLocation.mockReset();
    });

    it('returns "dashboard" if pathname includes dashboard', () => {
        mockedUseLocation.mockReturnValue({
            pathname: '/dashboard/home',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        });

        const { result } = renderHook(() => useSetActiveLink());

        expect(result.current).toBe('dashboard');
    });

    it('returns "categories" if pathname includes categories', () => {
        mockedUseLocation.mockReturnValue({
            pathname: '/categories/list',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        });

        const { result } = renderHook(() => useSetActiveLink());

        expect(result.current).toBe('categories');
    });

    it('returns "settings" if pathname includes settings', () => {
        mockedUseLocation.mockReturnValue({
            pathname: '/settings/profile',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        });

        const { result } = renderHook(() => useSetActiveLink());

        expect(result.current).toBe('settings');
    });

    it('returns "users" if pathname includes users', () => {
        mockedUseLocation.mockReturnValue({
            pathname: '/users/123',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        });

        const { result } = renderHook(() => useSetActiveLink());

        expect(result.current).toBe('users');
    });

    it('returns empty string if pathname does not match', () => {
        mockedUseLocation.mockReturnValue({
            pathname: '/other',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        });

        const { result } = renderHook(() => useSetActiveLink());

        expect(result.current).toBe('');
    });

    it('handles root path', () => {
        mockedUseLocation.mockReturnValue({
            pathname: '/',
            search: '',
            hash: '',
            state: null,
            key: 'default'
        });

        const { result } = renderHook(() => useSetActiveLink());

        expect(result.current).toBe('');
    });
});
