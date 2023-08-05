"use client"
import { Button, ButtonGroup, FormControl, FormLabel } from "@mui/material";

function MyButtonsGroup({ title, name, items, setter, value, multipe = false, flat }) {



    const handler = (e) => {
        // console.log(e);
        if (value === e.target.dataset.onclickparam) {
            setter('');
            flat[name] = '';
        } else {
            setter(e.target.dataset.onclickparam);
            flat[name] = e.target.dataset.onclickparam;
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