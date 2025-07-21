import { describe, it, expect,vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProviderGoogleOAuth } from './GoogleOAuthProvider';
import React from 'react';


vi.mock('@react-oauth/google', async () => {
    const actual = await vi.importActual<typeof import('@react-oauth/google')>('@react-oauth/google');
    return {
        ...actual,
        GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    };
});

describe('ProviderGoogleOAuth', () => {
    it('renders children inside GoogleOAuthProvider', () => {
        render(
            <ProviderGoogleOAuth>
                <div>OAuth Child</div>
            </ProviderGoogleOAuth>
        );

        expect(screen.getByText('OAuth Child')).toBeInTheDocument();
    });
});
