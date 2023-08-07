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
