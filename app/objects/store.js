import { create } from 'zustand'
import { sendApiRequest } from '../services/actions';


export const useObjectSearchFormState = create((set, get) => ({
    search: {
        addrobjs: [],
        deal_type: 1,
        cluster: 3,
        category: 1,
        object: [],
        rooms: [],
        minTotalArea: '',
        maxTotalArea: '',
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
        isApartments: 2,
        metro: [],
        brunches: [],
        districts: [],
        okrugs: [],
        polygons: [],
        highways: [],
        to_metro: '',
        to_metro_by: 1,
        to_mkad: '',
        price_type: [],
        id: '',
        users: [],
        status: [],
        material: []

    },
    activeSearch: {
        addrobjs: [],
        deal_type: 1,
        cluster: 3,
        category: 1,
        object: [],
        rooms: [],
        minTotalArea: '',
        maxTotalArea: '',
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
        isApartments: 2,
        metro: [],
        brunches: [],
        districts: [],
        okrugs: [],
        polygons: [],
        highways: [],
        to_metro: '',
        to_metro_by: 1,
        to_mkad: '',
        price_type: [],
        id: '',
        users: [],
        status: [],
        material: []


    },
    defaultSearch: {
        addrobjs: [],
        deal_type: 1,
        cluster: 3,
        category: 1,
        object: [],
        rooms: [],
        minTotalArea: '',
        maxTotalArea: '',
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
        isApartments: 2,
        metro: [],
        brunches: [],
        districts: [],
        okrugs: [],
        polygons: [],
        highways: [],
        to_metro: '',
        to_metro_by: 1,
        to_mkad: '',
        price_type: [],
        id: '',
        users: [],
        status: [],
        material: []
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
            'object',
            'material'
        ],
        arrays: [
            'polygons',
            'addrobjs'
        ],
    },
    objects: [],
    objectsCount: 0,
    setObjects: (data) => set((state) => {
        return ({
            objects: data,
            // objectsIsLoading: false
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
    perPage: 20,
    search_updated: 0,
    pageType: 'list',
    setState: (name, value) => set((state) => ({ [name]: value })),

    setActiveSearch: (value) => set((state) => {
        // console.log(value)

        return ({
            activeSearch: value,
            page: 1,
            search_updated: 1,
            // objectsIsLoading: true,
        })

    }),
    metro:[],
    districts:[],
    brunches:[],
    // setActiveSearch: (value) => set((state) => ({ activeSearch: value, page: 1, search_updated: 1 })),
    sort: 'date',
    setSort: (value) => set((state) => ({ sort: value, search_updated: 1 })),
    setPage: (value) => set((state) => ({ page: value, search_updated: 1 })),
    setPerPage: (value) => set((state) => ({ perPage: value, page: 1, search_updated: 1 })),
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

    refreshObjects:  () => set(async (state) => {
        // this.setObjectsIsLoading(true)
        // const setObjectsIsLoading = get().setObjectsIsLoading;
        // setObjectsIsLoading(true);
        const page = get().page;
        const perPage = get().perPage;
        const activeSearch = get().activeSearch;
        const sort = get().sort;
        const data = await sendApiRequest('post', 'api/refresh-objects', { filter: JSON.stringify(activeSearch), page: page, perPage: perPage, sort: sort })
        console.log(data);
        // if (data.status === 'ok') {
        return ({
            objects: data.objects,
            objectsCount: data.count,
            objectsIsLoading: false,
            search_updated: 0
        })
        // }
        // this.setListObjects(data)

    }),
    setListObjects: (data) => set((state) => {
        if (data.status === 'ok') {
            return ({
                objects: data.objects,
                objectsCount: data.count,
                objectsIsLoading: false,
                search_updated: 0
            })
        }
    }),
    updateActiveSearch: () => set((state) => {
        // console.log(value)
        const search = get().search;
        return ({
            activeSearch: search,
            page: 1,
            search_updated: 1,
            // objectsIsLoading: true,
        })

    }),
    resetSearch: () => set((state) => {
        // console.log(value)
        const defaultSearch = get().defaultSearch;
        return ({
            search: defaultSearch,
        })

    }),

}))
