import { useQuery } from '@apollo/client';
import {GET_STATUS_LIST, StatusResponse} from "features/admin/StatusManagement/api/getStatusList";


export const useGetStatus = () => {
    return useQuery<StatusResponse>(GET_STATUS_LIST)
}
