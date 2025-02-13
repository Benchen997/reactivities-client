import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Activity} from "../types";
import agent from "../api/agent.ts";

export const useActivities = (id?: string) => {

    const queryClient = useQueryClient();

    const { data: activities, isPending } = useQuery({
        queryKey:['activities'],
        queryFn: async () => {
            const response = await agent.get<Activity[]>('/activities');
            return response.data;
        }
    });

    const { data: activity, isLoading: isLoadingActivity } = useQuery({
        queryKey:['activity', id],
        queryFn: async () => {
            const response = await agent.get<Activity>(`/activities/${id}`);
            return response.data;
        },
        // 只有在 id 存在的情况下才会启用这个查询
        enabled: !!id
    });

    const updateActivity = useMutation({
        mutationFn:async (activity: Activity) => {
            await agent.put("/activities", activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            });
        }
    })

    const createActivity = useMutation({
        mutationFn:async (activity: Activity) => {
            const response = await agent.post("/activities", activity);
            return response.data;
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            });
        }
    })

    const deleteActivity = useMutation({
        mutationFn:async (id: string) => {
            await agent.delete(`/activities/${id}`);
        },
        // 告诉 React Query 数据已经过时，需要重新获取
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities']
            });
        }
    })


    return { activities, isPending, updateActivity, createActivity, deleteActivity, activity, isLoadingActivity };
}