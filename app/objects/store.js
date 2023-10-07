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
        districts: [],
        okrugs: [],
        polygons: [],
        highways: [],
        to_metro: '',
        to_metro_by: 1,

    },
    activeSearch: {
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
        districts: [],
        okrugs: [],
        polygons: [],
        highways: [],
        to_metro: '',
        to_metro_by: 1,

    },
    params: {
        strings: [],
        array_nums: [
            'highways',
            'okrugs',
            'districts',
            'metro',
            'brunches',
            'rooms',
            'object'
        ],
        arrays: [
            'polygons',
            'addrobjs'
        ],
    },
    objects: [],
    setObjects: (data) => set((state) => {
        return ({
            objects: data
        })
    }),
    setSearch: (data) => set((state) => {
        return ({
            search: data

        })
    }),

    updateMultyField: (name, value) => set((state) => {

        let field = get().search[name].slice(0);
        const search = get().search
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
        return ({
            search: new_search

        })

    }),

    updateOkrug: (okrug) => set((state) => {
        const search = get().search;
        let okrugs = search.okrugs.slice(0);
        if (okrugs.includes(okrug)) {
            okrugs = okrugs.filter((item) => { return item !== okrug })
        }
        const new_search = { ...search, okrugs: okrugs }
        return ({
            search: new_search
        })

    }),
    objectsIsLoading: true,
    setObjectsIsLoading: (value) => set((state) => ({ objectsIsLoading: value })),
    formData: {},
    setFormData: (data) => set((state) => ({ formData: data, loading: false })),
    loading: true,
    setLoading: (value) => set((state) => ({ loading: value })),
    page: 1,
    search_updated: 0,
    pageType: 'list',
    setState: (name, value) => set((state) => ({ [name]: value })),

    setActiveSearch: (value) => set((state) => {
        console.log(value)
        const search_updated = get().search_updated;
        console.log(search_updated)
        // const search = get().search;
        // let okrugs = search.okrugs.slice(0);
        // if (okrugs.includes(okrug)) {
        //     okrugs = okrugs.filter((item) => { return item !== okrug })
        // }
        // const new_search = { ...search, okrugs: okrugs }
        return ({
            activeSearch: value,
            page: 1,
            search_updated: 1
        })

    }),


    // setActiveSearch: (value) => set((state) => ({ activeSearch: value, page: 1, search_updated: 1 })),
    setPage: (value) => set((state) => ({ page: value, search_updated: 1 })),
    changePageType: () => set((state) => {
        const currentPageType = get().pageType;
        const currentSearch = get().search;
        const pageType = currentPageType === 'list' ? 'map' : 'list'

        // const search = get().search;
        // let okrugs = search.okrugs.slice(0);
        // if (okrugs.includes(okrug)) {
        //     okrugs = okrugs.filter((item) => { return item !== okrug })
        // }
        // const new_search = { ...search, okrugs: okrugs }
        return ({
            activeSearch: currentSearch,
            page: 1,
            search_updated: 1,
            pageType: pageType
        })

    }),


}))
