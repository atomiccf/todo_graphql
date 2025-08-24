import React, { CSSProperties } from 'react';
import { useState, useRef, useEffect } from "react"
import { MoreHorizontal } from "lucide-react"
import { Status, Priority } from 'shared/types/tasks';

interface TaskDropdownProps {
    statusList:Status[] | undefined ,
    priorityList:Priority[] | undefined,
    onStatusChange: (statusId: string) => void;
    onPriorityChange: (priorityId: string) => void;
}

export const TaskDropdown: React.FC<TaskDropdownProps> =({ statusList, priorityList, onStatusChange, onPriorityChange })=> {
    const [isOpen, setIsOpen] = useState(false)


    const dropdownRef = useRef<HTMLDivElement>(null)

    const handleStatusChange = (statusId: string) => {
        if (statusId) {
            onStatusChange(statusId)
        }
        setIsOpen(false)
    }

    const handlePriorityChange = (priorityId: string) => {
        if (priorityId) {
            onPriorityChange(priorityId)
        }
        setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-8 w-8 p-0 rounded-md bg-white border-none hover:bg-gray-100 hover:border-none  transition-colors duration-200 flex items-center justify-center"
            >
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
            {isOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 border-none bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in-0 zoom-in-95">
                    {/* Status Section */}
                    {statusList?.map(({name, _id, color }) => (
                        <button
                            key={_id}
                            className="w-full px-3 py-2 text-left text-sm bg-white flex items-center transition-colors duration-150"
                            style={{
                                color: color,
                                '--hover-bg-color': `${color}20`,
                            } as CSSProperties}
                            onMouseOver={(e) => {
                                e.currentTarget.style.setProperty('background-color', `var(--hover-bg-color)`);
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '';
                            }}
                            onClick={() => handleStatusChange(_id)}
                        >
                            {`Mark as ${name}`}
                        </button>
                    ))}
                    <div className="border-t border-gray-200 my-1"></div>

                    {/* Priority Section */}
                    {priorityList?.map(({name, _id, color }) => (
                        <button
                            key={_id}
                            className="w-full px-3 py-2 text-left text-sm bg-white flex items-center transition-colors duration-150"
                            style={{
                                color: color,
                                '--hover-bg-color': `${color}20`,
                            } as CSSProperties}
                            onMouseOver={(e) => {
                                e.currentTarget.style.setProperty('background-color', `var(--hover-bg-color)`);
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = '';
                            }}
                            onClick={() => handlePriorityChange (_id)}
                        >
                            {`Mark as ${name}`}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
