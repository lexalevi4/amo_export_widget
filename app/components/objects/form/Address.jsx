'use client'
import { useEffect, useRef, useState } from "react";
import { debounce } from '@mui/material/utils';
import { AddressSuggestions } from "react-dadata";
import { Placemark, YMaps, Map, RulerControl, ZoomControl, useYMaps } from "@pbe/react-yandex-maps";
import { dadata_key } from "@/app/params/params";
import MyTextInput from "./MyTextInput";
import { Stack, Typography } from "@mui/material";
import '../../../../dist/style.css'


function Address({ address, setAddress, lat, setLat, lng, setLng, dadata_response, setDadata_respone }) {
    const ymaps = useYMaps();
    const [placemark, setPlacemark] = useState(null);
    const [map, setMap] = useState(null);


    const mapRef = useRef(null);


    const dragEnd = (e) => {
        let coords = e.originalEvent.target.geometry.getCoordinates()
        setLat(coords[0]);
        setLng(coords[1]);

    }

    const geocode = async function (lat, lng) {
        let dadata = await (await fetch('/api/dadata/reverse-geocode?lat=' + lat + '&lng=' + lng)).json()
        return dadata.suggestions[0];
    }


    useEffect(() => {

        if (!ymaps || !mapRef.current

        ) {
            return;
        }
        let newMap = new ymaps.Map(mapRef.current, {
            controls: [],
            center: [55.751574, 37.573856], zoom: 10,
        }, {
            // maxZoom: 16,
            // minZoom: 10
        })
        newMap.events.add('click', async function (e) {
            let coords = e.get('coords');
            setLat(coords[0])
            setLng(coords[1])
            let dadata = await geocode(coords[0], coords[1]);
            // console.log(dadata);
            setAddress(dadata.value);
            setDadata_respone(dadata);
            let addr_field = document.querySelector('.react-dadata__input');
            addr_field.value = dadata.value;

        });
        setMap(
            newMap
        );



        if (lat > 0 && lng > 0) {
            let new_placemark = new ymaps.Placemark([lat, lng])
            setPlacemark(new_placemark);
            map.geoObjects.add(new_placemark);
            new_placemark.events.add(['dragend'], dragEnd)
        }

    }, [ymaps])

    const onAddrChange = (suggestion) => {
        setDadata_respone(suggestion);
        setAddress(suggestion.value)
        // console.log(suggestion);
    }
    useEffect(() => {
        // console.log(dadata_response);
        if (dadata_response?.value) {
            setAddress(dadata_response?.value)
            // setDadata(dadata_response);
            setLat(dadata_response?.data?.geo_lat)
            setLng(dadata_response?.data?.geo_lon)
        }

    }, [dadata_response])

    useEffect(() => {
        // if (lat > 0 && lng > 0) {

        // map.
        // }



        if (lat > 0 && lng > 0) {
            if (placemark === null) {
                let new_placemark = new ymaps.Placemark([lat, lng],
                    {},
                    {
                        draggable: true
                    })
                setPlacemark(new_placemark);

                map.geoObjects.add(new_placemark);
                new_placemark.events.add(['dragend'], dragEnd)
                map.setCenter([lat, lng])
                map.setZoom(17)



            } else {
                placemark.geometry.setCoordinates([lat, lng]);
                map.setCenter([lat, lng])
                map.setZoom(17)
            }
            
        }


    }, [lat, lng])



    return (<>

        <Typography
        variant="h6"
        color='GrayText'
        >Адрес</Typography>

        <Stack direction={'row'} spacing={2}>
            <div
                style={{
                    width: 500
                }}>
                <AddressSuggestions token={dadata_key}
                    uid='dadata-input-qq'
                    // height={56}
                    style={{
                        height: 56
                    }}



                    defaultQuery={address}
                    // value={address}
                    onChange={onAddrChange}
                    delay={300}
                    minChars={3}
                />
            </div>
            <MyTextInput
                type='number'
                value={lat}
                setter={setLat}
                title='Широта'
                name={'lat'}

            />
            <MyTextInput
                type='number'
                value={lng}
                setter={setLng}
                title='Долгота'
                name={'lng'}

            />
        </Stack>





        <div style={
            {
                width: '100%',
                height: '30vh'
            }
        }>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
            </div>
        </div>

    </>);
}

export default Address;