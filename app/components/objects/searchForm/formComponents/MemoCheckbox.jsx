import { Checkbox, FormControlLabel } from "@mui/material";
import { useMemo } from "react";

function MemoCheckbox({ item, handleClick, state }) {

    const checked = useMemo(
        () => {
            return state.includes(item.id)
        }, [state, item.id]
    )


    return (
        useMemo(() => (
            <FormControlLabel
                label={item.name}
                control={
                    <Checkbox
                        data-onclickparam={item.id}
                        checked={checked}
                        value={item.id}
                        onChange={handleClick}
                    />
                }
            />
        ), [checked, item.id, item.name]))
}

export default MemoCheckbox;