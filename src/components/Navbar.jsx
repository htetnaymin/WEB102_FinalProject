import './Navbar.css'
import { Link } from "react-router-dom"
function Navbar(){
    return(
        <>
        <div className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    🚀 PromptPark
                </Link>

                <ul className="nav-menu">
                    <li className="nav-items">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-items">
                        <Link to="/create" className="nav-link">
                            Create Prompt
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default Navbar