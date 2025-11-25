import {getFocusedTimeInADay} from "../services/FocusTimeService.js";

const loadingMessage = document.getElementById('loadingMessage');
const emptyMessage = document.getElementById('emptyMessage');
const btnClearAll = document.getElementById('btnClearAll');

export function focusTimeEvents() {
    // 초기에 집중 시간 기록 가져오기
    initFetchFocused();

    // 집중 기록 전체 삭제
    if(btnClearAll) {
        btnClearAll.addEventListener('click', deleteFocusedItemAll);
    }
}

const initFetchFocused = async () => {
    const recordListContainer = document.getElementById('recordListContainer');

    // 데이터 가져오는 동안 loading
    if(loadingMessage) {
        loadingMessage.classList.remove('d-none');
    }

    try {
        // 하루의 데이터 가져오기
        const result = await getFocusedTimeInADay();

        recordListContainer.innerHTML = '';

        if(result && result.count > 0) {
            result.data.forEach(timeList => {
                const focusedItem = createFocusTimeItem(timeList.id, timeList.startTime, timeList.endTime, timeList.focusedTimeStr);
                recordListContainer.prepend(focusedItem);
            })

            if(emptyMessage) emptyMessage.classList.add('d-none');
            if(loadingMessage) loadingMessage.classList.add('d-none');

            return;
        }

        // result = 0인 경우
        // focused Time이 존재하지 않음
        if(emptyMessage) {
            emptyMessage.classList.remove('d-none');
            emptyMessage.textContent = '아직 집중한 기록이 없어요!🥲';
        }
        if(loadingMessage) loadingMessage.classList.add('d-none');
    } catch (e) {
        console.error('[MainTimerHandler] fetch focusedTime list 실패: ', e);

        // 에러 발생시 로딩 메세지는 숨기기
        if(emptyMessage) {
            emptyMessage.classList.remove('d-none');
            emptyMessage.textContent = '집중 시간을 가져오지 못했습니다🥲';
        }
        if(loadingMessage) {
            loadingMessage.classList.add('d-none');
        }
    }
}

const createFocusTimeItem = (id, startTime, endTime, focusedTimeStr) => {
    const listItem = document.createElement('li');

    listItem.className = 'list-group-item d-flex justify-content-between align-items-center py-3'
    listItem.id = `time-item-${id}`;

    listItem.innerHTML = `
        <div class="d-flex align-items-center">
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

    listItem.querySelector('.focused-delete-btn').addEventListener('click', deleteFocusedItem);

    return listItem;
}

const deleteFocusedItem = async (event) => {
    // TODO: focusedTime 삭제 API
    await deleteFocusedItem(id);
}

const deleteFocusedItemAll = async () => {
    // 전체 삭제는 한 번 다시 물어보기
    if(!confirm('정말 모든 기록을 삭제하실건가요?🫣')) {
        return;
    }
    try {
        // TODO: 전체 삭제 API
        recordListContainer.innerHTML = ''; // 초기화

        // 싹 비웠으니까 다시 emptyMessage 띄우기
        if (emptyMessage) {
            emptyMessage.classList.remove('d-none');
            emptyMessage.textContent = '아직 집중한 기록이 없어요!🥲';
        }
    } catch (e) {
    }
}