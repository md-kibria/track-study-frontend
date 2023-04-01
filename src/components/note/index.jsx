import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useStoreActions } from 'easy-peasy';
import { toast } from 'react-toastify';

const Note = ({open, handleClose, note, bookId, chapterId, milestoneId}) => {
  const {updateBook, updateChapter, updateMilestone} = useStoreActions(state => state.books)

  const [input, setInput] = useState({
    prev: note,
    curr: note,
  })

  useEffect(() => {
    setInput({
      prev: note,
      curr: note,
    })
  }, [note])

  const handleSave = () => {
    // handleNote(input.curr, bookId, chapterId, milestoneId)
    if(milestoneId) {
      updateMilestone({bookId, chapterId, milestoneId, data: {note: input.curr}})
    } else if(chapterId) {
      updateChapter({bookId, chapterId, data: {note: input.curr}})
    } else {
      updateBook({bookId, data: {note: input.curr}})
    }

    toast.success("Note updated successfully", {
        position: "bottom-left",
        autoClose: 2000
    })
    setInput({...input, prev: input.curr})
    handleClose()
  }

  const handleCancel = () => {
    setInput({...input, curr: input.prev})
    handleClose()
  }

  const handleChange = (e) => {
    setInput({
      ...input,
      curr: e.target.value
    })
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Notes</DialogTitle>
        <DialogContent style={{width: '500px'}}>
          <DialogContentText>
           
          </DialogContentText>
          <textarea
            value={input.curr}
            onChange={handleChange}
            style={{
                width: '100%',
                minHeight: '300px',
                padding: 10,
                fontFamily: 'Roboto, sans-serif',
                resize: 'vertical',
                fontSize: 15
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Note