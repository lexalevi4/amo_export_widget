import { create } from 'zustand'


export const useObjectFormState = create((set, get) => ({
    flat: {},
    setFlat: (flat) => set((state) => ({ flat: flat, loading: false })),
    formData: {},
    setFormData: (data) => set((state) => ({ formData: data })),
    updateFlat: (field, value) => set((state) => {
        const flat = get().flat
        flat[field] = value;
        console.log(flat)
        return ({
            flat: flat
        })
    }
    ),
    loading: true,
    addImages: (data) => set((state) => {
        const flat = get().flat
        let images = get().flat.images.active
        for (let i = 0; i < data.length; i++) {
            images.push(data[i]);

        }
        console.log(images)
        flat.images.active = images;
        return ({
            flat: flat
        })

    }),
    sortImages: (new_arr, active = true) => set((state) => {
        const flat = get().flat
        if (active) {
            flat.images.active = new_arr;
        } else {
            flat.images.inactive = new_arr;
        }
        return ({
            flat: flat
        })

    }),
    moveImages: (image, direction) => set((state) => {
        const flat = get().flat
        const active = get().flat.images.active.slice(0);
        const inactive = get().flat.images.inactive.slice(0);
        const new_value = { active: [], inactive: [] }
        if (direction === 'del') {
            new_value.active = active.filter((item) => { return item !== image });
            new_value.inactive = [...inactive, image];
        }
        if (direction === 'restore') {
            new_value.inactive = inactive.filter((item) => { return item !== image });
            new_value.active = [...active, image];
        }
        // if (active) {
        //     flat.images.active = new_arr;
        // } else {
        //     flat.images.inactive = new_arr;
        // }
        flat.images = new_value;
        return ({
            flat: flat
        })

    }),
    updateArrayField: (name, id, field, value, default_value) => set((state) => {
        const flat = get().flat
        let currentFieldValue = get().flat[name];
        let new_arr = [];
        let currentElement = currentFieldValue.filter((item) => item.id === id)
        if (currentElement.length === 0) {
            new_arr.push(
                Object.assign({
                    id: id,
                    [field]: value,

                }, default_value)
            )
        } else {
            new_arr.push(
                {
                    ...currentElement[0],
                    [field]: value,
                }
            )
        }
        let filtered = currentFieldValue.filter((item) => item.id !== id)
        filtered.map((item) => {
            new_arr.push(item);
            return true;
        })
        flat[name] = new_arr;
        return ({
            flat: flat
        })
    }),
    delMultiAdItem: (index) => set((state) => {
        console.log(index);
        const flat = get().flat
        const multiAds = get().flat.multiAds
        const new_arr = multiAds.slice(0);
        new_arr.splice(index, 1);
        flat.multiAds = new_arr;
        return ({
            flat: flat
        })
    }),
    updateMultiAdItem: (index, name, value) => set((state) => {
        const flat = get().flat;
        const multiAds = get().flat.multiAds;
        const new_arr = [];
        for (let i = 0; i < multiAds.length; i++) {
            if (i === index) {
                new_arr.push({ ...multiAds[i], [name]: value })
            } else {
                new_arr.push(multiAds[i])
            }
        }
        flat.multiAds = new_arr;
        return ({
            flat: flat
        })
    }),
    addMultiAdPhoto: (index, new_images) => set((state) => {
        const flat = get().flat;
        const multiAds = get().flat.multiAds;
        const new_arr = [];
        for (let i = 0; i < multiAds.length; i++) {
            if (i === index) {
                new_arr.push({ ...multiAds[i], images: [...multiAds[i].images, ...new_images] })
            } else {
                new_arr.push(multiAds[i])
            }
        }
        flat.multiAds = new_arr;
        return ({
            flat: flat
        })
    }),
    sortMultiAdImages: (index, new_images_arr) => set((state) => {
        const flat = get().flat;
        // console.log(index);
        // console.log(new_arr);
        const multiAds = get().flat.multiAds;
        const new_arr = [];
        for (let i = 0; i < multiAds.length; i++) {
            if (i === index) {
                new_arr.push({ ...multiAds[i], images: new_images_arr })
            } else {
                new_arr.push(multiAds[i])
            }
        }
        flat.multiAds = new_arr;
        return ({
            flat: flat
        })

    }),
    delMultiAdPhoto: (index, image) => set((state) => {
        const flat = get().flat;
        const multiAds = get().flat.multiAds;
        // console.log(imageIndex);
        const new_arr = [];
        for (let i = 0; i < multiAds.length; i++) {
            if (i === index) {
                let images = multiAds[i].images.slice(0);

                // let images = [];
                // multiAds[i].images.map((image, current_image_index) => {
                //     if (imageIndex !== current_image_index) {
                //         images.push(image)
                //     }
                //     return true;
                // })
                new_arr.push({ ...multiAds[i], images: images.filter((item) => { return item !== image }) })
            } else {
                new_arr.push(multiAds[i])
            }
        }
        flat.multiAds = new_arr;
        return ({
            flat: flat
        })
    }),
    setLoading: (value) => set((state) => ({ loading: value })),
    updateMultyField: (name, value) => set((state) => {
        let field = get().flat[name]
        const flat = get().flat
        console.log(field);
        console.log(value);
        if (field.includes(value)) {
            field = field.filter((item) => { return item !== value })
        } else {
            field = [...field, value]
        }
        flat[name] = field;
        return ({
            flat: flat
        })

    }),
    updateMultiItemField: (field, index, name, value) => set((state) => {
        const flat = get().flat;
        const current = get().flat[field];
        const new_arr = [];
        for (let i = 0; i < current.length; i++) {
            if (i === index) {
                new_arr.push({ ...current[i], [name]: value })
            } else {
                new_arr.push(current[i])
            }
        }
        flat[field] = new_arr;
        return ({
            flat: flat
        })
    }),
    multiItemFieldSetDefault: (field, index) => set((state) => {
        const flat = get().flat;
        const current = get().flat[field];
        const new_arr = [];
        for (let i = 0; i < current.length; i++) {
            if (i === index) {
                new_arr.push({ ...current[i], default: true })
            } else {
                new_arr.push({ ...current[i], default: false })
            }
        }
        flat[field] = new_arr;
        return ({
            flat: flat
        })
    }),
    delMultiItemFieldItem: (name, index) => set((state) => {
        // console.log(index);
        const flat = get().flat
        const current = get().flat[name];
        // const multiAds = get().flat.multiAds
        const new_arr = current.slice(0);
        // const new_arr = [];
        // for (let i = 0; i < current.length; i++) {
        //     if (i !== index) {
        //         new_arr.push(current[i])
        //     }
        // }
        new_arr.splice(index, 1);
        flat[name] = new_arr;
        return ({
            flat: flat
        })
    }),
}))
