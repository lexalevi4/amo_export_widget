import { Button, FormControlLabel, Stack, Switch } from "@mui/material";
import MySwitch from "../../MySwitch";
import MultiAdItem from "./MultiAdItem";
import { useEffect } from "react";

function MultiAds({ flat, setter, getter }) {


    // const 

    const isMulti = getter('isMulti');
    const multiAds = getter('multiAds');

    const handleIsMulti = () => {
        if (isMulti) {
            if (window.confirm('Все площади будут удалены')) {
                setter('isMulti', false)
            }

        } else {
            setter('isMulti', true)
        }
    }

    const defaultItems = [
        { id: null, area: '', floorFrom: '', floorTo: '', images: [], price: '', price_for: 1 },
        { id: null, area: '', floorFrom: '', floorTo: '', images: [], price: '', price_for: 1 },
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
            id: null, area: '', floorFrom: '', floorTo: '', images: [], price: '', price_for: 1
        }])

    }
    // const deleteItem = (index) => {
    // setter('multiAds', multiAds.splice(index, 1))

    // console.log(id);
    // }

    return (<>
        <Stack
            direction={"row"}
        >
            <FormControlLabel
                labelPlacement="start"
                control={
                    <Switch

                        name="name"
                        // id={name + "switch"}
                        checked={isMulti}
                        onClick={handleIsMulti}
                    // onChange={handler}
                    />
                } label={'МультиОбъявление'} />
            {/* <MySwitch
                getter={getter}
                setter={setter}
                name={"isMulti"}
                title={'МультиОбъявление'}
            /> */}
        </Stack>

        {isMulti && (
            <>
                {
                    multiAds.map((item, index) => {
                        return (
                            <MultiAdItem
                                key={'multiItem' + index}
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