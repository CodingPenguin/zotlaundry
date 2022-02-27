import "./initialpage.css";
import { Button } from "react-bootstrap"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import axios from "axios"
import brand from "./ZotLaundry.png";
import brandWhite from "./ZotLaundry-white.png";

export default function HomePage(){
    const [inputField, setInputField] = useState({
        community: "",
        floor: 0,
    })
    let navigate = useNavigate();

    function check_all_fields_set(e) {
        e.preventDefault()
        if (inputField.community === "" || inputField.floor === "")
        {
            e.preventDefault()
            alert('You must select a community and floor number before proceeding!')
        }

        else {
            // console.log('Here')
            submit(e)
        }

    }
    const inputsHandler = (e) =>{
        setInputField(prev => ({...prev, [e.target.name]: e.target.value}) )
    }

    console.log(inputField)
    
    const submit = (e) => {
        e.preventDefault()
        // console.log(url)
        // axios.get(url)
        //     .then(response => console.log(response.json()))
        //     .catch(error => console.log(error))
        localStorage.setItem("inputField", JSON.stringify(inputField))
        navigate('/laundrypage');
    }
    
    return(
        <>
        <div style={{maxHeight : "90vh", overflow:'scroll'}}>

            <div class="form-body">
                <div class="row">
                    <div class="form-holder">
                        <a href="/">
                            <img style={{ height:"23vh"}} src={brandWhite} alt="None"></img>
                        </a>
                        <div class="form-content">
                            <div class="form-items">
                                <h3>Laundry Room Selector</h3>
                                <form class="requires-validation" onSubmit={check_all_fields_set} noValidate>

                                    <input type="radio" class="btn-check" name="community" id="me" value="me" autocomplete="off" onChange={inputsHandler}/>
                                    <label class="btn btn-sm btn-outline-secondary left" for="me">Middle Earth</label>

                                    <input type="radio" class="btn-check" name="community" id="mc" value="mc" autocomplete="off" onChange={inputsHandler}/>
                                    <label class="btn btn-sm btn-outline-secondary right" for="mc">Mesa Court</label>


                                    <div class="col-md-12">
                                        <select name="floor" class="form-select mt-3" onChange={inputsHandler}>
                                            <option name="floor" value="1">Choose Floor</option>
                                            <option name="floor" value="2">Floor 2</option>
                                            <option name="floor" value="3">Floor 3</option>
                                            <option name="floor" value="4">Floor 4</option>
                                            <option name="floor" value="5">Floor 5</option>
                                            <option name="floor" value="6">Floor 6</option>
                                            <option name="floor" value="7">Floor 7</option>
                                        </select>
                                    </div>

                                    <div class="form-button mt-3">
                                        <Button onClickid="submit" type="submit" class="btn btn-primary">Submit</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
    
}