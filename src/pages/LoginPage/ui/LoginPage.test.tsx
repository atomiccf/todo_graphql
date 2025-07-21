import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
    const renderWithProviders = () =>
        render(
            <MockedProvider mocks={[]} addTypename={false}>
                <GoogleOAuthProvider clientId="test-client-id">
                    <MemoryRouter>
                        <LoginPage />
                    </MemoryRouter>
                </GoogleOAuthProvider>
            </MockedProvider>
        )

    it('renders the login wrapper', () => {
        renderWithProviders()
        const wrapper = screen.getByTestId('login-wrapper')
        expect(wrapper).toBeInTheDocument()
    })

    it('renders username and password inputs and submit button', () => {
        renderWithProviders()
        const usernameInput = screen.getByPlaceholderText('Enter username')
        const passwordInput = screen.getByPlaceholderText('Enter password')
        const submitButton = screen.getByRole('button', { name: 'Sign in' })

        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
    })

    it('renders the image with correct alt text', () => {
        renderWithProviders()
        const image = screen.getByAltText('phone_and_girl')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src')
    })
})
