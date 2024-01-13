import { ImageList, ImageListItem, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";

function ShortObjectCard({ object }) {
    return (<>
        <TableContainer
        className="mb-2"
        >
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <ImageList sx={
                                {
                                    width: 150,
                                    height: 150,
                                    // overflow: 'hidden'
                                }
                            }
                                cols={1}
                            //  rowHeight={164}
                            >
                                {object.list_images.map((item) => (
                                    <ImageListItem
                                        // sx={
                                        //     {

                                        //         overflow: 'scroll'
                                        //     }
                                        // }
                                        key={item.thumb} >
                                        <img
                                            // onClick={() => setOpen(!open)}
                                            srcSet={`${item.thumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                            src={`${item.thumb}?w=164&h=164&fit=crop&auto=format`}
                                            alt={item.thumb}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {object.address}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {object.price}
                            </Typography>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>

    </>);
}

export default ShortObjectCard;