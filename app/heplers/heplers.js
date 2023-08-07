

export const sortByName = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export const new_object = () => {

    return {
        deal_type: null,
        category: null,
        object: '',
        address: '',
        lat: '',
        lng: '',
        dadata_response: null,
        floor: '',
        floorsCount: '',
        flatNumber: '',
        rooms: null,
        material: '',
        totalArea: '',
        livingArea: '',
        kitchenArea: '',
        landArea: '',
        balconiesCount: '',
        loggiasCount: '',
        buildYear: '',
        price: '',
        deposit: '',
        fee: '',
        isByHomeowner: false,
        cargoLiftsCount: '',
        passengerLiftsCount: '',
        childrenAllowed: false,
        petsAllowed: false,
        hasBathhouse: false,
        hasBathtub: false,
        hasShower: false,
        hasConditioner: false,
        hasDishwasher: false,
        hasFridge: false,
        hasFurniture: false,
        hasKitchenFurniture: false,
        hasTv: false,
        hasWasher: false,
        repair: '',
        isApartments: false,
        deadline: '',
        plan: '',
        separateWcsCount: '',
        combinedWcsCount: '',
        saleType: 1,
        newbuilding_id: '',
        newbuilding_house_id: '',
        isComplete: false,
        decoration: '',
        hasDrainage: false,
        drainageType: '',
        hasElectricity: false,
        electricityType: '',
        hasEncumbrances: false,
        hasEquipment: false,
        hasExcursions: false,
        hasExtinguishingSystem: false,
        hasGarage: false,
        hasGas: false,
        gasType: '',
        hasHeating: false,
        hasInvestmentProject: false,
        hasLift: false,
        hasParking: false,
        hasPhone: false,
        hasPool: false,
        hasRamp: false,
        hasSafeCustody: false,
        hasSecondedDocs: false,
        hasSecurity: false,
        hasShopWindows: false,
        hasWater: false,
        waterType: '',
        hasWiredInternet: false,
        isCustoms: false,
        isMulti: false,
        isOccupied: false,
        isPenthouse: false,
        vatIncluded: false,
        accessType: '',
        vat_type: '',
        heatingType: '',
        buildingType: '',
        bedroomsCount: '',
        kp_id: '',
        landType: '',
        landStatus: '',
        landCategory: '',
        layout: '',
        windowsStreet: false,
        windowsYard: false,
        windowsSunny: false,
        placementType: '',
        condition: '',
        description: "<p>asdfasdf</p>\
        <p>asdf</p>\
        <p>asdf</p>\
        <p></p>",
        inputType: '',
        contractType: '',
        inputType: '',

        businessShoppingCenter_id: '',
        cadNumber: '',
        buildingCadNumber: '',
        images: [
            { filename: 'https://tb-widget-images.storage.yandexcloud.net/full/1adbb4fe-ef21-4389-b055-9da7068f8787.jpg', order: 0 },
            { filename: 'https://tb-widget-images.storage.yandexcloud.net/full/b64656b1-e722-4da5-bfcc-a4249ede1f95.jpg', order: 1 },
            { filename: 'https://tb-widget-images.storage.yandexcloud.net/full/5cf7309a-1f8b-4c26-ab53-28d5fb0ef407.jpg', order: 2 },
            
            
    ],
        // images: ['1adbb4fe-ef21-4389-b055-9da7068f8787.jpg'],
        video: '',
        isNewBuilding: '',
        deadlineQuarter: '',
        deadlineYear: '',
        mortgageAllowed: false,
        currency: 1,
        parking: '',
        isEuroFlat: false,
        isPenthouse: false,
        roomsForSale: '',
        shareAmount: '',
        kpName: '',
        isLandWithContract: false,
        wcLocationType: '',
        wcsCount: '',
        hasTerrace: false,
        hasCellar: false,
        buildingName: '',
        buildingType: '',
        buildingClass: '',
        buildingTotalArea: '',
        parkingPlacesCount: '',
        parkingPlacesPrice: '',
        parkingIsFree: false,
        ceilingHeight: '',
        houseLineType: '',
        ventilationType: '',
        conditioningType: '',
        extinguishingSystemTypes: [],
        liftTypes: [],
        liftsCount: [],
        buildingStatusType: '',
        infrastructure: [],
        taxNumber: '',
        isLegalAddressProvided: false,
        freeMonth: '',
        freeYear: '',
        waterPipesCount: '',
        power: '',
        speciality: [],



    }


}
export const chunkArray = (inputArray, perChunk) => {

    const result = inputArray.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    return result;
}

export const multiSwitchHandler = (value, setter, state) => {
    let arr = [];
    state.map(function (item, index) {
        arr.push(item);
        return true;
    })
    if (arr.includes(value)) {
        arr.splice(arr.indexOf(value), 1)
    } else {
        arr.push(value)
    }
    setter(arr)
}