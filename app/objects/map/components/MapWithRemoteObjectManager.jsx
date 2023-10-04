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
function MapWithRemoteObjectManager({ handleClusterClick }) {





    const search = useObjectSearchFormState((state) => state.search)
    // const params = useObjectSearchFormState((state) => state.params)


    // const search = [];
    const mapRef = useRef(null);
    const ymaps = useYMaps();
    





    useEffect(() => {
        if (!ymaps || !mapRef.current

        ) {
            return;
        }
        const map = new ymaps.Map(mapRef.current, {
            controls: [],
            center: [55.751574, 37.573856], zoom: 15,
        }, {
            // maxZoom: 16,
            // minZoom: 10
        });


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

        // var selected_types = search.price_type.slice();
        // // console.log(selected_types)
        // if (selected_types.length === 0) {
        //     selected_types = ['1', '2', '3', '4', '5'];
        // }
        // console.log(selected_types)
        // console.log(serialize({ 'selected_types': selected_types }))

        const getUrl = () => {
            let link = '/api/object/map/objects?z=%z&bbox=%b&'
                + 'search=' + JSON.stringify(search)
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


        rom.objects.events.add(['click'], onObjectEvent);

        function onObjectEvent(e) {
            let object = rom.objects.getById(e.get('objectId'));
            if (object.properties.type === 'cluster') {
                var current_zoom = map.getZoom();
                if (current_zoom < 16) {
                    map.setZoom(current_zoom + 1)
                    map.setCenter(object.geometry.coordinates)
                } else {

                    handleClusterClick(object.properties)
                }
            }
            if (object.properties.type === 'point') {
                // console.log(object.properties.flat)
                handleClusterClick(object.properties)
            }
        }

        // var listBoxItems = price_types
        //     .map(function (type) {
        //         return new window.ymaps.control.ListBoxItem({
        //             data: {
        //                 content: '<span style="color:' + type.color + '">' + type.title + '</span>'
        //                 // content:  type.title
        //             },
        //             state: {
        //                 selected: selected_types.includes(String(type.val))
        //             }
        //         })
        //     }),
        //     reducer = function (filters, filter) {
        //         filters[filter.data.get('content').replace(htmlRegexG, '')] = filter.isSelected();
        //         return filters;
        //     },
        // Теперь создадим список, содержащий 5 пунктов.
        // listBoxControl = new window.ymaps.control.ListBox({
        //     data: {
        //         content: 'Цены',
        //         title: 'Цены'
        //     },
        //     position: {
        //         top: 10, right: 10
        //     },
        //     items: listBoxItems,
        //     state: {
        //         // Признак, развернут ли список.
        //         expanded: true,
        //         filters: listBoxItems.reduce(reducer, {})
        //     }
        // });

        // Добавим отслеживание изменения признака, выбран ли пункт списка.
        // listBoxControl.events.add(['select', 'deselect'], function (e) {
        //     // console.log(e)
        //     var listBoxItem = e.get('target');
        //     var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
        //     filters[listBoxItem.data.get('content').replace(htmlRegexG, '')] = listBoxItem.isSelected();
        //     // console.log( filters[listBoxItem.data.get('content')]);
        //     listBoxControl.state.set('filters', filters);
        // });

        // var filterMonitor = new window.ymaps.Monitor(listBoxControl.state);

        // filterMonitor.add('filters', function (filters) {
        //     // Применение фильтра к ObjectManager.
        //     console.log(filters)

        //     selected_types = [];
        //     price_types.map(function (type) {
        //         if (filters[type.title]) {
        //             selected_types.push(String(type.val))
        //         }
        //         return true;
        //     })
        //     console.log(selected_types);
        //     rom.setUrlTemplate('api/map/cluster?z=%z&bbox=%b&' + serialize(search) + '&' + serialize({ 'selected_types': selected_types }))
        //     rom.reloadData()
        //     dispatch(updateSearch({ field: 'price_type', value: selected_types }))
        // });

        // map.controls.add(listBoxControl);


        map.geoObjects.add(rom);
        // eslint-disable-next-line
    }, [ymaps]
    );


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