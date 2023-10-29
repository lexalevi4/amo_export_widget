import { useObjectSearchFormState } from "@/app/objects/store";
import { Button, ButtonGroup, FormControl, FormLabel } from "@mui/material";
import { useMemo } from "react";

function SearchButtonsGroup({ title, items, name, arrayValue = true }) {
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField)
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam)
    const value = useObjectSearchFormState((state) => state.search[name])

    const handler = (e) => {
        if (arrayValue) {
            updateMultyField(name, Number(e.target.dataset.onclickparam))
        } else {
            setSearchParam(name, Number(e.target.dataset.onclickparam))
        }
    }

    const getVariant = (id) => {
        if (arrayValue) {
            return value.includes(id) ? 'contained' : 'outlined'
        } else {
            return value === id ? 'contained' : 'outlined'
        }
    }

    return (
        useMemo(() => (
            <FormControl
                sx={{
                    // marginTop: '15px',
                    width: '100%',
                    display: 'flex'

                }}
            >
                <FormLabel>{title}</FormLabel >
                <ButtonGroup
                    fullWidth
                    sx={{
                        // marginTop: '15px',
                        width: '100%',
                        display: 'flex'

                    }}
                // aria-label={name + "outlined primary button group"}
                >
                    {
                        items.map(function (item) {
                            return (
                                < Button
                                    size="small"
                                    key={'rooms' + item.id}
                                    data-onclickparam={item.id}
                                    onClick={handler}
                                    // variant="outlined"
                                    variant={
                                        arrayValue ?
                                            value.includes(item.id) ? 'contained' : 'outlined'
                                            :
                                            value === item.id ? 'contained' : 'outlined'
                                    }
                                > {item.name}
                                </Button>
                            )
                        })
                    }
                </ButtonGroup>
            </FormControl>
        ), [value]))
}

export default SearchButtonsGroup;