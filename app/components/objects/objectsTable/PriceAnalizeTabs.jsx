// import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
// import '../css/style.css'


import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";


import HelpIcon from '@mui/icons-material/Help';
import PriceAnalyzeTableRows from './PriceAnalizeTableRows';
import { Box } from '@mui/material';

const PriceAnalizeTabs = function ({ flat }) {

    const positions = flat.positions;

    {
        console.log(flat.positions)
    }


    // const positions_labels = [null, null, null, null, null, null, null, null, null, null, null]
    // const positions_district_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    // const positions_district_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]
    // const positions_okrug_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]
    // const positions_okrug_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    // const positions_town_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    // const positions_town_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]


    const positions_values = {
        year_build_type: 'Год',
        floors_type: 'Этажность',
        material_type_str: 'Материал',
        area_type: 'Площадь',
        kitchen_type: 'Кухня',

    }


    const handlePriceDescModal = () => {
        // dispatch(updateAppParam({ field: 'price_desc_modal_open', value: !price_desc_modal_open }))
    }

    const printLabel = (item) => {
        if (item.x === '' && item.hue === '') {
            return "Вся выборка"
        }
        let label = positions_values[item.x] + "\n" + item.x_value;
        if (item.hue !== '') {
            label = label + "\n" + positions_values[item.hue] + "\n" + item.hue_value;
        }
        return label;
    }


    return (
        <>
            <Box
                className='p-2'
                style={{
                    maxWidth:'90svw',
                    objectFit:'contain'
                }}


            >
                <Button
                    style={{
                        textTransform: 'none',
                    }}
                    // aria-describedby={id}

                    // className='ml-5 mr-5 '
                    className='m-2 '
                    // size="small"
                    color="primary"
                    // variant="contained"
                    // type="button" 
                    // endIcon={}
                    onClick={handlePriceDescModal}>
                    <HelpIcon size='8px' />Анализ цены:

                </Button>


                <Tabs
                    size="sm"
                    aria-label="Pricing plan"
                    defaultValue={0}

                    sx={(theme) => ({
                        // width: 343,
                        '--Tabs-gap': '0px',
                        borderRadius: 'lg',
                        boxShadow: 'sm',
                        overflow: 'auto',
                        objectFit: "contain",
                        border: `1px solid ${theme.vars.palette.divider}`,
                    })}
                >
                    <TabList
                        style={{
                            // display:"flex",
                            // position:'absolute',
                            // overflow: "auto",
                            // width: '100%',
                            // maxWidth: 1000
                        }}
                        sx={{
                            '--ListItem-radius': '0px',
                            borderRadius: 0,
                            [`& .${tabClasses.root}`]: {
                                fontWeight: 'lg',
                                flex: 1,
                                bgcolor: 'background.body',
                                position: 'relative',
                                [`&.${tabClasses.selected}`]: {
                                    color: 'primary.500',
                                },
                                [`&.${tabClasses.selected}:before`]: {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: -1,
                                    width: '100%',
                                    height: 2,
                                    bgcolor: 'primary.400',
                                },
                                [`&.${tabClasses.focusVisible}`]: {
                                    outlineOffset: '-3px',
                                },
                            },
                        }}

                    >
                        <Tab>За квартиру</Tab>
                        <Tab>За квадрат</Tab>

                    </TabList>

                    <hr />

                    <TabPanel className='mb-3' value={0}
                        style={{
                            // display:"flex",
                            // position:'absolute',
                            overflow: "auto",
                            // width: '100%',
                            // maxWidth: 1000
                        }}
                    >
                        <TableContainer component={Paper}
                            style={{
                                // overflow: "auto",
                                // overflowX: 'scroll'
                                // maxWidth: 1000
                            }}  >
                            <Table
                                sx={{
                                    // position:"absolute",
                                    overflow: "auto",
                                    // width: 'max-content'
                                }}

                                size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            className='pre_line'

                                        >Глубина
                                        </TableCell>
                                        {flat.positions.price.district.map((position, index) => {
                                            console.log('asdfasdf');
                                            return (

                                                <TableCell key={'1_head_' + index + "_" + flat.id} className='pre_line' >
                                                    {printLabel(position)}
                                                </TableCell>

                                            )
                                        })
                                        }
                                    </TableRow >
                                </TableHead>
                                <TableBody>
                                    <PriceAnalyzeTableRows
                                        flat={flat}
                                        param={'price'}
                                    />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel className='mb-3' value={1}>
                        <TableContainer component={Paper}
                            style={{
                                // maxWidth: 1000
                            }}
                        >
                            <Table
                                sx={{
                                    // width: 'max-content'
                                    overflow: "auto"
                                }}

                                size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            className='pre_line'

                                        >Глубина
                                        </TableCell>
                                        {flat.positions.price.district.map((position, index) => {
                                            return (

                                                <TableCell key={'1_head_' + index + "_" + flat.id} className='pre_line' >
                                                    {printLabel(position)}
                                                </TableCell>

                                            )
                                        })
                                        }
                                    </TableRow >
                                </TableHead>
                                <TableBody>
                                    <PriceAnalyzeTableRows
                                        flat={flat}
                                        param={'price_per_meter'}
                                    />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>


                </Tabs>

            </Box>
        </>
    );







}
export default PriceAnalizeTabs;