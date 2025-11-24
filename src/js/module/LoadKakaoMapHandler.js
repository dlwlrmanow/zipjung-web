export const loadKakaoMap = () => {
    if (window.kakao && window.kakao.maps) {
        console.log('[initMap] kakao 객체');

        window.kakao.maps.load(() => {
            console.log('[load] 완');
            initMap()
        });
    } else {
        console.error('[load] 실패');
    }
};

const initMap = () => {
    const container = document.getElementById("map");

    if(!container) {
        console.error('[map 요소 찾기 실패 ]');
        return;
    }
    const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 3,
    };
    new window.kakao.maps.Map(container, options);
};