let markers = [];

let map = null;
let infowindow = null;

// 선택한 장소 콜백
let selectLocationCallback = null;

// 무한 스크롤
let currentPagination = null;
let isFetching = false;

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

    const searchOptions = {
        size: 5,
        page:1
    };

    removeMarkers();
    ps.keywordSearch(keyword, placeSearchCB, searchOptions);
}

// 콜백 함수
export const selectLocationListener = (callback) => {
    selectLocationCallback = callback;
}

function placeSearchCB(data, status, pagination) {
    if(status === window.kakao.maps.services.Status.OK) {
        // 기존에 그린 마커 삭제
        removeMarkers();

        displayPlaces(data);

        displayPagination(pagination);

    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다. 다른 키워드로 다시 검색해보세요!');
        return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생');
        return;
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

    return marker;
}

function removeMarkers() {
    for(let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function displayPlaces(places) {
    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarkers();

    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
        var marker = displayMarker(places[i]);
        var itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    if(menuEl) menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

function getListItem(index, place) {
    const el = document.createElement('li');
    let itemStr = `
        <span class="markerbg marker_${index + 1}"></span>
        <div class="info">
            <h5>${place.place_name}</h5>
            ${place.road_address_name ? `<span>${place.road_address_name}</span><span class="jibun gray">${place.address_name}</span>` : `<span>${place.address_name}</span>`}
            <span class="tel">${place.phone}</span>
        </div>`;

    el.innerHTML = itemStr;
    el.className = 'item';

    el.addEventListener('click', () => {
        console.log(place.place_url);
        if(selectLocationCallback) {
            selectLocationCallback(place);
        }
    })

    return el;
}

function displayPagination(pagination) {
    const paginationEl = document.getElementById('pagination');
    const fragment = document.createDocumentFragment();

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (let i=1; i<=pagination.last; i++) {
        const el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        el.className = "page-link";

        if (i === pagination.current) {
            el.classList.add('on');
        } else {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                pagination.gotoPage(i);
            })
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}