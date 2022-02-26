import './room.css'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const washColumns = [
  { field: 'number', headerName: 'Number', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 },
  {
    field: 'timeStart',
    headerName: 'Time Start',
    type: 'number',
    width: 100,
  },
  { field: 'timeLeft', 
    headerName: 'Time Left', 
    type: 'number', 
    width: 100 
  },
];

const washRows = [
  { id: 1, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 2, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 3, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
  { id: 4, number: '123', status: 'Full', timeStart: 35, timeLeft: 12 },
];

export default function LaundryPage() {

return (
      /*<head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Zot Laundry</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="room.css">
      </head>*/
      <div>
        <div class="flex-center">
          <h1>Choose a Machine:</h1>
        </div>
        <div className="flex-center">
          <div className="box">
            <h1>Washers</h1>
            <div className="box-table">
              <DataGrid
                rows={washRows}
                columns={washColumns}
              />
            </div>
          </div>
          <div className="box">
            <h1>Dryers</h1>
          </div>
        </div>
      </div>
    );
}