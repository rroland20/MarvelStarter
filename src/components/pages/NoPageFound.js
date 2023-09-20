import  ErrorMessage from "../errorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const NoPageFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Page not found"
                    />
                <title>Page 404 not found</title>
            </Helmet>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginBottom': '30px'}}>Pade doesn`t exist</p>
            <button style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'border': 'none', 'background': 'transparent', 'margin': '0 auto'}}
                    onClick={() => navigate(-1)}>
                Back to previous page
            </button>
        </div>
    );
}

export default NoPageFound;