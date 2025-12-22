import {deleteFocusItemOneById, deleteFocusedItemAll, getFocusedTimeInADay} from "../services/FocusTimeService.js";

let recordListContainer; // 여러번 사용되는 경우에 let으로 일단 선언 후 함수에서 할당
const loadingMessage = document.getElementById('loadingMessage');
let emptyMessage;

export function focusTimeEvents() {
    const btnClearAll = document.getElementById('btnClearAll');

    // 초기에 집중 시간 기록 가져오기
    initFetchFocused();

    // 집중 기록 전체 삭제
    if(btnClearAll) {
        btnClearAll.addEventListener('click', handleDeleteFocusedItemAll);
    }
}

const initFetchFocused = async () => {
    recordListContainer = document.getElementById('recordListContainer');

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

const createFocusTimeItem = (id, startTime, endTime, focusedTimeStr) => {
    // 새로 만들어주는 건 -> createElement
    const listItem = document.createElement('li');

    listItem.className = 'list-group-item d-flex justify-content-between align-items-center py-3'
    listItem.id = `focused-item-${id}`;

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

    listItem.querySelector('.focused-delete-btn').addEventListener('click', handleDeleteFocusedItem);

    return listItem;
}

const handleDeleteFocusedItem = async (event) => {
    const btn = event.currentTarget;
    const focusId = btn.dataset.focusedId; // data-focused-id
    const item = document.getElementById(`focused-item-${focusId}`);

    try {
        console.log(focusId);

        await deleteFocusItemOneById(focusId);

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

const handleDeleteFocusedItemAll = async (e) => {
    e.preventDefault();

    // 전체 삭제는 한 번 다시 물어보기
    if(!confirm('정말 모든 기록을 삭제하실건가요? 🫣')) {
        return;
    }

    try {
        await deleteFocusedItemAll();

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