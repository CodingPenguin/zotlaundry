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
    field: 'timeStarted',
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

const dryColumns = [
  { field: 'number', headerName: 'Number', flex: 0 },
  { field: 'state', headerName: 'Status', flex: 0 },
  {
    field: 'timeStarted',
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

        const finishedTime = data[i]['timeStarted'] + (data[i]['remainingTime'] * 60000); // time needs to be in ms
        const currentTime = new Date().getTime();
        let realRemainingTime = Math.ceil((parseInt(finishedTime) - parseInt(currentTime)) / 60000)

        let realTimeStarted = parseInt(data[i]['timeStarted']).toLocaleString()
        
        if (data[i]['state'] === 'Empty') {
          realRemainingTime = 0
          realTimeStarted = 'N/A'
        } else if (data[i]['state'] === 'Full') {
          realRemainingTime = 0
        } else if (data[i]['realRemainingTime'] === 0) {
          data[i]['state'] = 'Full'
        }

        let machine = {
          id: data[i]['_id'],
          number: data[i]['number'],
          state: data[i]['state'],
          timeStarted: realTimeStarted,
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

    setModalInput(prev => ({
        ...prev,
        'community': query['community'],
        'floor': query['floor']
      }) 
    )
  }, []);

  const [modalInput, setModalInput] = useState({
    
  });

  const modalInputsHandler = (e) =>{
    setModalInput(prev => ({...prev, [e.target.name]: e.target.value}) )
    console.log(modalInput);
}


  const modalPost = (q) => {
    console.log(q)
    axios.post('http://127.0.0.1:5000/machines', q)
      .then(
        response => console.log(response)
      )
  }

  const modalPatch = (q) => {
    console.log(q);
    console.log(JSON.parse(q));
    axios.patch('http://127.0.0.1:5000/machines', q)
      .then(
        response => console.log(response)
      )
  }

  const modalSubmit = (e) => {
    const current_date = new Date().getTime()
    const modalQuery = {
      'community': modalInput.community,
      'floor': parseInt(modalInput.floor),
      'number': parseInt(modalInput.number),
      'state': modalInput.state,
      'type': modalInput.type,
      'timeStarted': current_date,
      'remainingTime': parseInt(modalInput.remainingTime)
    }
    console.log(modalQuery);
    const url = `http://127.0.0.1:5000/machines?community=${modalQuery['community']}&floor=${modalQuery['floor']}&number=${modalQuery['number']}`;
    axios.get(url)
      .then(
        response => {
          if (response['data'].length === 0) {
            modalPost(modalQuery)
          } else {
            modalPatch(modalQuery)
          }
        }
      ).then(
        window.location.reload(false)
      )
  }

  return (
     <>
        <div  style={{maxHeight : "80vh", overflowY:'scroll'}}>
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
                  <input class="form-control" type="number" name="number" placeholder="Enter device number" onChange={modalInputsHandler} required/>
              </div>


              <h3>Device type</h3>
              <input type="radio" class="btn-check" name="type" value="washer" id="new-washer" autocomplete="off" onChange={modalInputsHandler} required/>
              <label class="btn btn-sm btn-outline-secondary" for="new-washer">New Washer</label>

              <input type="radio" class="btn-check" name="type" value="dryer" id="new-dryer" autocomplete="off" onChange={modalInputsHandler} required/>
              <label class="btn btn-sm btn-outline-secondary" for="new-dryer">New Dryer</label>


              <h3>Device state</h3>

              <input type="radio" class="btn-check" name="state" value="empty" id="empty" autocomplete="off" onChange={modalInputsHandler} required/>
              <label class="btn btn-sm btn-outline-secondary" for="empty">Empty</label>

              <input type="radio" class="btn-check" name="state" value="running" id="running" autocomplete="off" onChange={modalInputsHandler} required/>
              <label class="btn btn-sm btn-outline-secondary" for="running">Running</label>

              <input type="radio" class="btn-check" name="state" value="full" id="full" autocomplete="off" onChange={modalInputsHandler} required/>
              <label class="btn btn-sm btn-outline-secondary" for="full">Full</label>

              <h3 >Time started</h3>

              <div class="col-md-12">
                  <input class="form-control" type="time" name="timeStarted" placeholder="9:30" required/>
              </div>


              <h3>Remaining time</h3>

              <div class="col-md-8">
                  <input class="form-control" type="text" name="remainingTime" onChange={modalInputsHandler} placeholder="Enter remaining time in minutes" required/>
              </div>
            </form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className='button-modal' onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" className='button-modal' type='submit' onClick={(e) => {modalSubmit(e); handleClose()}}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
      </>
    );
}