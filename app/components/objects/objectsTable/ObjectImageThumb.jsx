function ObjectImageThumb({ image, index, handler }) {


    const handleClick = ()=>{
        console.log(index)
        handler(index)
    }

    return (<>
      <img
            className="m-1"
            key={image.src}
            src={image.src}
            onClick={handleClick}
            style={{
                maxHeight: 100
            }}

        />

    </>);
}

export default ObjectImageThumb;