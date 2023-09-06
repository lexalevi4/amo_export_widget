import ObjectCard from "./ObjectCard";

function ObjectList({ objects, formData }) {
    return (<>

        {objects.map((object, index) => {
            return (
                <ObjectCard
                    formData={formData}
                    object={object}
                    key={'object_card_' + object.id}
                />
            )
            // return (<Typography
            //     key={'objects' + object.id}
            // >
            //     {object.id}
            // </Typography>)
        })}
    </>);
}

export default ObjectList;