import { indexOf } from 'lodash';
import { create } from 'zustand'


export const useSettingsState = create((set, get) => ({
    settings: {
        users: {},
        groups: {},
        pipelines: {},
        statuses: {},
    },
    loading: true,
    rights: [
        "access_read",
        "access_update",
        "access_delete",
    ],
    updateAccessRights: (id, group, name, value) => set((state) => {

        const settings = get().settings;
        const rights = get().rights;
        var level = indexOf(rights, name)
        if (level < 0) {
            level = 500
        }
        // console.log(level);
        const new_users = [];
        const new_groups = [];

        if (group) {

            for (let i = 0; i < settings.groups.length; i++) {
                let currentGroupUsers = settings.users.filter(user => user.group_id === settings.groups[i].amo_group_id);

                if (settings.groups[i].id === id) {
                    let new_group = { ...settings.groups[i], [name]: value };
                    rights.forEach(element => {
                        console.log(indexOf(rights, element))
                        if (level <= indexOf(rights, element)) {
                            if (new_group[element] > value) {
                                new_group[element] = value;
                            }
                        }
                    });
                    if (name === 'access_read' && value === 0) {
                        new_group.access_publish = 0;
                    }
                    new_groups.push(new_group);
                    for (let q = 0; q < currentGroupUsers.length; q++) {
                        let new_user = { ...currentGroupUsers[q], [name]: value };
                        rights.forEach(element => {
                            if (level <= indexOf(rights, element)) {
                                if (new_user[element] > value) {
                                    new_user[element] = value;
                                }

                            }
                        });
                        if (name === 'access_read' && value === 0) {
                            new_user.access_publish = 0;
                        }
                        new_users.push(new_user);
                    }
                } else {
                    new_groups.push(settings.groups[i]);
                    for (let q = 0; q < currentGroupUsers.length; q++) {
                        new_users.push(currentGroupUsers[q]);
                    }
                }
            }
        } else {
            // var current_group_index;
            for (let i = 0; i < settings.groups.length; i++) {
                let activeGroup = false;

                let currentGroupUsers = settings.users.filter(user => user.group_id === settings.groups[i].amo_group_id);
                for (let q = 0; q < currentGroupUsers.length; q++) {
                    if (currentGroupUsers[q].id === id) {
                        activeGroup = true;

                        let new_user = { ...currentGroupUsers[q], [name]: value }
                        rights.forEach(element => {
                            if (level <= indexOf(rights, element)) {
                                if (new_user[element] > value) {
                                    new_user[element] = value;
                                }

                            }
                        });
                        new_users.push(new_user);
                        if (name === 'access_read' && value === 0) {
                            new_user.access_publish = 0;
                        }
                    } else {
                        new_users.push({ ...currentGroupUsers[q] });
                    }
                }
                if (settings.groups[i][name] > value && activeGroup) {
                    let new_group = { ...settings.groups[i], [name]: value };
                    rights.forEach(element => {
                        // console.log(indexOf(rights, element))
                        if (level <= indexOf(rights, element)) {
                            if (new_group[element] > value) {
                                new_group[element] = value;
                            }
                        }
                    });
                    if (name === 'access_read' && value === 0) {
                        new_group.access_publish = 0;
                    }
                    new_groups.push(new_group);
                } else {
                    new_groups.push(settings.groups[i]);
                }
            }


        }

        settings.groups = new_groups;
        settings.users = new_users;

        return ({
            settings: settings
        })
    }),
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
        } else {
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
        // console.log(new_arr);
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
