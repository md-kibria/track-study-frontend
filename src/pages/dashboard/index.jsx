import PageHeader from "../../components/ui/PageHeader"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Alert from '@mui/material/Alert';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Link as RouterLink } from "react-router-dom";
import { Button, Link } from "@mui/material";

const Dashboard = () => {
    return (
        <>
            <PageHeader title="Dashoboard" />
            <Alert severity="info">
                <Box sx={{display: 'flex'}}>
                    <ConstructionIcon sx={{fontSize: 22}}/>
                    <Typography sx={{ml: 1}} variant="body1">
                        We are working on this page
                    </Typography>
                </Box>
            </Alert>

            <Link to="/books" sx={{textDecoration: "none"}} component={RouterLink}>
                <Button color="primary" variant="contained" size="small" sx={{my: 2}} >Go to books page</Button>
            </Link>
        </>
    )
}

export default Dashboard