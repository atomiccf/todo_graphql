import React from 'react';
export const AddTaskComponent: React.FC = () => {
    return (
        <>
            <div className="flex flex-col">
                <input type="text" placeholder="Enter new task here"/>
                <input value='Send' type="button"/>
            </div>
        </>
    )
}
