'use client'
import { Button, ButtonGroup, Stack } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { useEffect, useState } from "react";
import MobileForm from "../mobileForm/MobileForm";
import { useObjectSearchFormState } from "@/app/objects/store";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MapIcon from '@mui/icons-material/Map';

function Filters({ formData }) {

    const [formIsOpen, setFormIsOpen] = useState(false);
    const setFormData = useObjectSearchFormState((state) => state.setFormData);
    const pageType = useObjectSearchFormState((state) => state.pageType);
    const setActiveSearch = useObjectSearchFormState((state) => state.setActiveSearch);
    const setSearch = useObjectSearchFormState((state) => state.setSearch);
    const search = useObjectSearchFormState((state) => state.search);
    useEffect(() => {
        setFormData(formData)

    }, [])
    const handleForm = () => {
        setFormIsOpen(!formIsOpen)
    }

    const handlePageType = () => {

    }



    return (<>
        {/* <Stack
            style={{
                width: '100%'
            }}
            direction={'row'}
        > */}
            <ButtonGroup
                style={{
                    width: '100%'
                }}
            >
                <Button
                    className='pre_line'
                    onClick={handleForm}

                    style={{
                        // textDecoration: 'none',
                        // textTransform: 'none',
                        // whiteSpace: 'nowrap',
                        width: '100%'
                    }}
                >
                    <FilterAltIcon />
                    Фильтр

                </Button>
                <Button
                    style={{
                        // textDecoration: 'none',
                        // textTransform: 'none',
                        // whiteSpace: 'nowrap',
                        width: '100%'
                    }}
                    
                    onClick={handlePageType}
                >
                    {
                        pageType === 'list' ?
                            <><MapIcon />
                                Карта
                            </>
                            :
                            <><FormatListBulletedIcon />Список</>

                    }

                </Button>
                
            </ButtonGroup>

        {/* </Stack> */}
        <MobileForm
            isOpen={formIsOpen}
            handleClose={handleForm}
            formData={formData}
        />
    </>);
}

export default Filters;