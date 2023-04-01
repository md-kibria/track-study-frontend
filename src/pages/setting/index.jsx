import PageHeader from "../../components/ui/PageHeader"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Alert from '@mui/material/Alert';
import ConstructionIcon from '@mui/icons-material/Construction';

const Setting = () => {
    return (
        <>
            <PageHeader title="Setting" />
            <Alert severity="info">
                <Box sx={{display: 'flex'}}>
                    <ConstructionIcon sx={{fontSize: 22}}/>
                    <Typography sx={{ml: 1}} variant="body1">
                        We are working on this page
                    </Typography>
                </Box>
            </Alert>
        </>
    )
}

export default Setting