import { create } from 'zustand'

export const useAccountState = create((set, get) => ({
    session:{},
    users:{},
    groups:{},
    pipelines:{},
    statuses:{},
    feeds:{},

    setState: (data) => set((state) => {
        return ({
            session: data.session,
            users: data.users,
            groups: data.groups,
            pipelines: data.pipelines,
            statuses: data.statuses,
            feeds: data.feeds
        })
    }),



}))