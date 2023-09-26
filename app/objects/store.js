import { create } from 'zustand'


export const useObjectSearchFormState = create((set, get) => ({
    search: {
        addrobjs: [],
        deal_type: 1,
        cluster: 1,
        category: 1,
        object: [],
        rooms: [1, 3],
        minTotalArea: '',
        maxTotaArea: '',
        minLivingArea: '',
        maxLivingArea: '',
        minKitchenArea: '',
        maxKitchenArea: '',
        minLandArea: '',
        maxLandArea: '',
        minFloor: '',
        maxFloor: '',
        minFloorsCount: '',
        maxFloorsCount: '',
        minPrice: '',
        maxPrice: '',
        isByHomeowner: 2,
        isNewBuilding: 2,
        metro: [],
        brunches: [],
        metro: [],
        districts: [],
        okrugs: [],
        polygons: [],
        highways: [],

    },
    setSearch: (data) => set((state) => {
        const search = get().search;
        return ({
            search: search

        })
    }),

    updateMultyField: (name, value) => set((state) => {

        let field = get().search[name].slice(0);
        const search = get().search
        console.log(field);
        console.log(value);
        if (field.includes(value)) {
            field = field.filter((item) => { return item !== value })
        } else {
            field = [...field, value]
        }
        search[name] = field;
        return ({
            search: search
        })

    }),

    setSearchParam: (name, value) => set((state) => {
        const search = get().search;
        const new_search = { ...search, [name]: value }
        console.log(name, value)
        return ({
            search: new_search

        })

    }),

    updateOkrug: (okrug) => set((state) => {
        const search = get().search;
        let okrugs = search.okrugs.slice(0);
        console.log(okrug)
        console.log(okrugs)
        if (okrugs.includes(okrug)) {
            okrugs = okrugs.filter((item) => { return item !== okrug })
            console.log('remove')
            console.log(okrugs)
        }
        const new_search = { ...search, okrugs: okrugs }
        console.log(new_search)
        return ({
            search: new_search
        })

    }),

    formData: {},
    setFormData: (data) => set((state) => ({ formData: data, loading: false })),
    loading: true,
    setLoading: (value) => set((state) => ({ loading: value })),
}))
