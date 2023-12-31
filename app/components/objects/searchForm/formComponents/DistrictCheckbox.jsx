import Box from "@mui/material/Box";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import React, { useMemo } from "react";

function DistrictCheckbox({ district, handleClick, districts }) {

    const checked = useMemo(
        () => {
            return districts.includes(district.id)
        }, [districts, district.id]
    )

    return (
        useMemo(() => (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>

                <FormControlLabel
                    label={district.name}
                    control={
                        <Checkbox
                            data-onclickparam={district.id}
                            checked={checked}
                            value={district.id}
                            onChange={handleClick}
                        />
                    }
                />
            </Box>

        ), [checked, district.id, district.name]))
}

export default DistrictCheckbox;