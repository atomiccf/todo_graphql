import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import React, {JSX} from 'react';

type ProviderApolloProps = {
    children: React.ReactNode;
};

export const ProviderApollo = ({ children }: ProviderApolloProps): JSX.Element => {
    const link = createHttpLink({
        uri: 'http://localhost:3000/',
        credentials: 'include',
    });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: link,
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
