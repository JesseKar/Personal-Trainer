import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';




function AddTraining(props) {
    
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
      date: '',
      duration: '',
      activity: '',
      customer: ''
    });


    // opens window to add training to customer
    const handleClickOpen = () => {
      if (!props.url) {
        alert("Select a customer!");
        return;
      }
      setTraining({
        ...training,
        customer: props.url,
        date: moment().format('yyyy-MM-DDTHH:mm')
      });
      setOpen(true);
    }

    const handleClose = () => {
      setOpen(false);
    }
  
    const handleSave = () => {
      props.addTraining(training);
      setOpen(false);
    }
  
    const inputChanged = (event) => {
      setTraining({ ...training, [event.target.name]: event.target.value });
    }

    return (
        <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}>
          Add Training
        </Button>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add training to {props.name}</DialogTitle>
          <DialogContent>
              <TextField
                  margin="dense"
                  label="Date"
                  name="date"
                  type="datetime-local"
                  value={training.date}
                  onChange={inputChanged}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Duration"
                  name="duration"
                  value={training.duration}
                  onChange={inputChanged}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Activity"
                  name="activity"
                  value={training.activity}
                  onChange={inputChanged}
                  fullWidth
                />
              
            </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
              </Button>
            <Button onClick={handleSave} color="primary">
              Save
              </Button>
          </DialogActions>
      </Dialog>
        </div>
      );
}

export default AddTraining;