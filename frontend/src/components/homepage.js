import "./initialpage.css";
import { Card, Jumbotron } from "react-bootstrap"

export default function HomePage(){

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

                                    <input type="radio" class="btn-check" name="community" id="me" autocomplete="off"/>
                                    <label class="btn btn-sm btn-outline-secondary" for="me">Middle Earth</label>

                                    <input type="radio" class="btn-check" name="community" id="mc" autocomplete="off"/>
                                    <label class="btn btn-sm btn-outline-secondary" for="mc">Mesa Court</label>


                                    <div class="col-md-12">
                                        <select class="form-select mt-3">
                                            <option value="">Floor Number</option>
                                            <option value="2">Floor 2</option>
                                            <option value="3">Floor 3</option>
                                            <option value="4">Floor 4</option>
                                            <option value="5">Floor 5</option>
                                            <option value="6">Floor 6</option>
                                            <option value="7">Floor 7</option>
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
        </div>;
        </>

    )
    
}