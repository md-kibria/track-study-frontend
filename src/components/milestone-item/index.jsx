import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import { CheckCircle, CheckCircleOutline } from '@mui/icons-material';

const MilestoneItem = ({milestone}) => {
    // console.log(milestone);
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box>
                            {
                                milestone.isDone 
                                ? <CheckCircle sx={{height: 40, width: 40}} color="success" />
                                : <CheckCircleOutline sx={{height: 40, width: 40, color: '#9e9e9e47'}} />
                            }
                        </Box>
                        <Box>
                            <Typography gutterBottom variant="h6" component="h1" sx={{my: 0}}>
                                {milestone.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Pages: {milestone.pages ? Math.floor(milestone.pages) : 'Not required'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Target: {`${Math.floor(milestone.time)}${milestone.extra !== 0 ? '(+'+milestone.extra+')' : ''}days`}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default MilestoneItem