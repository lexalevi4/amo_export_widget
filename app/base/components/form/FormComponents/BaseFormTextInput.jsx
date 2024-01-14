import { useObjectSearchFormState } from "@/app/objects/store";
import { FormControl, FormLabel, Input } from "@mui/joy";
import { useMemo } from "react";

function BaseFormTextInput({ name, label = '', type = null, placeholder, width = null, className = null }) {

    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const value = useObjectSearchFormState((state) => state.search[name]);

    const handler = (e) => {
        setSearchParam(name, e.target.value)
    }

    return (
        useMemo(() => (
            <>
                <FormControl
                    className={className}
                >

                    {label !== '' && (
                        <FormLabel>
                            {label}
                        </FormLabel>
                    )}

                    <Input
                        className={className}

                        // size="sm"

                        sx={{
                            width: width
                        }}

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