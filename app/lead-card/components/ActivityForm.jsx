import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
// import { createActivity } from "../actions";
import { sendApiRequest } from "@/app/services/actions";

function ActivityForm({ leadId, addActivity }) {

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState('');
    // const [date, setDate] = useState('');
    const [price, setPrice] = useState(0);
    const [text, setText] = useState('');
    const [updating, setUpdating] = useState(false);


    const handleSubmit = async () => {
        setUpdating(true);
        const result = await sendApiRequest('post', 'api/create-lead-activity', { name: name, price: price, text: text, leadId: leadId })
        console.log(result);
        if (result.status === 'ok') {
            addActivity(result.activity)
        }
        setPrice(0);
        setText('')
        setName('')
        setShowForm(false)
        setUpdating(false);
        // createActivity({ name: name, price: price, text: text }, leadId)
    }

    return (<>


        <Box


        >
            <Divider
                className="my-10"
            />
            {/* <Typography
                className="my-10"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}

                variant='h5'
            >
                Добавить активность
            </Typography> */}
            <Button
                onClick={() => setShowForm(!showForm)}
            >
                {!showForm && ("Добавить активность")}
                {showForm && ("Скрыть форму")}

            </Button>
            {showForm && (
                <Paper
                    className=" container mx-auto my-10 py-10"
                >
                    <Grid
                        className="my-10"
                        container
                        spacing={2}
                    >
                        <Grid
                            className="p-5"
                            item
                        >
                            <TextField
                                required
                                id="new_activity_name"
                                label="Название"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                            />
                        </Grid>
                        <Grid
                            className="p-5"
                            item>

                            <TextField

                                id="outlined-new_activity_price"
                                label="Расход"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}

                            />
                        </Grid>

                        <Grid item
                            className="p-5"
                        >

                            <TextField
                                style={{
                                    width: 400
                                }}
                                id="outlined-new_activity_text"
                                label="Описание"
                                value={text}

                                onChange={(e) => setText(e.target.value)}
                                multiline
                                rows={4}
                            />

                        </Grid>




                        <Grid className="p-5"
                            item>

                            <Button
                                disabled={name === '' || name === null || updating}
                                variant="contained"
                                onClick={handleSubmit}
                            >
                                Добавить
                            </Button>
                        </Grid>

                    </Grid>





                </Paper>
            )}



        </Box>


    </>);
}

export default ActivityForm;