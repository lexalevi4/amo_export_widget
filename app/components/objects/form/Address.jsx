'use client'
import { useEffect, useRef, useState } from "react";
import { AddressSuggestions } from "react-dadata";
import { useYMaps } from "@pbe/react-yandex-maps";
import MyTextInput from "./MyTextInput";
import { Stack, Typography } from "@mui/material";
import '../../../../dist/style.css'
import { useObjectFormState } from "@/app/objects/create/store";


function Address({
    // flat = { flat },
    // address
    // setter
}) {

    const flat = useObjectFormState((state) => state.flat);
    // console.log(flat);


    const ymaps = useYMaps();
    const [placemark, setPlacemark] = useState(null);
    const [map, setMap] = useState(null);

    const lat = useObjectFormState((state) => state.flat.lat);
    const flatId = useObjectFormState((state) => state.flat.id);
    const lng = useObjectFormState((state) => state.flat.lng);
    const address = useObjectFormState((state) => state.flat.address);
    const [dadata_address, setDadataAddress] = useState(useObjectFormState((state) => state.flat.dadata));
    const dadata_response = useObjectFormState((state) => state.flat.dadata_response);

    const mapRef = useRef(null);
    const updateFlat = useObjectFormState((state) => state.updateFlat);

    const dragEnd = (e) => {
        let coords = e.originalEvent.target.geometry.getCoordinates()
        console.log(e);
        console.log(coords);
        updateFlat('lat', coords[0])
        updateFlat('lng', coords[1])

    }

    const geocode = async function (lat, lng) {
        let dadata = await (await fetch('/api/dadata/reverse-geocode?lat=' + lat + '&lng=' + lng)).json()
        return dadata.suggestions[0];
    }

    // useEffect(() => {
    // let new_addr = useObjectFormState((state) => state.flat.address);
    // setDadataAddress(new_addr)
    // }, [flat, address])

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
            updateFlat('lat', coords[0])
            updateFlat('lng', coords[1])
            let dadata = await geocode(coords[0], coords[1]);
            updateFlat('address', dadata.value)
            updateFlat('dadata_response', dadata)
            setDadataAddress(dadata)
            // let addr_field = document.querySelector('.react-dadata__input');
            // addr_field.value = dadata.value;

        });
        setMap(
            newMap
        );


        if (map) {

            if (lat > 0 && lng > 0) {
                let new_placemark = new ymaps.Placemark([lat, lng])
                setPlacemark(new_placemark);
                map.geoObjects.add(new_placemark);
                new_placemark.events.add(['dragend'], dragEnd)
            }
        }

    }, [ymaps, flat])

    const onAddrChange = (suggestion) => {
        updateFlat('address', suggestion.value)
        updateFlat('dadata_response', suggestion)
        setDadataAddress(suggestion)
    }
    useEffect(() => {
        console.log(dadata_response)
        if (dadata_response?.value) {
            updateFlat('address', dadata_response?.value)

            if (dadata_response?.data?.geo_lat) {
                updateFlat('lat', dadata_response?.data?.geo_lat)
            }
            if (dadata_response?.data?.geo_lon) {
                updateFlat('lng', dadata_response?.data?.geo_lon)
            }
            // updateFlat('lng', dadata_response?.data?.geo_lon)
        }

    }, [dadata_response])

    useEffect(() => {

        if (ymaps && map) {
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
        }

    }, [lat, lng, ymaps, map, flatId])

    const updateAddrString = (e) => {
        updateFlat('address', e.target.value)
    }

    return (<>
        <Typography
            variant="h6"
            color='GrayText'
        >
            Адрес
        </Typography>

        <Stack direction={'row'} spacing={2}>
            <div
                style={{
                    width: 500
                }}>
                <AddressSuggestions token={"asdfasdfasdf"}
                    uid='dadata-input-qq'
                    url="/api/dadata/suggest"
                    // height={56}
                    style={{
                        height: 56
                    }}
                    // onAddrChange={test}
                    inputProps={
                        {
                            onChange: updateAddrString
                        }

                    }

                    httpCache

                    value={dadata_address}
                    defaultQuery={address}
                    onChange={onAddrChange}
                    delay={300}
                    minChars={3}
                />
            </div>
            <MyTextInput
                type='number'
                // value={lat}
                // setter={setter}
                title='Широта'
                name={'lat'}
            />
            <MyTextInput
                type='number'
                // value={lng}
                // setter={setter}
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