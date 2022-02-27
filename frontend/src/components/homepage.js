import "./initialpage.css";
import { Button } from "react-bootstrap"
import { useState } from "react";
import axios from "axios"

export default function HomePage(){
    const [inputField, setInputField] = useState({
        community: "",
        floor: ""
    })

    function check_all_fields_set(e)
    {
        if (inputField.community == "" || inputField.floor == "")
        {
            e.preventDefault()
            alert('You must select a community and floor number before proceeding!')
        }

        else{
            // console.log('Here')
            submit()
        }

    }
    const inputsHandler = (e) =>{
        setInputField(prev => ({...prev, [e.target.name]: e.target.value}) )
    }

    console.log(inputField)
    
    const submit = (e) => {
        e.preventDefault()
        let url = `http://127.0.0.1:5000/machines?community=${inputField.community}&floor=${inputField.floor}`
        console.log(url)
        axios.get(url)
            .then(response => console.log(response.json()))
            .catch(error => console.log(error))
        localStorage.setItem("inputField", JSON.stringify(inputField))
        // axios.post(url)
        //     .then(response => console.log(response.json()))

        // axios.patch(url)
        //     .then(response => console.log(response.json()))
        
    }
    
    return(
        <>
        <div style={{overflow: "scroll", backgroundColor:"green", maxHeight : "90vh"}}>

            <div class="form-body">
                <div class="row">
                    <div class="form-holder">
                    <h1 style={{ color:"White" }}>ZotLaundry Website</h1>
                        <div class="form-content">
                            <div class="form-items">
                                <h3>Laundry Room Selector</h3>
                                <p>Fill in the data below.</p>
                                <form class="requires-validation" noValidate>

                                    <input type="radio" class="btn-check" name="community" id="me" value="me" autocomplete="off" onChange={inputsHandler}/>
                                    <label class="btn btn-sm btn-outline-secondary" for="me">Middle Earth</label>

                                    <input type="radio" class="btn-check" name="community" id="mc" value="mc" autocomplete="off" onChange={inputsHandler}/>
                                    <label class="btn btn-sm btn-outline-secondary" for="mc">Mesa Court</label>


                                    <div class="col-md-12">
                                        <select name="floor" class="form-select mt-3" onChange={inputsHandler}>
                                            <option name="floor" value="1">Floor 1</option>
                                            <option name="floor" value="2">Floor 2</option>
                                            <option name="floor" value="3">Floor 3</option>
                                            <option name="floor" value="4">Floor 4</option>
                                            <option name="floor" value="5">Floor 5</option>
                                            <option name="floor" value="6">Floor 6</option>
                                            <option name="floor" value="7">Floor 7</option>
                                        </select>
                                    </div>

                                    <div class="form-button mt-3">
                                        <Button onClickid="submit" href="/laundrypage" onClick={check_all_fields_set} type="submit" class="btn btn-primary">Submit</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
        </>

    )
    
}