import './room.css'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import '../machineModal.css'

import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import MachineModalBox from '../modalMachineBox'
import Button from '@mui/material/Button';
import { Fa500Px } from 'react-icons/fa';

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

  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


return (
      <>
      <div style = {{maxHeight : "100vh", 'overflow-y' : 'scroll'}}>
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
          {/* { theModal && <Button variant="contained" onClick = {setModal(true)} className="button-form">Add/Update Machine</Button>} */}
          <Button variant="contained" onClick = {handleShow} className="button-form">Add/Update Machine</Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit/Add Machine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form novalidate>

              <h3 class="modal-headers">Device Number</h3>
              <div class="col-md-8">
                  <input class="form-control" type="number" name="device-number"
                      placeholder="Enter device number" required/>
              </div>


              <h3 class="modal-headers">Device Type</h3>
              <input type="radio" class="btn-check" name="device-type" id="new-washer" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="new-washer">Washer</label>

              <input type="radio" class="btn-check" name="device-type" id="new-dryer" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="new-dryer">Dryer</label>


              <h3 class="modal-headers">Device State</h3>

              <input type="radio" class="btn-check" name="device-state" id="empty" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="empty">Empty</label>

              <input type="radio" class="btn-check" name="device-state" id="running" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="running">Running</label>

              <input type="radio" class="btn-check" name="device-state" id="full" autocomplete="off"
                  required/>
              <label class="btn btn-sm btn-outline-secondary" for="full">Full</label>

              <h3 class="modal-headers">Time Started</h3>

              <div class="col-md-12">
                  <input class="form-control" type="time" name="start-time" placeholder="9:30" required/>
              </div>


              <h3 class="modal-headers">Remaining Time</h3>

              <div class="col-md-8">
                  <input class="form-control" type="text" name="rem-time"
                      placeholder="Enter time in minutes" required/>
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
      </div>
      </>
    );
}