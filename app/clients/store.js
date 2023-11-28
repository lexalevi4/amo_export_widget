import { create } from 'zustand'


export const useClientsState = create((set, get) => ({
    search: {
    },
    setSearch: (data) => set((state) => {
        // const search = get().search;
        return ({
            search: data

        })
    }),
    filters: [],
    setFilters: (data) => set((state) => {
        // const search = get().search;
        return ({
            filters: data

        })
    }),
    metro: { metro: [], brunches: [] },
    metroIsOpen: false,
    districts: { districts: [], okrugs: [] },
    districtsIsOpen: false,
    highways: [],
    highwaysIsOpen: false,
    polygons: [],
    polygonsIsOpen: false,
    addrobjs: [],
    addrobjsIsOpen: false,

    setState: (name, value) => set((state) => ({ [name]: value })),

    dataIsLoading: true,
    setDataIsLoading: (value) => set((state) => ({ dataIsLoading: value })),
    formData: {},
    setFormData: (data) => set((state) => ({ formData: data, loading: false })),
    loading: true,
    setLoading: (value) => set((state) => ({ loading: value })),
    editModalIsOpen: false,
    currentFilter: {},
    currentFilterId: 0,
    filterUpdated: 0,
    openEditModal: (filter) => set((state) => ({
        currentFilter: filter,
        editModalIsOpen: true

    })),
    setUpdatedFilter: (filter) => set((state) => ({
        currentFilter: filter,
        filterUpdated: 1,
        editModalIsOpen: false
    })),
    updatedAll: false,
    setUpdatedAll: () => set((state) => ({
        updatedAll: true,
        editModalIsOpen: false

    })),


}))