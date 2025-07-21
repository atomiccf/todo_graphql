import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FileUploadSection } from './FileUploadSection';
import userEvent from '@testing-library/user-event';
import {FieldErrors} from "react-hook-form";
import {FormInput} from "features/addtodo/ui/AddTaskModal/AddTaskModal";

describe('FileUploadSection', () => {
    it('renders correctly with no file selected', () => {
        render(<FileUploadSection onChange={() => {}} />);

        expect(screen.getByText(/upload image/i)).toBeInTheDocument();
        expect(screen.getByText(/drag&drop files here or/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/browse/i)).toBeInTheDocument();
    });

    it('calls onChange when a file is selected via input', async () => {
        const onChange = vi.fn();
        render(<FileUploadSection onChange={onChange} />);

        const file = new File(['hello'], 'hello.png', { type: 'image/png' });
        const input = screen.getByLabelText(/browse/i).closest('div')?.querySelector('input[type="file"]') as HTMLElement;


        await userEvent.upload(input, file);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(file);
    });

    it('displays the selected file name', () => {
        const file = new File(['test'], 'test-file.jpg', { type: 'image/jpeg' });
        render(<FileUploadSection onChange={() => {}} value={file} />);

        expect(screen.getByText(/выбран файл/i)).toHaveTextContent('test-file.jpg');
    });

    it('calls onChange when a file is dropped', () => {
        const onChange = vi.fn();
        render(<FileUploadSection onChange={onChange} />);

        const dropzone = screen.getByText(/drag&drop files here or/i).parentElement as HTMLElement;
        const file = new File(['dragged content'], 'dragged.png', { type: 'image/png' });

       const data = {
            dataTransfer: {
                files: [file],
                items: [{ kind: 'file', type: 'image/png', getAsFile: () => file }],
                types: ['Files'],
            },
        } as unknown as React.DragEvent<HTMLDivElement>;

        fireEvent.drop(dropzone, data);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(file);
    });

    it('shows error message when errors.image exists', () => {
        const errors = {
            image: {
                type: 'required',
                message: 'File is required',
            },
        } as FieldErrors<FormInput>;

        render(<FileUploadSection onChange={() => {}} errors={errors} />);

        expect(screen.getByText(/file is required/i)).toBeInTheDocument();
    });
});
