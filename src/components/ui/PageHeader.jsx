import { Button, TextField } from "@mui/material"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import propTypes from 'prop-types'
import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { useStoreActions } from "easy-peasy"
import { toast } from "react-toastify"


const PageHeader = ({title, isTitle}) => {

    const [isForm, setIsForm] = useState(false);
    const [input, setInput] = useState(null);

    const {updateBook, updateChapter} = useStoreActions(state => state.books)

    const [isRes, setIsRes] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                setIsRes(true);
            } else if (window.innerWidth > 600) {
                setIsRes(false);
            }
        });

        if (window.innerWidth < 600) {
            setIsRes(true);
        } else if (window.innerWidth > 600) {
            setIsRes(false);
        }
    }, []);

    useEffect(() => {
        setInput(title)
    }, [title])

    const {id, bookId, chapterId} = useParams()

    const handleToggle = () => {
        setIsForm(!isForm);
    }

    const handleSave = () => {
        if(bookId && chapterId) {
            // changeChapterName(bookId, chapterId, input)
            updateChapter({bookId, chapterId, data: {name: input}})
        } else {
            // Updated book name
            updateBook({bookId: id, data: {name: input}})
        } 

        toast.success("Title updated successfully", {
            position: "bottom-left",
            autoClose: 2000
        })

        // Close the form
        handleToggle()
    }

    if(!isTitle) {
        return (<div style={{margin: isRes ? "0 0 25px 0" : "25px 0", paddingBottom: 1, borderBottom: "1px solid #b0bec5"}}>
            <Typography onDoubleClick={handleToggle} variant="h4" color={'#37474f'} sx={{margin: isRes ? "0 0 10px 0" :"10px 0"}}>
                {title}
            </Typography>
        </div>)
    }

    return (
        <div style={{margin: isRes ? "0 0 25px 0" : "25px 0", paddingBottom: 1, borderBottom: "1px solid #b0bec5"}}>
            {!isForm ? (
                <Typography onDoubleClick={handleToggle} variant="h4" color={'#37474f'} sx={{margin: isRes ? "0 0 10px 0" :"10px 0"}}>
                    {input}
                </Typography>
            ) : (
                <Box sx={{display: 'flex', alignItems: 'center', height: 55, mb: 1}}>
                    <TextField 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        sx={{margin: "10px 0", height: '100%'}}
                    />
                    <Button variant="outlined" sx={{height: '100%', margin: 1}} onClick={handleSave}>Save</Button>
                </Box>
            )}
        </div>
    )
}

PageHeader.propTypes = {
    title: propTypes.string.isRequired
}

export default PageHeader