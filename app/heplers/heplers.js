

export const sortByName = (a, b, field = 'name') => {
    if (a[field] < b[field]) {
        return -1;
    }
    if (a[field] > b[field]) {
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
        vatType: '',
        vat: '',
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
        description: "",
        inputType: '',
        contractType: '',


        businessShoppingCenter_id: '',
        cadNumber: '',
        buildingCadNumber: '',
        images: {
            active: [
            ],
            inactive: [

            ]


        },
        video: '',
        isNewBuilding: false,
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
        garageType: '',
        garageStatus: '',
        garageGarageType: '',
        hasLight: false,
        monthlyIncome: '',
        estateType: '',
        availableFrom: '',
        landAreaUnitType: 1,
        landUseType: '',
        possibleToChangeStatus: false,
        possibleToChangePermitedUseType: false,
        communications: [],
        drivewayType: '',
        minArea: '',
        managementCompany: '',
        developer: '',
        hasTransportServices: false,
        floorMaterialType: '',
        cranTypes: [],
        cranCount: [],
        columnGrid: '',
        tenants: '',
        shoppingCenterScaleType: '',
        workingDaysType: '',
        work_hours_from: '',
        work_hours_to: '',
        work_hours_24: false,
        multiAds: [],
        metro: [],
        highways: [],
        parkingPurposeType: '',
        roomsArea: '',
        hasGracePeriod: false,
        agentBonus: '',
        agentBonusPaymentType: '',
        leaseType: '',
        utilitiesTermsIncludedInPrice: true,
        utilitiesTermsPrice: '',
        flowMetersNotIncludedInPrice: false,
        leaseTermType: '',
        prepayMonths: '',
        // includedOptionsOperationalCosts:false,
        includedOptionsUtilityCharges: false,
        minLeaseTerm: '',
        cplModerationPersonType: '',
        cplModerationLastName: '',
        cplModerationFirstName: '',
        cplModerationSecondName: '',
        cplModerationInn: '',
        cplModerationRosreestrRegistrationNumber: '',
        title: '',
        avitoBussinessType: '',
        newBuildings: [],
        newBuildingHouses: [],

        // yandexBuilding: null,
        // yandexHouse: null,
        // avitoBuilding: null,
        // avitoHouse: null,
        // cianBuilding: null,
        // cianHouse: null,
        locationRegion: '',
        locationDistrict: '',
        locationLocality: '',
        locationStreet: '',
        locationHouse: '',
        metroDistances: [],
        highwayDistances: [],

        // agentFee:''




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

export const checkSession = async (searchParams) => {
    // let data = new FormData();
    // Object.keys(searchParams).forEach((key) => data.append(key, searchParams[key]));

    // try {
    //     await fetch('/api/common/session/', {
    //         method: 'POST',
    //         body: data,
    //     }).then(res => res.json())
    //         .then(data => { console.log(data) })
    //     // setImages_disabled(false);
    // } catch (e) {
    //     console.log(e);
    //     // setSaveError(true);
    //     // setSaveErrorMessage('Что-то пошло не так');

    //     // console
    // }

    return true;

}

export const getFormData = async () => {
    const form_data = await fetch('https://turbobroker.ru/api/get-form-params?asdfaasdf=asdf',
        { next: { revalidate: 0 } })
    return form_data.json()
}