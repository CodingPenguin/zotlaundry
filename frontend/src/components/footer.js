import React, {useState} from "react";
import Typography from '@material-ui/core/Typography';
import "./footer.css";
import Link from '@material-ui/core/Link';
import {useScrollPosition} from "./hooks/useScrollPosition";

export default function Footer () {
    const [sticky, setSticky] = useState(false)

    useScrollPosition(
        ({ prevPos, currPos }) => {
            const isShow = currPos.y > prevPos.y
            if (isShow !== sticky) setSticky(isShow)
        },
        [sticky]
    )
    return(
        <div className="main-footer" style={{position: "fixed",
            // transform: sticky ? "translateY(0)" : "translateY(100%)",
            transition: "transform 500ms ease-in",
            bottom: 0,
            left: 0,}}>
            <p style={{ color:"white" }}>
                <Typography variant="body2" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="/">
                        ZotLaundry
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </p>
        </div>
    );
}