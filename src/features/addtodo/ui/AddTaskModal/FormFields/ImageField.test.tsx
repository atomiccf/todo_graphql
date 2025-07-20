import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useForm, FormProvider } from 'react-hook-form'
import { describe, it, expect } from 'vitest'
import { ImageField } from './ImageField'
import { FormInput } from 'features/addtodo/ui/AddTaskModal/AddTaskModal'

const Wrapper = ({ defaultValues }: { defaultValues?: Partial<FormInput> }) => {
    const methods = useForm<FormInput>({ defaultValues })
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => {})}>
                <ImageField control={methods.control} errors={methods.formState.errors} />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    )
}

describe('ImageField', () => {
    it('renders FileUploadSection component', () => {
        render(<Wrapper />)
        expect(screen.getByText(/upload/i) || screen.getByTestId('file-upload-section')).toBeInTheDocument()
    })

    it('shows required validation error when submitted without file', async () => {
        render(<Wrapper />)
        const user = userEvent.setup()
        await user.click(screen.getByText('Submit'))
        await waitFor(() => {
            expect(screen.getByText(/file is required/i)).toBeInTheDocument()
        })
    })

    it('accepts a file and removes validation error', async () => {
        render(<Wrapper />)
        const user = userEvent.setup()
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' })

        const fileInput = screen.getByLabelText(/upload image/i)

        await user.upload(fileInput, file)
        await user.click(screen.getByText('Submit'))

        await waitFor(() => {
            expect(screen.queryByText(/file is required/i)).not.toBeInTheDocument()
        })
    })
})
