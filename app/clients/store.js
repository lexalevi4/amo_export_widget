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
}))