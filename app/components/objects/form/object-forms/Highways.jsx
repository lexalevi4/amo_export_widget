import { Button } from "@mui/material";
import MetroStation from "./MetroStation";
import { sortByName } from "@/app/heplers/heplers";
import Highway from "./Highway";

function Highways({ setter, getter, flat, form_data }) {


    const value = getter('highways')

    const selected = [];
    value.map(item => {
        selected.push(item.id)
    })


    const add = () => {
        setter('highways', [...value, {
            //  num: (multiAds.length + 1), 
            id: '', distance: ''
        }])

    }

    return (<>

        {value.map((item, index) => {
            return (
                // 'qq'
                < Highway
                    selected={selected}
                    getter={getter}
                    key={'highways-component-' + index}
                    item={item}
                    items={form_data.highway.sort(sortByName)}
                    index={index}
                />
            )

        })}

        {value.length < 3 && (
            <>
                <Button
                    onClick={add}
                >
                    Добавить Шоссе
                </Button>
            </>
        )}

    </>);
}

export default Highways;