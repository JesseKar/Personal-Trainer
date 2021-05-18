import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

const Trainings = () => {
    
    const [trainings, setTrainings] = useState([{customer: ''}]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchTrainings();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    // fetch trainings from database
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings/')
        .then(Response => Response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (id) => {
        if(window.confirm('Are you sure you want to delete training?')) {
            fetch('https://customerrest.herokuapp.com/api/trainings/' + id, 
            { method: 'DELETE' })
            .then(response => {
                if(response.ok) {
                    fetchTrainings();
                    setMsg('Training deleted');
                    openSnackBar();
                }
                else {
                    alert('Delete failed!')
                }
            })
            .catch(err => console.error(err))
        }
    }

    // format date with moment.js
    const dateFormat = (params) => {
        return moment(params.value).format('DD/MM/YYYY');
    }

    // construct full name from first & last
    const fullName = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const columns = [
        { 
            headerName: '',
            field: 'id',
            width: 80,
            cellRendererFramework:  params => 
                <IconButton 
                    color='secondary'
                    onClick={() => deleteTraining(params.value)} >
                    <DeleteIcon />
                </IconButton>
        },
        { headerName: "Date", field: 'date', valueFormatter: dateFormat, type: 'rightAligned', sortable: true, filter: true, width: 150},
        { headerName: "Duration", field: 'duration', type: 'rightAligned', sortable: true, filter: true, width: 150},
        { headerName: "Activity", field: 'activity', type: 'rightAligned', sortable: true, filter: true, width: 200},
        { headerName: "Customer", field: 'customer', valueGetter: fullName, type: 'rightAligned', sortable: true, filter: true, width: 200},
    ]

    // table settings
    const gridOptions = {
        columnDefs: columns,
        pagination: true,
        paginationPageSize: 10,
        animateRows: true,
        suppressCellSelection: true
    }

  return (
    <div>
      <div className="ag-theme-material" style={{ height: 610, width: '90%', margin: 'auto'}}>
            <AgGridReact
                gridOptions={gridOptions}
                rowData={trainings}
                
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

export default Trainings;