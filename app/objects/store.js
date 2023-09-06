import { create } from 'zustand'


export const useObjectSearchFormState = create((set, get) => ({
    search: {
        category: '',
        object: [],
        rooms: [],
        minTotalArea: '',
        maxTotaArea: '',
        minFloor: '',
        maxFloor: '',
        minFloorsCount: '',
        maxFloorsCount: '',
        minPrice: '',
        maxPrice: '',
    },
    setSearch: (data) => set((state) => {
        const search = get().search;
        return ({
            search: search

        })
    }),
    setSearchParam: (name, value) => set((state) => {
        const search = get().search;
        const new_search = { ...search, [name]: value }
        return ({
            search: new_search

        })

    }),
    formData: {},
    setFormData: (data) => set((state) => ({ formData: data, loading: false })),
    loading: true,
    setLoading: (value) => set((state) => ({ loading: value })),
}))
