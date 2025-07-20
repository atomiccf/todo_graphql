import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { jwtDecode } from 'jwt-decode'
import { useQuery } from '@apollo/client'
import { useUserStore } from 'shared/model/user/store'
import { GET_CURRENT_USER } from 'shared/api/graphql/getCurrentUser'
import { useFetchCurrentUser } from './useFetchCurrentUser'

vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}))
vi.mock('@apollo/client')
vi.mock('shared/model/user/store')

describe('useFetchCurrentUser', () => {
    const dummyToken = 'dummy.jwt.token'
    const decoded = { userId: '123' }
    const mockData = { currentUser: { id: '123', name: 'Alice' } }
    const setUserMock = vi.fn()
    const clearUserMock = vi.fn()

    beforeEach(() => {
        vi.mocked(jwtDecode).mockReturnValue(decoded)
        vi.mocked(useUserStore).mockImplementation((selector: any) => {
            const fakeStore = {
                user: null,
                setUser: setUserMock,
                clearUser: clearUserMock,
            }
            return selector(fakeStore)
        })
        global.localStorage.clear()
        setUserMock.mockReset()
        clearUserMock.mockReset()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    function TestComponent() {
        useFetchCurrentUser()
        return null
    }

    it('does nothing when there is no token', async () => {
        vi.mocked(useQuery).mockReturnValue({ data: undefined } as any)
        render(<TestComponent />)
        await waitFor(() => {
            expect(setUserMock).not.toHaveBeenCalled()
        })
    })

    it('decodes token, runs GET_CURRENT_USER query, and sets user when data arrives', async () => {
        global.localStorage.setItem('jwt', dummyToken)
        vi.mocked(useQuery).mockReturnValue({ data: mockData } as any)

        render(<TestComponent />)

        await waitFor(() => {
            expect(jwtDecode).toHaveBeenCalledWith(dummyToken)
            expect(useQuery).toHaveBeenCalledWith(
                GET_CURRENT_USER,
                {
                    variables: { ID: decoded.userId },
                    skip: false,
                }
            )
            expect(setUserMock).toHaveBeenCalledWith(mockData)
        })
    })
})
