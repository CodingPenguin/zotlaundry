import "./initialpage.css";
import { useState } from "react";
import axios from "axios"

export default function HomePage(){
    const [inputField, setInputField] = useState({
        community: "",
        floor: ""
    })

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

        <div>
            <h1 style={{ color:"White" }}>ZotLaundry Website</h1>
            <h2 style={{ color:"White" }}>Enter your community and building here!</h2>

            <div class="form-body">
                <div class="row">
                    <div class="form-holder">
                        <div class="form-content">
                            <div class="form-items">
                                <h3>Laundry Room Selector</h3>
                                <p>Fill in the data below.</p>
                                <form class="requires-validation"  onSubmit={submit} noValidate>

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
                                        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
    
}