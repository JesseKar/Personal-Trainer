import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import Snackbar from '@material-ui/core/Snackbar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const Customers = () => {
    
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [selection, setSelection] = useState({});

    useEffect(() => {
        fetchCustomers();
    }, []);

    // fetch customers from database
    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(Response => Response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    // add new customer
    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    } 

    // edit existing customer
    const updateCustomer = (url, editedCustomer) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(editedCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.error(err))
    }

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    // delete existing customer 
    const deleteCustomer = (url) => {
        if(window.confirm('Are you sure you want to delete customer?')) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                    setMsg('Customer deleted');
                    openSnackBar();
                }
                else {
                    alert('Delete failed!')
                }
            })
            .catch(err => console.error(err))
        }
    }

    // add new training to selected customer
    const addTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            body: JSON.stringify(training),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => {
            setMsg('Training added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    // simplify address
    const fullAddress = (params) => {
        return params.data.city + ', ' + params.data.postcode + ', ' + params.data.streetaddress;
    }

    // construct full name from first & last
    const fullName = (params) => {
        return params.data.firstname + ' ' + params.data.lastname;
    }

    // columns to show
    const columns = [
        // Edit
        { 
            headerName: '',
            field: 'links.0.href',
            width: 80, 
            cellRendererFramework: params => 
                <EditCustomer 
                link={params.value} 
                customer={params.data}
                updateCustomer={updateCustomer}/>
         },
         // Delete
         { 
            headerName: '',
            field: 'links.0.href',
            width: 80,
            cellRendererFramework:  params => 
                <IconButton 
                    color='secondary'
                    onClick={() => deleteCustomer(params.value)} >
                    <DeleteIcon />
                </IconButton>
                
        },
        { headerName: 'Customer', field: 'customer', valueGetter: fullName, type: 'rightAligned', sortable: true, filter: true, width: 200},
        { field: 'email', type: 'rightAligned', sortable: true, filter: true, width: 200},
        { field: 'phone', type: 'rightAligned', sortable: true, filter: true, width: 200},
        { headerName: 'Address', field: 'address', valueGetter: fullAddress, type: 'rightAligned', sortable: true, filter: true, width: 300},
    ]

    // settings for table
    const gridOptions = {
        columnDefs: columns,
        pagination: true,
        paginationPageSize: 10,
        animateRows: true,
        rowSelection: 'single',
        onRowClicked: event => setSelection(event.data)
    }

    

  return (
    <div>
        <AddCustomer addCustomer={addCustomer} />
        <AddTraining 
            url={selection.links?.[0].href}
            name={selection.firstname + ' ' + selection.lastname}
            addTraining={addTraining}
        />
      <div className="ag-theme-material" style={{ height: 610, width: '90%', margin: 'auto'}}>
            <AgGridReact
                rowData={customers}
                gridOptions={gridOptions}
            />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={closeSnackBar}
            message={msg}
        />
    </div>
  );
};

export default Customers;