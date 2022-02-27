import './room.css'
import { Modal } from 'react-bootstrap'
import '../machineModal.css'

import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MachineModalBox from '../modalMachineBox'
import Button from '@mui/material/Button';
import { Fa500Px } from 'react-icons/fa';

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

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    console.log(show)
  }


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
     <>
        <div  style={{maxHeight : "80vh", overflow:'scroll'}}>
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
        <div className="flex-center">
          {/* { theModal && <Button variant="contained" onClick = {setModal(true)} className="button-form">Add/Update Machine</Button>} */}
          <Button variant="contained" onClick = {handleShow} className="button-form">Add/Update Machine</Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Machine Selection</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Edit / Add Machine</h3>
            <form novalidate>

              <h3>Device number</h3>
              <div class="col-md-8">
                  <input class="form-control" type="number" name="device-number"
                      placeholder="Enter device number" required/>
              </div>


              <h3>Device type</h3>
              <input type="radio" class="btn-check" name="device-type" id="new-washer" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="new-washer">New Washer</label>

              <input type="radio" class="btn-check" name="device-type" id="new-dryer" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="new-dryer">New Dryer</label>


              <h3>Device state</h3>

              <input type="radio" class="btn-check" name="device-state" id="empty" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="empty">Empty</label>

              <input type="radio" class="btn-check" name="device-state" id="running" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="running">Running</label>

              <input type="radio" class="btn-check" name="device-state" id="full" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="full">Full</label>

              <h3 >Time started</h3>

              <div class="col-md-12">
                  <input class="form-control" type="time" name="start-time" placeholder="9:30" required/>
              </div>


              <h3>Remaining time</h3>

              <div class="col-md-8">
                  <input class="form-control" type="text" name="rem-time"
                      placeholder="Enter remaining time in minutes" required/>
              </div>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className='button-modal' onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className='button-modal' onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </>
    );
}