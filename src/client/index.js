import {handleSubmit} from "./js/app";


import "./styles/base.scss";
import "./styles/main.scss";
import "./styles/travelCard.scss";


export {
    handleSubmit
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("button").addEventListener('click', handleSubmit);
});