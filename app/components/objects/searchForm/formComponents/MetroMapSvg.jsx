import { ReactComponent as Metro } from '../../../../../public/metro.svg';

function MetroMapSvg() {
    return (<>

        <div
            className='m-3 p-2 pt-5 pb-5'
            style={{

            }}
        >
            <div

                className='m-3 p-2 mt-5 mb-5'
                style={{
                    // transform: 'scale(1.5)'
                    // cursor: '-webkit-grab',
                    width: '1235px',
                    marginTop: 109,
                    marginBottom: 80,
                    marginLeft: 39,

                }}
            >
                <img src="/metro.svg" alt="An SVG of an eye" />
                {/* <Metro /> */}
            </div>
        </div>

    </>);
}

export default MetroMapSvg;