import {Layout} from "../../components/Layout.js";
import {loadKakaoMap} from "../module/LoadKakaoMapHandler.js";

export const renderFocusMapContent = () => {
    return `
        <div id="map" style="width:500px;height:400px;"></div>
    `;
}

export const renderFocusMapPage = (container) => {
    container.innerHTML = Layout(renderFocusMapContent());

    setTimeout(() => {
        loadKakaoMap();
    }, 0);
}