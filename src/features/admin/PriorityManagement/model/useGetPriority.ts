import { useQuery } from '@apollo/client';
import {GET_PRIORITY_LIST, PriorityResponse} from "features/admin/PriorityManagement/api/getPriorityList";


export const useGetPriority = () => {
    return useQuery<PriorityResponse>(GET_PRIORITY_LIST)
}
