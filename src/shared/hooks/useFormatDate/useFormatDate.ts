import { useMemo } from "react";

export const useFormatDate = (timestamp: string | undefined) => {
    return useMemo(() => {
        const date = new Date(Number(timestamp));

        if (timestamp === undefined) {
            return 'Invalid Date';
        }

        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }, [timestamp]);
};
