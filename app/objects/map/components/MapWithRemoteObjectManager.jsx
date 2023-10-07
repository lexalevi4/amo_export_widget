'use client'
import { Box, Paper } from "@mui/material";
import { useYMaps } from "@pbe/react-yandex-maps";
import { useEffect, useRef, useState } from "react";
import { useObjectSearchFormState } from "../../store";

const htmlRegexG = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
const serialize = function (obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    var result = str.join("&")
    return result.replace(/&&+/gi, '&')
}
function MapWithRemoteObjectManager({ handleClusterClick, mapInfo }) {


    const search_updated = useObjectSearchFormState((state) => state.search_updated)
    const activeSearch = useObjectSearchFormState((state) => state.activeSearch)

    const [manager, setManager] = useState(null);
    const [currentMap, setCurrentMap] = useState(null)

    const [clusterSearch, setClusterSearch] = useState(null)


    const search = useObjectSearchFormState((state) => state.search)
    // const params = useObjectSearchFormState((state) => state.params)
    const setState = useObjectSearchFormState((state) => state.setState)
    const searchRef = useRef(activeSearch)


    // // const search = [];
    const mapRef = useRef(null);
    const ymaps = useYMaps();



    // useEffect(() => {
    //     setClusterSearch(activeSearch)
    //     // console.log(clusterSearch)
    // }, [activeSearch,search_updated])

    useEffect(() => {
        searchRef.current = activeSearch;
        console.log(activeSearch)
    }, [activeSearch, search_updated])




    useEffect(() => {
        if (!ymaps || !mapRef.current || !mapInfo || !mapInfo.max_lat

        ) {
            return;
        }
        if (currentMap) {
            return;
        }
        const map = new ymaps.Map(mapRef.current, {
            controls: [],
            center: [55.751574, 37.573856], zoom: 15,
            // bounds: [[mapInfo.min_lat, mapInfo.min_lng], [mapInfo.max_lat, mapInfo.max_lng]],
            // options: {
            //     checkZoomRange: true,
            //     zoomMargin: 35,
            // },


        }, {
            // maxZoom: 16,
            // minZoom: 10
        });
        console.log([mapInfo.min_lat, mapInfo.min_lng], [mapInfo.max_lat, mapInfo.max_lng]);
        map.setBounds([[mapInfo.min_lat, mapInfo.min_lng], [mapInfo.max_lat, mapInfo.max_lng]], {
            checkZoomRange: true,
            zoomMargin: 9,
            callback: function (err) {
                if (err) {
                    console.log(err)
                    // Не удалось показать заданный регион
                    // ...
                }
            }
        });

        if (map.getZoom() > 15) map.setZoom(15); // максимальный зум


        var zoomControl = new ymaps.control.ZoomControl({
            options: {
                zoomDuration: 0,
                size: "small", position: {
                    // parent.
                    top: window.innerHeight * 0.4, right: 15
                }
            }
        });
        map.controls.add(zoomControl);
        setCurrentMap(map);

        // var selected_types = search.price_type.slice();
        // // console.log(selected_types)
        // if (selected_types.length === 0) {
        //     selected_types = ['1', '2', '3', '4', '5'];
        // }
        // console.log(selected_types)
        // console.log(serialize({ 'selected_types': selected_types }))

        const getUrl = () => {
            let link = '/api/object/map/objects?z=%z&bbox=%b&'
                + 'search=' + JSON.stringify(activeSearch)
            // + serialize(search)
            // + '&'
            // + serialize({ 'selected_types': selected_types })

            // if (user.id > 0) {
            //     link += '&user_id=' + user.id
            // } else {
            //     link += '&user_id=0'
            // }

            return link

        }


        const rom = new ymaps.RemoteObjectManager(getUrl(), {
            splitRequests: true,
        });
        setManager(rom);


        rom.objects.events.add(['click'], onObjectEvent);

        function onObjectEvent(e) {
            let object = rom.objects.getById(e.get('objectId'));
            if (object.properties.type === 'cluster') {
                var current_zoom = map.getZoom();
                if (current_zoom < 16) {
                    map.setZoom(current_zoom + 1)
                    map.setCenter(object.geometry.coordinates)
                } else {

                    handleClusterClick(object.properties, searchRef.current)
                }
            }
            if (object.properties.type === 'point') {
                // console.log(object.properties.flat)
                handleClusterClick(object.properties, searchRef.current)
            }
        }

        map.geoObjects.add(rom);
        // eslint-disable-next-line
    }, [ymaps, mapInfo]
    );

    // useEffect(() => {
    //     if (ymaps) {
    //         if (search_updated > 0) {

    //             manager.setUrlTemplate('/api/object/map/objects?z=%z&bbox=%b&'
    //                 + 'search=' + JSON.stringify(activeSearch));
    //             manager.reloadData()

    //             setState('search_updated', 0)
    //         }
    //     }
    // }, [activeSearch, search_updated])

    useEffect(() => {
        if (ymaps) {
            if (mapInfo) {
                if (currentMap) {
                    console.log(mapInfo)

                    currentMap.setBounds([[mapInfo.min_lat, mapInfo.min_lng], [mapInfo.max_lat, mapInfo.max_lng]], {
                        checkZoomRange: true,
                        zoomMargin: 35,
                        callback: function (err) {
                            if (err) {
                                console.log(err)
                                // Не удалось показать заданный регион
                                // ...
                            }
                        }
                    });
                    if (currentMap.getZoom() > 15) currentMap.setZoom(15);
                    if (search_updated > 0) {

                        // manager.setFilter(() => false);
                        manager.setUrlTemplate('/api/object/map/objects?z=%z&bbox=%b&'

                            + 'search=' + JSON.stringify(activeSearch));
                        manager.reloadData()
                        // manager.objects.events.remove(['click']);
                        // manager.objects.events.add(['click'], onObjectEvent);
                        // function onObjectEvent(e) {
                        //     let object = manager.objects.getById(e.get('objectId'));
                        //     if (object.properties.type === 'cluster') {
                        //         var current_zoom = currentMap.getZoom();
                        //         if (current_zoom < 16) {
                        //             currentMap.setZoom(current_zoom + 1)
                        //             currentMap.setCenter(object.geometry.coordinates)
                        //         } else {
                        //             handleClusterClick(object.properties, clusterSearch)
                        //         }
                        //     }
                        //     if (object.properties.type === 'point') {
                        //         // console.log(object.properties.flat)
                        //         handleClusterClick(object.properties, clusterSearch)
                        //     }
                        // }
                        // manager.setFilter(() => true);

                        setState('search_updated', 0)
                    }
                }
            }
        }
    }, [mapInfo, ymaps, currentMap, activeSearch, search_updated])


    return (<>
        <Box>
            <Paper
                className='p-0'
                style={{ width: '100%', height: '800px' }}
            >
                <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
                </div>
            </Paper>
        </Box>
    </>);
}

export default MapWithRemoteObjectManager;