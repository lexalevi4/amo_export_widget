import { useObjectSearchFormState } from "@/app/objects/store";
import { Box, Button, Dialog, Paper } from "@mui/material";
import { useYMaps } from "@pbe/react-yandex-maps";
import { useEffect, useRef } from "react";

function MapSearchModal({ isOpen, setIsOpen }) {

    const mapRef = useRef(null);
    const ymaps = useYMaps();
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);
    const polygons = useObjectSearchFormState((state) => state.search.polygons);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);

    useEffect(() => {
        console.log(polygons)
    }, [polygons])

    useEffect(() => {
        if (!ymaps || !mapRef.current

        ) {
            return;
        }

        ymaps.modules.define('ext.paintOnMap', ['meta', 'util.extend', 'pane.EventsPane', 'Event'], function (provide, meta, extend, EventsPane, Event) {
            'use strict';

            // zIndex пейна событий карты по умолчанию равен 500.
            // Подробней в документации: https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/map.pane.Manager-docpage/
            var EVENTS_PANE_ZINDEX = 500;

            var DEFAULT_UNWANTED_BEHAVIORS = ['drag', 'scrollZoom'];
            var DEFAULT_STYLE = { strokeColor: '#0000ff', strokeWidth: 1, strokeOpacity: 1 };
            var DEFAULT_TOLERANCE = 16;

            var badFinishPaintingCall = function () {
                throw new Error('(ymaps.ext.paintOnMap) некорректный вызов PaintingProcess#finishPaintingAt. Рисование уже завершено.');
            };

            /**
             * @interface ymaps.ext.paintOnMap.PaintingProcess
             */

            /**
             * Отключает режим рисования.
             * @function
             * @name ymaps.ext.paintOnMap.PaintingProcess#finishPaintingAt
             * @param {Number[]|ymaps.Event} [positionOrEvent] Координаты точки, в которой рисование должно закончиться.
             * Координаты задаются в пикселях относительно верхнего левого угла карты.
             * @return {Number[]} Координаты.
             */

            /**
             * Включает режим рисования.
             * @name ymaps.ext.paintOnMap
             * @param {ymaps.Map} map
             * @param {Number[]|ymaps.Event} [positionOrEvent] Координаты точки, в которой рисование должно закончиться.
             * Координаты задаются в пикселях относительно верхнего левого угла карты.
             * @param {Object} [config]
             * @param {String[]|null} [config.unwantedBehaviors] Список поведений карты, которые должны быть выключены во время
             * рисования. Перетаскивание карты и её масштабирование колесом мыши выключены по умолчанию.
             * @param {Object} [config.style] Стили такие же, как в ymaps.Polygon или ymaps.Polyline.
             * @param {String} [config.style.strokeColor='#0000ff'] Цвет линии или обводки.
             * @param {Number} [config.style.strokeWidth=1] Толщина линии или обводки.
             * @param {Number} [config.style.strokeOpacity=1] Прозрачность линии или обводки.
             * @param {Number} [config.tolerance=16] Уровень упрощения координат в пикселях.
             * @returns {ymaps.ext.paintOnMap.PaintingProcess} Процесс рисования.
             */
            function paintOnMap(map, positionOrEvent, config) {
                config = config || {};
                var style = extend(DEFAULT_STYLE, config.style || {});

                var unwantedBehaviors = config.unwantedBehaviors === undefined ?
                    DEFAULT_UNWANTED_BEHAVIORS : config.unwantedBehaviors;

                var pane = new EventsPane(map, {
                    css: { position: 'absolute', width: '100%', height: '100%' },
                    zIndex: EVENTS_PANE_ZINDEX + 50,
                    transparent: true
                });

                map.panes.append('ext-paint-on-map', pane);

                if (unwantedBehaviors) {
                    map.behaviors.disable(unwantedBehaviors);
                }

                // Создаём canvas-элемент.
                var canvas = document.createElement('canvas');
                var ctx2d = canvas.getContext('2d');
                var rect = map.container.getParentElement().getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;

                ctx2d.globalAlpha = style.strokeOpacity;
                ctx2d.strokeStyle = style.strokeColor;
                ctx2d.lineWidth = style.strokeWidth;

                canvas.style.width = '100%';
                canvas.style.height = '100%';

                pane.getElement().appendChild(canvas);

                var firstPosition = positionOrEvent ? toPosition(positionOrEvent) : null;
                var coordinates = firstPosition ? [firstPosition] : [];

                var bounds = map.getBounds();
                var latDiff = bounds[1][0] - bounds[0][0];
                var lonDiff = bounds[1][1] - bounds[0][1];

                canvas.onmousemove = function (e) {
                    coordinates.push([e.offsetX, e.offsetY]);

                    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
                    ctx2d.beginPath();

                    ctx2d.moveTo(coordinates[0][0], coordinates[0][1]);
                    for (var i = 1; i < coordinates.length; i++) {
                        ctx2d.lineTo(coordinates[i][0], coordinates[i][1]);
                    }

                    ctx2d.stroke();
                }.bind(this);

                // Создаём косвенное обращение, чтобы не сдерживать сборщик мусора.
                var paintingProcess = {
                    finishPaintingAt: function (positionOrEvent) {
                        paintingProcess.finishPaintingAt = badFinishPaintingCall;

                        // Получаем координаты, прежде чем удалить пейн.
                        if (positionOrEvent) {
                            coordinates.push(toPosition(positionOrEvent));
                        }

                        map.panes.remove(pane);
                        if (unwantedBehaviors) {
                            map.behaviors.enable(unwantedBehaviors);
                        }

                        var tolerance = config.tolerance === undefined ? DEFAULT_TOLERANCE : Number(config.tolerance);
                        if (tolerance) {
                            coordinates = simplify(coordinates, tolerance);
                        }
                        // Преобразовываем координаты canvas-элемента в геодезические координаты.
                        return coordinates.map(function (x) {
                            var lon = bounds[0][1] + (x[0] / canvas.width) * lonDiff;
                            var lat = bounds[0][0] + (1 - x[1] / canvas.height) * latDiff;

                            return meta.coordinatesOrder === 'latlong' ? [lat, lon] : [lon, lat];
                        });
                    }
                };

                return paintingProcess;
            }

            function toPosition(positionOrEvent) {
                return positionOrEvent instanceof Event ?
                    [positionOrEvent.get('offsetX'), positionOrEvent.get('offsetY')] :
                    positionOrEvent;
            }

            function simplify(coordinates, tolerance) {
                var toleranceSquared = tolerance * tolerance;
                var simplified = [coordinates[0]];

                var prev = coordinates[0];
                for (var i = 1; i < coordinates.length; i++) {
                    var curr = coordinates[i];
                    if (Math.pow(prev[0] - curr[0], 2) + Math.pow(prev[1] - curr[1], 2) > toleranceSquared) {
                        simplified.push(curr);
                        prev = curr;
                    }
                }

                return simplified;
            }

            provide(paintOnMap);
        });

        ymaps.ready(['ext.paintOnMap'])
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
                        // size: "small", position: {
                        //     // parent.
                        //     // top: window.innerHeight * 0.4, right: 15
                        // }
                    }
                });
                map.controls.add(zoomControl);


                // const BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                //     '<div style="margin: 10px;">' +
                //     '<button id="counter-button">Удалить</button>' +
                //     '</div>', {

                //     // Переопределяем функцию build, чтобы при создании макета начинать
                //     // слушать событие click на кнопке-счетчике.
                //     build: function () {
                //         // Сначала вызываем метод build родительского класса.
                //         BalloonContentLayout.superclass.build.call(this);
                //         // А затем выполняем дополнительные действия.
                //         $('#counter-button').bind('click', this.onCounterClick);
                //     },

                //     // Аналогично переопределяем функцию clear, чтобы снять
                //     // прослушивание клика при удалении макета с карты.
                //     clear: function () {
                //         // Выполняем действия в обратном порядке - сначала снимаем слушателя,
                //         // а потом вызываем метод clear родительского класса.
                //         $('#counter-button').unbind('click', this.onCounterClick);
                //         BalloonContentLayout.superclass.clear.call(this);
                //     },

                //     onCounterClick: function () {
                //         console.log(this.getData())
                //     }
                // });




                var paintProcess;
                // Опции многоугольника или линии.
                var styles = [
                    { strokeColor: '#ff00ff', strokeOpacity: 0.7, strokeWidth: 3, fillColor: '#ff00ff', fillOpacity: 0.4 },
                    { strokeColor: '#ff0000', strokeOpacity: 0.6, strokeWidth: 6, fillColor: '#ff0000', fillOpacity: 0.3 },
                    { strokeColor: '#00ff00', strokeOpacity: 0.5, strokeWidth: 3, fillColor: '#00ff00', fillOpacity: 0.2 },
                    { strokeColor: '#0000ff', strokeOpacity: 0.8, strokeWidth: 5, fillColor: '#0000ff', fillOpacity: 0.5 },
                    { strokeColor: '#000000', strokeOpacity: 0.6, strokeWidth: 8, fillColor: '#000000', fillOpacity: 0.3 },
                ];
                var currentIndex = 0;
                // Создадим кнопку для выбора типа рисуемого контура.
                var button = new ymaps.control.Button({ data: { content: 'Рисовать' }, options: { maxWidth: 150 } });
                map.controls.add(button);
                // Подпишемся на событие нажатия кнопки мыши.
                map.events.add('mousedown', function (e) {
                    // Если кнопка мыши была нажата с зажатой клавишей "alt", то начинаем рисование контура.
                    if (button.isSelected()) {
                        if (currentIndex == styles.length - 1) {
                            currentIndex = 0;
                        } else {
                            currentIndex += 1;
                        }
                        paintProcess = ymaps.ext.paintOnMap(map, e, { style: styles[currentIndex] });
                    }
                });
                // Подпишемся на событие отпускания кнопки мыши.
                map.events.add('mouseup', function (e) {
                    if (paintProcess) {
                        // Получаем координаты отрисованного контура.
                        var coordinates = paintProcess.finishPaintingAt(e);
                        paintProcess = null;
                        // В зависимости от состояния кнопки добавляем на карту многоугольник или линию с полученными координатами.
                        var geoObject = new ymaps.Polygon([coordinates], {
                            // balloonContentBody:
                            //     '<button>удалить</button>'

                        }, {
                            // balloonContentLayout: BalloonContentLayout,
                            // balloonPanelMaxMapArea: 0,
                            ...styles[currentIndex]

                            // , balloonContentLayout: BalloonContentLayout, 
                        }
                        );
                        // var geoObject = button.isSelected() ?
                        //     new ymaps.Polyline(coordinates, {}, styles[currentIndex]) :
                        //     new ymaps.Polygon([coordinates], {}, styles[currentIndex]);
                        map.geoObjects.add(geoObject);
                        // console.log(geoObject.geometry.getCoordinates())
                        // geometry.Polygon.toEncodedCoordinates(geometry)
                        // updateMultyField('polygons', geoObject.geometry.getCoordinates())
                        // console.log(ymaps.geometry.Polygon.toEncodedCoordinates(geoObject))
                        // var Coords = geoObject.geometry.getCoordinates();

                        // var geometry = ymaps.geometry.Polygon.toEncodedCoordinates(Coords);
                        console.log
                        updateMultyField('polygons', JSON.stringify(geoObject.geometry.getCoordinates()))
                        geoObject.events.add(['click'], () => {
                            geoObject.balloon.open();
                        })

                    }
                });

                var button1 = new ymaps.control.Button({ data: { content: 'Очистить' }, options: { maxWidth: 150, selectOnClick: false } });
                map.controls.add(button1);
                button1.events.add(['click'], () => {
                    var worker = true;
                    while (worker) {
                        worker = false;
                        map.geoObjects.each(function (item) {
                            if (item.geometry.getType() == "Polygon") {
                                map.geoObjects.remove(item)
                                worker = true;
                            }
                        })
                    }
                    // map.geoObjects.each(function (item) {
                    //     if (item.geometry.getType() == "Polygon") {
                    //         map.geoObjects.remove(item)
                    //     }
                    // })
                    setSearchParam('polygons', [])
                })


            });

    }, [ymaps]
    );


    return (<>
        <Dialog
            // fullScreen
            maxWidth={'xl'}
            keepMounted
            open={isOpen}
            scroll='paper'
            onClose={() => setIsOpen(false)}

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

        </Dialog>
    </>);
}

export default MapSearchModal;