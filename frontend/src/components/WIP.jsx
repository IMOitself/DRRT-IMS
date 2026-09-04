import { Link } from "react-router-dom";

export default function WIP() {
    return (
        <div className="wip w-full flex justify-center items-center bg-yellow-bg text-yellow p-2 px-10">
            <p className="text-md grow">this page is still freshly converted. its still static and stuff. work in progress etc etc.</p>
            <button className="material-symbols-outlined cursor-pointer"
                onClick={() => {
                    const wip = document.querySelector(".wip");
                    wip.style.display = "none";
                }}>
                close
            </button>
        </div>
    );
}