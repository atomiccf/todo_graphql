import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProviderApollo } from './ApolloProvider';
import React from 'react';

describe('ProviderApollo', () => {
    it('renders children inside ApolloProvider', () => {
        render(
            <ProviderApollo>
                <div>Test content</div>
            </ProviderApollo>
        );

        expect(screen.getByText('Test content')).toBeInTheDocument();
    });
});
