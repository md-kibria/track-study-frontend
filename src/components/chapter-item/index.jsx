import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box"
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from '../ui/CircularProgressWithLabel'
import dateDiff from '../../utils/dateDistance';

const ChapterItem = ({chapter}) => {
    // console.log(chapter);
    return (
        <Card>
            <CardActionArea>
                <CardContent>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box>
                            <CircularProgressWithLabel value={chapter.completed} />
                        </Box>
                        <Box>
                            <Typography gutterBottom variant="h6" component="h1" sx={{my: 0}}>
                                {chapter.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Left: {`${dateDiff(chapter.end)}${chapter.extra !== 0 ? '(+'+chapter.extra+')' : ''}days`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Target: {`${Math.floor(chapter.time)}${chapter.extra !== 0 ? '(+'+chapter.extra+')' : ''}days`}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ChapterItem