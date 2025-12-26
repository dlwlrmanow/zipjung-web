let markers = [];

let map = null;
let infowindow = null;

export const loadKakaoMap = () => {
    if (window.kakao && window.kakao.maps) {
        console.log('[initMap] kakao 객체');

        window.kakao.maps.load(() => {
            console.log('[load] 완');

            const container = document.getElementById("map");

            if(map) { // 이미 만들어둔 지도가 있으면 그거 재활용
                map.relayout();
                return;
            }

            if(!container) {
                console.error('[map 요소 찾기 실패 ]');
                return;
            }
            const options = {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 3,
            };

            map = new window.kakao.maps.Map(container, options);
            infowindow = new window.kakao.maps.InfoWindow({zIndex: 1});
        });
    } else {
        console.error('[load] 실패');
    }
};

export const searchMapByKeyword = (keyword) => {
    if(!map) {
        console.error('map이 존재하지 않습니다.');
        return;
    }

    const ps = new window.kakao.maps.services.Places();

    removeMarkers();
    ps.keywordSearch(keyword, placeSearchCB);
}

function placeSearchCB(data, status, pagination) {
    if(status === window.kakao.maps.services.Status.OK) {
        console.log('검색 결과: ', data);

        const bounds = new window.kakao.maps.LatLngBounds();

        for(let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다. 다른 키워드로 다시 검색해보세요!');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생');
    }
}

function displayMarker(place) {
    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
    });

    markers.push(marker);

    window.kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
        infowindow.open(map, marker);
    });
}

function removeMarkers() {
    for(let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}