
import Filters from "./Filters";
import ObjectsList from "./ObjectsList";

function ObjectsMobile({ formData, fav = false }) {
    return (<>

        <Filters
            formData={formData}
        />
        <ObjectsList
            // searchParams={searchParams}
            formData={formData}
            fav={fav}

        />

    </>);
}

export default ObjectsMobile;