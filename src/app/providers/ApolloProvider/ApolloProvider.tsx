import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs"
import React, {JSX} from 'react';

type ProviderApolloProps = {
    children: React.ReactNode;
};

export const ProviderApollo = ({ children }: ProviderApolloProps): JSX.Element => {
    const link = createUploadLink({
        uri: 'http://localhost:3000/',
        credentials: 'include',
        headers: {
            'Apollo-Require-Preflight': 'true'
        }
    });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
