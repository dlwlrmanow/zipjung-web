import * as FocusTimeService from "../services/FocusTimeService.js";
import {searchMapByKeyword, selectLocationListener} from "./LoadKakaoMapHandler.js";
import * as FocusLogService from "../services/FocusLogService.js";

let recordListContainer; // 여러번 사용되는 경우에 let으로 일단 선언 후 함수에서 할당
const loadingMessage = document.getElementById('loadingMessage');
let emptyMessage;

export function focusTimeEvents() {
    const btnClearAll = document.getElementById('btnClearAll');

    // 모달 태그
    const searchBtn = document.getElementById('searchBtn');
    const mapSearchKeyword = document.getElementById('mapSearchKeyword');

    // 위치 모달 확인
    const modalEl = document.getElementById('locationModal');
    if(!modalEl) return;

    // 초기에 집중 시간 기록 가져오기
    initFetchFocused();

    // 집중 기록 전체 삭제
    if(btnClearAll) {
        btnClearAll.addEventListener('click', handleDeleteFocusedItemAll);
    }

    // 장소 검색
    searchBtn.addEventListener('click', () => {
        handleSearchEvent(mapSearchKeyword);
    });

}

const initFetchFocused = async () => {
    recordListContainer = document.getElementById('recordListContainer');

    // 데이터 가져오는 동안 loading
    if(loadingMessage) {
        loadingMessage.classList.remove('d-none');
    }

    try {
        // 하루의 데이터 가져오기
        const result = await FocusTimeService.getFocusedTimeInADay();

        console.log("result count: ", result);

        recordListContainer.innerHTML = '';

        if(result && result.length > 0) {
            result.forEach(timeList => {
                const focusedItem = createFocusTimeItem(
                    timeList.id,
                    timeList.startTime,
                    timeList.endTime,
                    timeList.focusedTimeStr,
                    timeList.focusLogId,
                    timeList.locationIsDeleted // TODO: null 인 경우에만 + 보여주기
                );
                recordListContainer.prepend(focusedItem);
            })

            if(emptyMessage) emptyMessage.classList.add('d-none');
            if(loadingMessage) loadingMessage.classList.add('d-none');

            return;
        }

        // result = 0인 경우
        // focused Time이 존재하지 않음
        emptyMessage = document.getElementById('emptyMessage');

        if(emptyMessage) {
            emptyMessage.classList.remove('d-none');
            emptyMessage.textContent = '아직 집중한 기록이 없어요! 🥲';
        }

        if(loadingMessage) loadingMessage.classList.add('d-none');

    } catch (e) {
        console.error('[MainTimerHandler] fetch focusedTime list 실패: ', e);

        // 에러 발생시 로딩 메세지는 숨기기
        emptyMessage = document.getElementById('emptyMessage');

        if(emptyMessage) {
            emptyMessage.classList.remove('d-none');
            emptyMessage.textContent = '집중 시간을 가져오지 못했습니다 🥲';
        }
        if(loadingMessage) {
            loadingMessage.classList.add('d-none');
        }
    }
}

const createFocusTimeItem = (id, startTime, endTime, focusedTimeStr, focusLogId, locationIsDeleted) => {
    const listItem = document.createElement('li');

    listItem.className = 'list-group-item d-flex justify-content-between align-items-center py-3'
    listItem.id = `focused-item-${id}`;

    // + 버튼이 있고없고 간격 똑같이
    const isVisible = (locationIsDeleted === null);
    const visibilityClass = isVisible ? '' : 'invisible';
    const disabledAttr = isVisible ? '' : 'disabled'; // 보이지 않을 땐 클릭도 안 되게

    const locationAddBtn = `
        <button class="btn btn-sm text-primary p-0 me-3 add-sub-btn ${visibilityClass}" 
                data-focused-id="${id}" ${disabledAttr}>
            <i class="bi bi-plus-lg" style="font-size: 1.2rem;"></i>
        </button>`;

    listItem.innerHTML = `
        <div class="d-flex align-items-center">
            ${locationAddBtn}
            <span class="focused-time">${focusedTimeStr}</span>
        </div>
        <div class="d-flex align-items-center">
            <span class="small text-muted me-3">
                ${startTime} ~ ${endTime}
            </span>
            <button class="btn btn-sm btn-outline-danger border-0 focused-delete-btn" data-focused-id="${id}">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;

    // 아이템 삭제시
    listItem.querySelector('.focused-delete-btn').addEventListener('click', handleDeleteFocusedItem);

    // 카카오맵으로부터 위치 추가시
    const addSubBtn = listItem.querySelector('.add-sub-btn');
    if(addSubBtn) addSubBtn.addEventListener('click', handleAddLocation);

    return listItem;
}

const handleDeleteFocusedItem = async (event) => {
    const btn = event.currentTarget;
    const focusId = btn.dataset.focusedId; // data-focused-id
    const item = document.getElementById(`focused-item-${focusId}`);

    try {
        console.log("[handleDeleteFocusedItem] deleted focus item id: ", focusId);

        await FocusTimeService.deleteFocusItemOneById(focusId);

        if (item) {
            item.remove();

            // 목록이 비었는지 확인하여 emptyMessage 표시
            if (recordListContainer.children.length === 0 ||
                (recordListContainer.children.length === 1 && recordListContainer.children[0].id === 'loadingMessage')) {
                if (emptyMessage) {
                    emptyMessage.classList.remove('d-none');
                }
            }
        }
    } catch (e) {
        console.error('[handleDeleteFocusedItem] fail');
        alert('삭제에 실패하였습니다. 잠시후에 다시 시대하여주세요');
    }
}

const handleAddLocation = async (event) => {
    const btn = event.currentTarget;
    const item = btn.closest('.list-group-item');
    const focusedId = btn.dataset.focusedId;

    // 위치 모달 불러오기
    const modalEl = document.getElementById('locationModal');
    const locationModal = bootstrap.Modal.getOrCreateInstance(modalEl);

    // load되어있는 지도를 실제로 띄우기
    locationModal.show();

    // TODO: focus_log에 장소 추가하는 API 연결
    selectLocationListener(async (place) => {
        if (!confirm(`'${place.place_name}'을(를) 등록할까요?`)) return;

        try {
            await FocusLogService.addLocation(place.place_name, focusedId, place.y, place.x, place.id, place.place_url);

            alert('성공적으로 위치 추가🎉');
            locationModal.hide();

            initFetchFocused(); // 리스트 다시 그리기
        } catch (e) {
            console.error('장소 등록 실패:', e);
            alert('위치 추가 실패');
        }
    })
}

const handleSearchEvent = (mapSearchKeyword) => {
    const keyword = mapSearchKeyword.value.trim();
    console.log(keyword);

    // 공백이면 빛 나도록
    if(!keyword) {
        mapSearchKeyword.focus(); // 포커스주기
        return;
    }

    searchMapByKeyword(keyword);
}

const handleDeleteFocusedItemAll = async (e) => {
    e.preventDefault();

    // 전체 삭제는 한 번 다시 물어보기
    if(!confirm('정말 모든 기록을 삭제하실건가요? 🫣')) {
        return;
    }

    try {
        await FocusTimeService.deleteFocusedItemAll();

        recordListContainer.innerHTML = ''; // 초기화

        // 싹 비웠으니까 다시 emptyMessage 띄우기
        const emptyMessage = document.getElementById('emptyMessage');

        if (emptyMessage) {
            emptyMessage.classList.remove('d-none');
            emptyMessage.textContent = '아직 집중한 기록이 없어요! 🥲';
        }
    } catch (e) {
        console.error('[deleteFocusedItemAll] 집중 시간 기록 삭제 오류', e);
        alert('집중 기록 삭제에 실패하였어요 🥲');
    }
}

