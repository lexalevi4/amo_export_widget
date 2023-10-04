import { AppBar, Box, Button, Dialog, Paper, Toolbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useMemo, useRef, useState } from "react";
import { useYMaps } from "@pbe/react-yandex-maps";
import { useClientsState } from "../store";
import { defineYandexMapsDrawExt } from "@/app/heplers/yandexMapsHelper";
function MapModal({ state, isOpen, handleClose, }) {
    const mapRef = useRef(null);
    const ymaps = useYMaps();
    const searchPolygons = useClientsState((state) => state.polygons);
    const [currentMap, setMap] = useState(null);

    const styles = [
        { strokeColor: '#ff00ff', strokeOpacity: 0.7, strokeWidth: 3, fillColor: '#ff00ff', fillOpacity: 0.1 },
        { strokeColor: '#ff0000', strokeOpacity: 0.6, strokeWidth: 6, fillColor: '#ff0000', fillOpacity: 0.1 },
        { strokeColor: '#00ff00', strokeOpacity: 0.5, strokeWidth: 3, fillColor: '#00ff00', fillOpacity: 0.1 },
        { strokeColor: '#0000ff', strokeOpacity: 0.8, strokeWidth: 5, fillColor: '#0000ff', fillOpacity: 0.1 },
        { strokeColor: '#000000', strokeOpacity: 0.6, strokeWidth: 8, fillColor: '#000000', fillOpacity: 0.1 },
    ];


    useEffect(() => {
        if (!ymaps || !mapRef.current

        ) {
            return;
        }


        ymaps.ready()
            .then(function () {
                const map = new ymaps.Map(mapRef.current, {
                    controls: [],
                    center: [55.751574, 37.573856], zoom: 10,
                }, {
                    // maxZoom: 16,
                    // minZoom: 10
                });
                const polygons_index = 0;
                const polygons = [];

                var zoomControl = new ymaps.control.ZoomControl({
                    options: {
                        zoomDuration: 0,
                    }
                });
                map.controls.add(zoomControl);
                setMap(map);

                var currentIndex = 0;

                searchPolygons.map((current_polygon, index) => {
                    if (currentIndex == styles.length - 1) {
                        currentIndex = 0;
                    } else {
                        currentIndex += 1;
                    }
                    var geoObject = new ymaps.Polygon(JSON.parse(current_polygon), {
                    }, {
                        ...styles[currentIndex]
                    }
                    );

                    map.geoObjects.add(geoObject);

                })
                if (searchPolygons.length > 0) {
                    map.setBounds(map.geoObjects.getBounds(), {
                        checkZoomRange: true,
                        zoomMargin: 35
                    });
                }

            });

    }, [ymaps]
    );
    useEffect(() => {
        if (currentMap) {

            var worker = true;
            while (worker) {
                worker = false;
                currentMap.geoObjects.each(function (item) {
                    if (item.geometry.getType() == "Polygon") {
                        currentMap.geoObjects.remove(item)
                        worker = true;
                    }
                })
            }
            var currentIndex = 0;
            searchPolygons.map((current_polygon, index) => {
                if (currentIndex == styles.length - 1) {
                    currentIndex = 0;
                } else {
                    currentIndex += 1;
                }
                var geoObject = new ymaps.Polygon(JSON.parse(current_polygon), {
                }, {
                    ...styles[currentIndex]
                }
                );

                currentMap.geoObjects.add(geoObject);

            })

            if (searchPolygons.length > 0) {
                currentMap.setBounds(currentMap.geoObjects.getBounds(), {
                    checkZoomRange: true,
                    zoomMargin: 35
                });
            }else{
                
                currentMap.setCenter([55.751574, 37.573856])
                currentMap.setZoom(10)
            }

        }
    }, [searchPolygons])



    return (<>
        <Dialog
            // fullScreen
            maxWidth={'xl'}
            keepMounted
            open={isOpen}
            scroll='paper'
            onClose={handleClose}

        >
            <div
                className='m-3 p-2 pt-5 pb-5'
                style={{

                }}
            >
                <Box>
                    <Paper
                        className='p-0'
                        style={{ width: '800px', height: '800px' }}
                    >
                        <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
                        </div>
                    </Paper>
                </Box>

            </div>

            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >
                    {/* 
                    <Button
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        onClick={dropStations}
                        color="error"
                    >
                        Сбросить
                    </Button> */}
                    <Button
                        className='ml-1 w-2/5'
                        // fullWidth
                        color="success"
                        variant='contained'
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                    >
                        Закрыть
                    </Button>


                </Toolbar>
            </AppBar>
        </Dialog>

    </>)
}

export default MapModal;