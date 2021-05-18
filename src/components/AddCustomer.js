import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
      props.addCustomer(customer);
      setOpen(false);
    }

    const inputChanged = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Customer
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                label="Firstname"
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Lastname"
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Email"
                name="email"
                value={customer.email}
                onChange={inputChanged}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Phone"
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Streetaddress"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={inputChanged}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Postcode"
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                fullWidth
              />
              <TextField
                margin="dense"
                label="City"
                name="city"
                value={customer.city}
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

export default AddCustomer;