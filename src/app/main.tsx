import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'app/providers/RouterProvider';
import { ProviderApollo } from 'app/providers/ApolloProvider';
import { ProviderGoogleOAuth } from 'app/providers/GoogleOAuthProvider';

import './index.css';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Root container not found');
}

const root = createRoot(container);

root.render(
    <StrictMode>
        <ProviderGoogleOAuth>
            <ProviderApollo>
                <Router />
            </ProviderApollo>
        </ProviderGoogleOAuth>
    </StrictMode>
);
