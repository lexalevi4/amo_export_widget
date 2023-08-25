import MyDivider from "@/app/components/objects/form/MyDivider";
// import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { Alert, Avatar, Box, Button, Divider, FormControl, LinearProgress, Snackbar, Stack, TextField, Typography } from "@mui/material";
// import { data } from "autoprefixer";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { useSettingsState } from "../store";

function UserSettings({ user, handleShow }) {

    const [firstName, setFirstName] = useState(user.firstname || '');
    const [middleName, setMiddleName] = useState(user.middlename || '');
    const [lastName, setLastName] = useState(user.lastname || '');
    const [image, setImage] = useState(user.image || '');
    const [phone, setPhone] = useState(user.phone || '');
    const [file, setFile] = useState(user.phone || '');

    const [images_disabled, setImages_disabled] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [failSnackbarOpen, setFailSnackbarOpen] = useState(false);
    const setter = useSettingsState((state) => state.updateSettings);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleCloseFailSnackbar = () => {
        setFailSnackbarOpen(false);
    }


    const handleUpdateUser = async () => {
        setButtonDisabled(true);
        const data = new FormData();
        data.append('user', JSON.stringify({
            id: user.id,
            firstname: firstName,
            middlename: middleName,
            lastname: lastName,
            phone: phone,
            image: image
        }))
        try {
            const res = await fetch('/api/settings/users/update', {
                method: "POST",
                body: data


            })
            const response_data = await res.json()
            if (response_data.status === 'ok') {
                await setter('users',
                    {
                        id: user.id,
                        firstname: firstName,
                        middlename: middleName,
                        lastname: lastName,
                        phone: phone,
                        image: image
                    }
                )
                setSnackbarOpen(true);
            } else {
                setFailSnackbarOpen(true);
            }
        } catch (e) {
            setFailSnackbarOpen(true);
        }
        setButtonDisabled(false);


    }



    const handleUpload = async (value) => {
        setImages_disabled(true)
        let data = new FormData();
        console.log(value)
        data.append('file', value, value.name);
        try {
            await fetch('/api/object/images', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => setImage(data[0]))
            setImages_disabled(false);
        } catch (e) {
            setFailSnackbarOpen(true);
        }
    }


    return (<>
        <Stack spacing={2}>
            <Stack
                direction={'row'}
                spacing={2}
            >   <Stack
                direction={'row'}
                spacing={2}
            >
                    <FormControl
                    >
                        < TextField
                            id={'username-' + user.id}
                            label={'Имя'}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </FormControl>
                </Stack>
                <FormControl
                >
                    < TextField
                        id={'usermiddlename-' + user.id}
                        label={'Отчество'}
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />
                </FormControl>

                <FormControl
                >
                    < TextField
                        id={'userlastname-' + user.id}
                        label={'Фамилия'}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </FormControl>


            </Stack>
            <Stack
                direction={'row'}
                spacing={2}
            >
                <FormControl
                >
                    < TextField
                        id={'userphone-' + user.id}
                        label={'Телефон'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </FormControl>


            </Stack>

            <Typography
                variant="h6"
                color='GrayText'
            >
                Фото
            </Typography>
            {/* <MyDivider
                title={'Фото'}
            /> */}

            {image !== '' && (
                <>
                    <Avatar
                        alt={firstName + lastName}
                        src={"https://tb-widget-images.storage.yandexcloud.net/mid/" + image}
                        sx={{ width: 200, height: 200 }}
                    />
                    {/* <Divider /> */}
                    <Button
                        onClick={() => setImage('')}
                        variant="outlined"
                        color='error'
                        style={{
                            width: 100,
                            alignItems: "flex-start",
                            alignContent: 'start',
                            justifyContent: 'start'

                        }}
                    >Удалить</Button>
                    {/* {image} */}

                </>

            )}

            {
                images_disabled && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )
            }
            <MuiFileInput
                style={{
                    width: 300
                }}
                inputProps={{ accept: '.png, .jpeg, .jpg' }}
                width={300}
                // multiple

                disabled={images_disabled}
                value={file}
                onChange={handleUpload}
            />
            <Divider className="my-5" />

            <Stack
                direction={'row'}
                spacing={2}
            >
                <Button
                    disabled={buttonDisabled}
                    onClick={handleUpdateUser}
                    variant="contained"
                >
                    Сохранить
                </Button>
                <Button
                    onClick={() => {
                        setFirstName(user.firstname);
                        setLastName(user.lastname);
                        setMiddleName(user.middlename);
                        setPhone(user.phone);
                        setImage(user.image);
                        handleShow();
                    }}
                    color="error"
                    variant="contained"
                >
                    Отмена
                </Button>
            </Stack>
            <Snackbar
                // className='mb-10'
                style={{
                    marginBottom: '60px'
                }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            // style={}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Отправлено
                </Alert>
            </Snackbar>
            <Snackbar
                // className='mb-10'
                style={{
                    marginBottom: '60px'
                }}
                open={failSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseFailSnackbar}
            // style={}
            >
                <Alert onClose={handleCloseFailSnackbar} severity="error" sx={{ width: '100%' }}>
                    Что-то пошло не так...
                </Alert>
            </Snackbar>
        </Stack >
    </>);
}

export default UserSettings;