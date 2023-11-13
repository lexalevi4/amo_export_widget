"use client"
import { useObjectFormState } from "@/app/objects/create/store";
import { Button, ButtonGroup, FormControl, FormLabel } from "@mui/material";
import { useMemo } from "react";

function MyButtonsGroup({ title, name, items,
    // , setter, getter,
    // value,
    multipe = false
    // , flat
}) {

    const value = useObjectFormState((state) => state.flat[name]);
    const updateFlat = useObjectFormState((state) => state.updateFlat);
    // const value = getter(name);

    const handler = (e) => {
        // console.log(e);
        if (value === e.target.dataset.onclickparam) {
            updateFlat(name, '');
            // flat[name] = '';
        } else {
            updateFlat(name, e.target.dataset.onclickparam);
            // flat[name] = e.target.dataset.onclickparam;
        }

    }



    return (
        useMemo(() => (
            <FormControl
                sx={{
                    marginTop: '15px',
                    width: '100%',
                    display: 'flex'

                }}
            >
                <FormLabel>{title}</FormLabel >
                <ButtonGroup
                    fullWidth
                    sx={{
                        marginTop: '15px',
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
                                    variant={Number(value) === Number(item.id) ? 'contained' : 'outlined'}
                                > {item.name}
                                </Button>
                            )
                        })
                    }
                </ButtonGroup>
            </FormControl>
        ), [value, name, items]))
}

export default MyButtonsGroup;