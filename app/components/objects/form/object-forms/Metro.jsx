import { Button } from "@mui/material";
import MetroStation from "./MetroStation";
import { sortByName } from "@/app/heplers/heplers";

function Metro({  flat, form_data }) {

    const setter = useObjectFormState((state) => state.updateFlat);
    const value = useObjectFormState((state) => state.flat['metro']);
    

    const selected = [];
    metro.map(item => {
        selected.push(item.id)
    })


    const addMetro = () => {
        setter('metro', [...metro, {
            //  num: (multiAds.length + 1), 
            id: '', to_metro: '', to_metro_by: '1', default: metro.length === 0
        }])

    }

    return (<>

        {metro.map((item, index) => {
            return (
                <MetroStation
                    selected={selected}
                    
                    key={'metro-component-' + index}
                    item={item}
                    stations={form_data.metro.sort((a, b) => sortByName(a, b, 'metro'))}
                    index={index}
                />
            )

        })}

        {metro.length < 3 && (
            <>
                <Button
                    onClick={addMetro}
                >
                    Добавить Метро
                </Button>
            </>
        )}

    </>);
}

export default Metro;