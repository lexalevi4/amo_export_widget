import { create } from 'zustand'


export const useSettingsState = create((set, get) => ({
    settings: {
        users: {},
        groups: {},
        pipelines: {},
        statuses: {},
    },
    loading: true,
    updateSettings: (name, data, total = false) => set((state) => {
        const settings = get().settings;
        if (!total) {
            const current = get().settings[name];
            const new_arr = [];
            for (let i = 0; i < current.length; i++) {
                if (current[i].id === data.id) {

                    new_arr.push({ ...current[i], ...data })
                } else {
                    new_arr.push(current[i])
                }
            }
            settings[name] = new_arr;
        }else{
            settings[name] = data;
        }
        return ({
            settings: settings
        })
    }),
    // update
    setExportStatusActive: (pipeline_id, value) => set((state) => {
        // console.log(value);
        const settings = get().settings;
        const statuses = get().settings.statuses;
        const new_arr = [];
        for (let i = 0; i < statuses.length; i++) {
            if (statuses[i].pipeline_id === pipeline_id) {
                // console.log('asdfadsf')
                new_arr.push({ ...statuses[i], export_active: value.includes(statuses[i].id) ? 1 : 0 })
            } else {
                new_arr.push(statuses[i])
            }
        }
        console.log(new_arr);
        settings.statuses = new_arr;
        return ({
            settings: settings
        })
    }),
    setInitialState: (data) => set((state) => {
        const settings = get().settings;
        return ({
            settings: data,
            loading: false
        })
    }
    ),

}))
