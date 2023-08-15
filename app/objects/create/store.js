import { create } from 'zustand'



export const useObjectFormState = create((set, get) => ({
    flat: {},
    setFlat: (flat) => set((state) => ({ flat: flat, loading: false })),
    formData: {},
    setFormData: (data) => set((state) => ({ formData: data })),
    updateFlat: (field, value) => set((state) => {
        // console.log(value)
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
}))
