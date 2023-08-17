
import { useEffect } from "react";

import { Grid, Stack, TextField, Typography } from "@mui/material";
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import MyDivider from "../MyDivider";
// import compare from '../../../../heplers/heplers.js'
import { sortByName, chunkArray } from "@/app/heplers/heplers";
import MultipleSwitch from "../MultipleSwitch";
import { useObjectFormState } from "@/app/objects/create/store";
import Garage from "./commercial/Garage";
import Business from "./commercial/Business";
import Building from "./commercial/Building";
import CommercialLand from "./commercial/CommercialLand";
import Office from "./commercial/Office";
import FreeAppointment from "./commercial/FreeAppointment";
import Industry from "./commercial/Industry";
import Warehouse from "./commercial/Warehouse";
import ShoppingArea from "./commercial/ShoppingArea";
import MultiAds from "./commercial/MultiAds";

function Commercial({
    flat,
    form_data,
    flat_object,
    setter,
    getter

}) {


    const parkingIsFree = getter('parkingIsFree');
    const isOccupied = getter('isOccupied');
    const speciality = getter('speciality');
    const infrastructure = getter('infrastructure');
    const liftTypes = getter('liftTypes');
    const liftsCount = getter('liftsCount');
    const floorsCount = getter('floorsCount');


    // const updateMultyField = useObjectFormState((state) => state.updateMultyField)

    // const multiHandler = (name, e) => {
    //     updateMultyField(name, Number(e.target.value))
    // }

    useEffect(() => {
        console.log(speciality)

    }, [speciality])


    // useEffect(() => {

    //     let new_array = [];
    //     for (let i = 0; i < liftTypes.length; i++) {
    //         // console.log(liftTypes[i]);
    //         let filtered = liftsCount.filter((item) => {
    //             // console.log(item.id);
    //             return Number(item.id) === Number(liftTypes[i]);
    //         })
    //         if (filtered.length === 0) {
    //             new_array.push({
    //                 id: liftTypes[i],
    //                 count: '',
    //                 name: getLiftName(liftTypes[i])
    //             })
    //         } else {
    //             new_array.push(
    //                 filtered[0]
    //             )
    //         }
    //     }

    //     setter('liftsCount', new_array)
    // }, [liftTypes])


    const updateLiftsCount = (id, count) => {

        let new_array = [];
        for (let i = 0; i < liftsCount.length; i++) {
            if (liftsCount[i].id === id) {
                new_array.push({
                    id: liftsCount[i].id,
                    name: liftsCount[i].name,
                    count: count
                })
            } else {
                new_array.push(
                    liftsCount[i]
                )
            }
        }
        setter('liftsCount', new_array)
    }

    const materials = form_data.material.filter((item) => {
        return item.commercial === 1
    })


    const heating_types = form_data.heating_type.filter((item) => {
        return item.commercial === 1
    })

    const conditions = form_data.condition.filter((item) => {
        return item.commercial === 1
    })

    const specialities = form_data.speciality.filter((item) => {
        if (flat_object === 11 || flat_object === 13) {
            return item.free === 1
        }
        if (flat_object === 19) {
            return item.rent === 1
        }
        if (flat_object === 20) {
            return item.ready === 1
        }

    })


    // const getLiftName = (item) => {
    //     let currentLift = form_data.lift_type.filter((lift) => {
    //         return Number(lift.id) === Number(item);
    //     })
    //     return currentLift[0].name;

    // }

    const chunkedInfrastructure = chunkArray(form_data.infrastructure.sort(sortByName), Math.ceil(form_data.infrastructure.length / 4))
    const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.ceil(specialities.length / 4));

    if (flat_object === 19) {
        var max_specialities = 5;
    } else if (flat_object === 20) {
        var max_specialities = 1;
    } else {
        var max_specialities = 0;
    }






    return (<>


        {flat_object === 9 && (
            <Garage
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}
            />

        )}

        {(flat_object === 19 || flat_object === 20) && (
            <Business
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}
                flat_object={flat_object}
            />

        )}


        {(flat_object === 17) && (
            <Building
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}
                flat_object={flat_object}
            />

        )}


        {(flat_object === 21) && (
            <CommercialLand
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}

            />

        )}
        {(flat_object === 10) && (
            <Office
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}

            />

        )}
        {(flat_object === 13) && (
            <FreeAppointment
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}

            />

        )}

        {(flat_object === 15) && (
            <Industry
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}

            />

        )}
        {(flat_object === 12) && (
            <Warehouse
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}

            />

        )}
        {(flat_object === 11) && (
            <ShoppingArea
                flat={flat}
                setter={setter}
                getter={getter}
                form_data={form_data}

            />

        )}

        <MyDivider
            title={"МультиОбъявление"}

        />
        <MultiAds
            flat={flat}
            setter={setter}
            getter={getter}
        />

    </>);
}

export default Commercial;