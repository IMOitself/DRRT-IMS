import { Link } from "react-router-dom";

export default function TestPages() {
    const enableTestMode = () => sessionStorage.setItem("testMode", "true");

    return (
        <div className="p-10 text-center items-center flex flex-col gap-5 text-lg">
        <p>
            test pages without authentication :D.<br />
            use this for viewing ui designs. for actual functionality login with the accounts
        </p>
        <div className="text-center items-center flex flex-row flex-wrap gap-5">
            <Link to="/" className="test-link">/</Link>
            <Link to="/login" className="test-link">/login</Link>
            <Link to="/register" className="test-link">/register</Link>
            <Link to="/join" className="test-link">/join</Link>
            <Link to="/join-form" className="test-link">/join-form</Link>
            <Link to="/join-form/:id" className="test-link">/join-form/:id</Link>
            <Link to="/officer/create-event" className="test-link">/create-event</Link>
        </div>
        <div className="text-center items-center flex flex-row flex-wrap gap-5">
            <Link to="/officer/dashboard" onClick={enableTestMode} className="test-link">officer pages</Link>
            <Link to="/member/dashboard" onClick={enableTestMode} className="test-link">member pages</Link>
            <Link to="/adviser/dashboard" onClick={enableTestMode} className="test-link">adviser pages</Link>
        </div>
        </div>
    );
}