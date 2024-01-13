import { sendApiRequest } from "@/app/services/actions"
import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"

function ReportData({ reportData }) {

    const [result, setResult] = useState(reportData.result)
    const [plans, setPlans] = useState(reportData.plans)
    const [recommendations, setRecommendations] = useState(reportData.recommendations)
    const [min_price, setMinPrice] = useState(reportData.min_price)
    const [max_price, setMaxPrice] = useState(reportData.max_price)
    const [summaryUpdating, setSummaryUpdating] = useState(false);
    // console.log(reportData);

    const handleSubmitSummary = async () => {
        setSummaryUpdating(true);
        await sendApiRequest('post', 'api/update-amo-lead-report-summary', {
            leadId: reportData.amo_lead_id,
            result: result,
            plans: plans,
            recommendations: recommendations
        })
        setSummaryUpdating(false);
    }

    return (<>

        <Divider
            className="my-10"
        />
        <Typography
            className="my-10"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}

            variant='h5'
        >
            Итоги
        </Typography>
        <Box
            className="mt-10"

        >
            <Grid container spacing={2}
            >
                <Grid item xs={12} md={4}>
                    <Box>
                        <TextField
                            rows={5}
                            label="Сделано"
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            multiline
                            // maxRows={8}
                            fullWidth

                        />

                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box>
                        <TextField
                            rows={5}
                            label="Планы"
                            value={plans}
                            onChange={(e) => setPlans(e.target.value)}
                            multiline
                            // maxRows={8}
                            fullWidth

                        />

                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box
                        className="text-end"
                    >
                        <TextField
                            rows={5}
                            label="Рекомендации"
                            value={recommendations}
                            onChange={(e) => setRecommendations(e.target.value)}
                            multiline
                            // maxRows={8}
                            fullWidth

                        />
                        <Button
                            disabled={summaryUpdating}
                            onClick={handleSubmitSummary}
                            className="mt-5 text-end"
                            variant="contained"
                        >
                            Сохранить
                        </Button>
                    </Box>
                </Grid>

            </Grid>

        </Box>

        


    </>);
}

export default ReportData;