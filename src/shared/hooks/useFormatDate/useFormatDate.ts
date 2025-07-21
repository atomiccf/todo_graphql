import { useMemo } from "react";

export const useFormatDate = (timestamp: string) => {
    return useMemo(() => {
        const date = new Date(Number(timestamp));

        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }, [timestamp]);
};
