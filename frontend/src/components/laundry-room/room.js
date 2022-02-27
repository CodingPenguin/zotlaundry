import './room.css'

import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import axios from 'axios';

const washColumns = [
  { 
    field: 'number',
    headerName: 'Number',
    flex: 0
  },
  {
    field: 'state',
    headerName: 'Status',
    type: 'text',
    flex: 0
  },
  {
    field: 'startTime',
    headerName: 'Time Start',
    type: 'number', 
    flex: 0
  },
  { 
    field: 'remainingTime', 
    headerName: 'Time Left', 
    type: 'number', 
    flex: 0
  },
];

const dryColumns = [
  { field: 'number', headerName: 'Number', flex: 0 },
  { field: 'state', headerName: 'Status', flex: 0 },
  {
    field: 'startTime',
    headerName: 'Start Time',
    type: 'number', 
    flex: 0
  },
  { 
    field: 'remainingTime', 
    headerName: 'Time Left', 
    type: 'number', 
    flex: 0
  },
];

export default function LaundryPage() {
  const [community, setCommunity] = useState();
  const [floor, setFloor] = useState()

  const [washRows, setWashRows] = useState([]);
  const [dryRows, setDryRows] = useState([]);

  useEffect(() => {
    let query = JSON.parse(localStorage.getItem("inputField"));

    if (query['community'] === 'mc') {
      setCommunity('Mesa Court')
    } else if (query['community'] === 'me') {
      setCommunity('Middle Earth')
    }

    setFloor(query['floor']);

    const addMachineData = (data) => {
      for (let i = 0; i < data.length; i++) {
        data[i]['state'] = data[i]['state'][0].toUpperCase() + data[i]['state'].substring(1)

        const finishedTime = data[i]['startTime'] + data[i]['remainingTime']; // time needs to be in ms
        const currentTime = new Date().getTime();
        const realRemainingTime = (finishedTime - currentTime) / 60000

        let machine = {
          id: data[i]['_id'],
          number: data[i]['number'],
          state: data[i]['state'],
          startTime: data[i]['startTime'],
          remainingTime: realRemainingTime,
        }
    
        if (data[i]['type'] === 'washer') {
          setWashRows(washRows => [
            ...washRows,
            machine
          ]);
        } else if (data[i]['type'] === 'dryer') {
          setDryRows(dryRows => [
            ...dryRows,
            machine
          ]);
        }
      }
    }

    const url = `http://127.0.0.1:5000/machines?community=${query['community']}&floor=${query['floor']}`;
    axios.get(url)
      .then(
        response => addMachineData(response['data'])
      )
  }, []);

  return (
        <div>
          <div class="flex-bottom-middle">
            <h1 className='header'>{community}, Floor {floor}</h1>
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
            <Button variant="contained" className="button-form">Add/Update Machine</Button>
          </div>
        </div>
      );
}