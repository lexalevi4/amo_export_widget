import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Dropdown from '@mui/joy/Dropdown';
import { useState } from 'react';

export default function OrderSelector() {
    const [sort, setSort] = useState('По дате')
    return (
        <Dropdown>
            <MenuButton
                variant="plain"
                color="primary"
                endDecorator={<ArrowDropDown />}
                sx={{ whiteSpace: 'nowrap' }}
            >
                Сортировка ({sort})
            </MenuButton>
            <Menu sx={{ minWidth: 120 }}>
                <MenuItem
                    onClick={() => {
                        setSort("По дате");
                    }}
                >
                    По дате
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setSort("По цене");
                    }}
                >
                    По цене
                </MenuItem>
                {/* <MenuItem>Rating</MenuItem> */}
            </Menu>
        </Dropdown>
    );
}