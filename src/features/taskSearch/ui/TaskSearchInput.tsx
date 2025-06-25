import React from 'react';

export const TaskSearchInput: React.FC = () => {

    return (
    <div className='flex items-center'>
        <input
            className='w-[695px] h-[36px] border rounded-lg rounded-r-none pl-3'
            type="text"
            placeholder="Search your tasks here..."/>
        <button
        className='w-[36px] h-[36px] rounded-lg bg-[url("assets/SearchICon.png")] bg-no-repeat bg-center bg-transparent'>
        </button>
    </div>
    )
}
