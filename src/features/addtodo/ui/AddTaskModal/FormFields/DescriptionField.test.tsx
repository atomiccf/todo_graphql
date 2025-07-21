import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { describe, it, expect } from 'vitest'
import { DescriptionField } from './DescriptionField'
import { FormInput } from 'features/addtodo/ui/AddTaskModal/AddTaskModal'


const Wrapper = ({ defaultValues }: { defaultValues?: Partial<FormInput> }) => {
    const methods = useForm<FormInput>({ defaultValues })
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => {})}>
                <DescriptionField control={methods.control} errors={methods.formState.errors} />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    )
}

describe('DescriptionField', () => {
    it('renders the description label and textarea', () => {
        render(<Wrapper />)
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/start writing here/i)).toBeInTheDocument()
    })

    it('shows required validation error when submitted empty', async () => {
        render(<Wrapper />)
        await act(async () => {
            fireEvent.click(screen.getByText('Submit'))
        })
        expect(await screen.findByText(/description is required/i)).toBeInTheDocument()
    })

    it('shows minLength validation error when input is too short', async () => {
        render(<Wrapper />)
        const textarea = screen.getByLabelText(/description/i)
        await act(async () => {
            fireEvent.change(textarea, { target: { value: 'Hi' } })
            fireEvent.click(screen.getByText('Submit'))
        })
        expect(await screen.findByText(/minimum 3 characters/i)).toBeInTheDocument()
    })

    it('accepts valid input without errors', async () => {
        render(<Wrapper />)
        const textarea = screen.getByLabelText(/description/i)
        await act(async () => {
            fireEvent.change(textarea, { target: { value: 'This is valid' } })
            fireEvent.click(screen.getByText('Submit'))
        })
        expect(screen.queryByText(/description is required/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/minimum 3 characters/i)).not.toBeInTheDocument()
    })
})
