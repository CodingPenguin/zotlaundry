import './room.css'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const washColumns = [
  { field: 'number', headerName: 'Number', flex: 0},
  { field: 'status', headerName: 'Status', flex: 0},
  {
    field: 'timeStart',
    headerName: 'Time Start',
    type: 'number', 
    flex: 0
  },
  { field: 'timeLeft', 
    headerName: 'Time Left', 
    type: 'number', 
    flex: 0
  },
];

const washRows = [
  { id: 1, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 2, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 3, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 4, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
];

const dryColumns = [
  { field: 'number', headerName: 'Number', flex: 0 },
  { field: 'status', headerName: 'Status', flex: 0 },
  {
    field: 'timeStart',
    headerName: 'Time Start',
    type: 'number', 
    flex: 0
  },
  { field: 'timeLeft', 
    headerName: 'Time Left', 
    type: 'number', 
    flex: 0
  },
];

const dryRows = [
  { id: 1, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 2, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 3, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 4, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
];

export default function LaundryPage() {

return (
      <div>
        <div class="flex-bottom-middle">
          <h1 className='header'>Current Machines</h1>
        </div>
        <div className="flex-center">
          <div className="box">
            <h1>Washers</h1>
            <div className="box-table">
              <DataGrid
                rows={washRows}
                columns={washColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
          <div className="box">
            <h1>Dryers</h1>
            <div className="box-table">
              <DataGrid
                rows={dryRows}
                columns={dryColumns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>
        <div className="flex-center">
          <Button variant="contained" className="button-form">Add Machine</Button>
          <div id="divider"></div>
          <Button variant="contained" className="button-form">Update Machine</Button>
        </div>
      </div>
    );
}