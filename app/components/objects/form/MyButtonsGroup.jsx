"use client"
import { useObjectFormState } from "@/app/objects/create/store";
import { Button, ButtonGroup, FormControl, FormLabel } from "@mui/material";

function MyButtonsGroup({ title, name, items, setter, getter,
    // value,
    multipe = false, flat }) {


    const value = getter(name);

    const handler = (e) => {
        // console.log(e);
        if (value === e.target.dataset.onclickparam) {
            setter(name, '');
            // flat[name] = '';
        } else {
            setter(name, e.target.dataset.onclickparam);
            // flat[name] = e.target.dataset.onclickparam;
        }

    }



    return (
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
    );
}

export default MyButtonsGroup;