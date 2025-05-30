import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {router} from './routes/PageRouter.jsx'
import {RouterProvider} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client';

import './index.css'

const link = createHttpLink({
    uri: "http://localhost:3000/",
    credentials: 'include'
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router}/>
        </ApolloProvider>
    </StrictMode>,
)
