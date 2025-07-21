
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { DateField } from './DateField'
import { describe, it, expect } from 'vitest'
import { FormInput } from 'features/addtodo/ui/AddTaskModal/AddTaskModal'


const Wrapper = ({ defaultValues }: { defaultValues?: Partial<FormInput> }) => {
    const methods = useForm<FormInput>({ defaultValues })
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => {})}>
                <DateField control={methods.control} errors={methods.formState.errors} />
                <button type="submit">Submit</button>
            </form>
        </FormProvider>
    )
}

describe('DateField', () => {
    it('renders input with label "Date"', () => {
        render(<Wrapper />)
        expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    })

    it('shows error message if date is required and not filled', async () => {
        render(<Wrapper />)
        fireEvent.click(screen.getByText('Submit'))
        expect(await screen.findByText(/date is required/i)).toBeInTheDocument()
    })

    it('accepts input value', () => {
        render(<Wrapper />)
        const input = screen.getByLabelText(/date/i)
        fireEvent.change(input, { target: { value: '2025-01-01' } })
        expect((input as HTMLInputElement).value).toBe('2025-01-01')
    })
})
