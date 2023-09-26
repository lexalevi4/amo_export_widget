import { useObjectSearchFormState } from "@/app/objects/store";
import { Button, ButtonGroup, FormControl, FormLabel } from "@mui/material";

function SearchButtonsGroup({ title, items, name }) {
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField)
    const value = useObjectSearchFormState((state) => state.search[name])

    const handler = (e) => {
        updateMultyField(name, Number(e.target.dataset.onclickparam))
    }

    return (<>
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
                                // variant="outlined"
                                variant={value.includes(item.id) ? 'contained' : 'outlined'}
                            > {item.name}
                            </Button>
                        )
                    })
                }
            </ButtonGroup>
        </FormControl>
    </>);
}

export default SearchButtonsGroup;