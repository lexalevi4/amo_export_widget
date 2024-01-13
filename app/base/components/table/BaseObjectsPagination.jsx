import { Box, Button } from "@mui/joy";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import { useObjectSearchFormState } from "@/app/objects/store";
function BaseObjectsPagination() {

    
    const page = useObjectSearchFormState((state) => state.page);

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
                >
                    Назад
                </Button>

                <Box sx={{ flex: 1 }} />
                {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
                    <IconButton
                        key={page}
                        size="sm"
                        variant={Number(page) ? 'plain' : 'soft'}
                        color="neutral"
                    >
                        {page}
                    </IconButton>
                ))}
                <Box sx={{ flex: 1 }} />

                <Button
                    size="sm"
                    variant="plain"
                    color="neutral"
                    endDecorator={<ArrowForwardIosRoundedIcon />}
                >
                    Вперёд
                </Button>

            </Box>
        </>
    );
}

export default BaseObjectsPagination;