'use client'
import { YMaps } from "@pbe/react-yandex-maps";
import MapWithRemoteObjectManager from "./MapWithRemoteObjectManager";
import { useState } from "react";
import MapObjectsModal from "./MapObjectsModal";
import { useObjectSearchFormState } from "../../store";



function MapObjects({ mapInfo }) {

    const [objectsModalIsOpen, setObjectsModalIsOpen] = useState(false);
    const objectsIsLoading = useObjectSearchFormState((state) => state.objectsIsLoading)
    const activeSearch = useObjectSearchFormState((state) => state.activeSearch)
    const setObjects = useObjectSearchFormState((state) => state.setObjects)
    const objects = useObjectSearchFormState((state) => state.objects)
    const setObjectsIsLoading = useObjectSearchFormState((state) => state.setObjectsIsLoading)

    const handleClusterClick = async (object,search) => {
        console.log(activeSearch);
        setObjectsModalIsOpen(true);
        setObjectsIsLoading(true);
        let data = new FormData();
        data.append('search', JSON.stringify(search));
        data.append('cluster', JSON.stringify(object));
        try {
            await fetch('/api/object/map/cluster', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => { setObjects(data.objects) })
                .then(() => setObjectsIsLoading(false))
        } catch (e) {
        }
    }


    return (
        <>
            <YMaps query={{
                load: "package.full",
                lang: "ru_RU",
                // apikey: "e105999a-b1c1-4234-963f-21e492dca418"
            }}>
                <MapWithRemoteObjectManager
                    mapInfo={mapInfo}
                    objectsModalIsOpen={objectsModalIsOpen}
                    setObjectsModalIsOpen={setObjectsModalIsOpen}
                    handleClusterClick={handleClusterClick}
                />
            </YMaps>
            <MapObjectsModal
                objects={objects}
                handleClose={() => setObjectsModalIsOpen(false)}
                isOpen={objectsModalIsOpen}
            />
        </>
    );
}

export default MapObjects;