import  ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const NoPageFound = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Pade doesn`t exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>
    );
}

export default NoPageFound;