import { Button, Stack } from "@mui/material";
import MySwitch from "../../MySwitch";
import MultiAdItem from "./MultiAdItem";
import { useEffect } from "react";

function MultiAds({ flat, setter, getter }) {

    
    const isMulti = getter('isMulti');
    const multiAds = getter('multiAds');

    const defaultItems = [
        {  id: null, area: '', floorFrom: '', floorTo: '', images: [] },
        {  id: null, area: '', floorFrom: '', floorTo: '', images: [] },
    ];
    useEffect(() => {
        if (isMulti) {
            console.log('Включаем')
            if (multiAds.length === 0) {
                setter('multiAds', defaultItems)
            }
        } else {
            setter('multiAds', [])
        }

    }, [isMulti])

    const addMulti = () => {
        setter('multiAds', [...multiAds, {
            //  num: (multiAds.length + 1), 
             id: null, area: '', floorFrom: '', floorTo: '', images: [] }])

    }
    // const deleteItem = (index) => {
        // setter('multiAds', multiAds.splice(index, 1))

        // console.log(id);
    // }

    return (<>
        <Stack
            direction={"row"}
        >
            <MySwitch
                getter={getter}
                setter={setter}
                name={"isMulti"}
                title={'МультиОбъявление'}
            />
        </Stack>

        {isMulti && (
            <>
                {
                    multiAds.map((item, index) => {
                        return (
                            <MultiAdItem
                                key={'multiItem' +index}
                                item={item}
                                flat={flat}
                                setter={setter}
                                getter={getter}
                                index={index}
                                del_disabled={multiAds.length < 3}
                                // deleteItem={deleteItem}
                            />
                        )
                    })
                }
                {multiAds.length < 30 && (
                    <Button
                        onClick={addMulti}
                    >
                        Добавить площадь
                    </Button>
                )}
            </>

        )}

    </>);
}

export default MultiAds;