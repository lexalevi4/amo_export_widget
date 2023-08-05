import { FormControlLabel, Switch } from "@mui/material";
import { useMemo } from "react";
import { multiSwitchHandler } from "@/app/heplers/heplers";

function MultipleSwitch({ item, checked, disabled = false, setter, getState, handler }) {

    // const checked = useMemo(() => {
    //     let id = Number(item.id)
    //     return state.includes(id)
    // }, [item.id, state])



    // const handler = (value)=>{
    //     multiSwitchHandler(value,setter,state);
    // }

    // const handler = (e) => {
    //     let value = Number(e.target.value)
    //     let arr = [];
    //     let state = getState();
    //     console.log(state)
    //     state.map(function (item, index) {
    //         arr.push(item);
    //         return true;
    //     })
    //     if (arr.includes(value)) {
    //         arr.splice(arr.indexOf(value), 1)
    //     } else {
    //         arr.push(value)
    //     }
    //     setter(arr)
    // }
    // return (
    //     useMemo(() => {
    console.log('sdfsdf')
    return (<>

        <FormControlLabel
            className="m-0"
            labelPlacement="end"
            control={
                <Switch
                    disabled={disabled}
                    name="name"
                    // id={'infrastructure_' + "switch_" + value}
                    checked={checked}
                    onClick={handler}
                    inputProps={{
                        value: item.id
                    }}

                // onChange={handler}f
                />
            } label={item.name} />
    </>)
    //     }, [checked, item.id, disabled, item.name])
    // )
}

export default MultipleSwitch;