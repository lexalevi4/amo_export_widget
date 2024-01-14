import { Box, Button } from "@mui/joy";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import { useObjectSearchFormState } from "@/app/objects/store";
import { Pagination, PaginationItem } from "@mui/material";
function BaseObjectsPagination() {


    const page = useObjectSearchFormState((state) => state.page);
    const perPage = useObjectSearchFormState((state) => state.perPage);
    const setPage = useObjectSearchFormState((state) => state.setPage);
    const totalCount = useObjectSearchFormState((state) => state.objectsCount);
    const handlePage = (event, value) => {
        setPage(Number(value));
    }

    const handleNext = (event, value) => {
        setPage(page + 1);
    }

    const handlePrev = (event, value) => {
        setPage(page - 1);
    }

    return (
        <>
            <Box
                className="Pagination-laptopUp"
                sx={{
                    gap: 1,
                    [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                    display: {
                        xs: 'none',
                        md: 'flex',
                    },
                    mx: 4,
                    my: 2,
                }}

            >

                <Button
                    disabled={Number(page) === 1}
                    size="sm"
                    variant="plain"
                    color="neutral"
                    startDecorator={<ArrowBackIosRoundedIcon />}
                    onClick={handlePrev}
                >
                    Назад
                </Button>

                <Box sx={{ flex: 1 }} />
                <Pagination
                    onChange={handlePage}
                    page={page}
                    hidePrevButton
                    hideNextButton
                    renderItem={(item) => (
                        <PaginationItem

                            // component={Link}
                            // replace
                            // page={page}

                            // onCha={handlePage}

                            // href={item.page === params.get('page') ? null : '/objects?page=' + item.page + "&" + page_link}
                            // to={`/objects?${`?page=${item.page}`}`}
                            {...item}
                        />
                    )}

                    count={Math.ceil(totalCount / perPage)} />

                {/* {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                    <IconButton
                        key={page}
                        size="sm"
                        variant={Number(page) ? 'plain' : 'soft'}
                        color="neutral"
                    >
                        {page}
                    </IconButton>
                ))} */}
                <Box sx={{ flex: 1 }} />

                <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    endDecorator={<ArrowForwardIosRoundedIcon />}
                    disabled={Math.ceil(totalCount / perPage) === page}
                    onClick={handleNext}
                >
                    Вперёд
                </Button>

            </Box>
        </>
    );
}

export default BaseObjectsPagination;