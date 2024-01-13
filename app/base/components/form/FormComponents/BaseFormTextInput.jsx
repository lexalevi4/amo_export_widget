import { useObjectSearchFormState } from "@/app/objects/store";
import { FormControl, FormLabel, Input } from "@mui/joy";
import { useMemo } from "react";

function BaseFormTextInput({ name, label = '', type = null, placeholder }) {

    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const value = useObjectSearchFormState((state) => state.search[name]);

    const handler = (e) => {
        setSearchParam(name, e.target.value)
    }

    return (
        useMemo(() => (
            <>
                <FormControl>
                    {label !== '' && (
                        <FormLabel>
                            {label}
                        </FormLabel>
                    )}

                    <Input
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        onChange={handler}

                    />
                </FormControl>

            </>
        ), [value]))
}

export default BaseFormTextInput;