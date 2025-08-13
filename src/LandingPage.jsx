import { useNavigate } from 'react-router-dom'

function LandingPage() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/test');
    }

    return (
        <div>
            Welcome to Landing Page !!!
            <button onClick={handleClick} > Click here to navigate to Test </button>
        </div>
    )
}

export default LandingPage;