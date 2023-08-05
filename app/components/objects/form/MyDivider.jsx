import { Divider, Typography } from "@mui/material";

function MyDivider({ title, className = 'my-5' }) {
    return (
        <>
            <Divider className={className} />

            <Typography
                variant="h6"
                color='GrayText'
            >
                {title}
            </Typography>
        </>
    );
}

export default MyDivider;