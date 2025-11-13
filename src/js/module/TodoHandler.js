import {AuthService} from "../services/AuthService.js";
import {TodoService} from "../services/TodoService.js";

(async () => {
    // TODO: 페이지 이동시 불러오기

})();

const logoutBtn = document.getElementById('logoutBtn');
const mainTimer = document.getElementById('mainTimerBtn');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoListContainer = document.getElementById('todoListContainer');
const loadingMessage = document.getElementById('loadingMessage');
const emptyMessage = document.getElementById('emptyMessage');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        try {
            await AuthService.logout();
            // token 무효화 후 페이지 이동
            // 뒤로가기 불가
            window.location.replace('../main.html');
        } catch (e) {
            console.error(e);
            alert('로그아웃 실패');
        }
    })
}

if(mainTimer) {
    mainTimer.addEventListener('click', (event) => {
        event.preventDefault();

        window.location.href = '../timer/main-timer.html';
    })
}

// 임시 Todo ID 카운터 (실제로는 서버 DB에서 ID를 부여받아야 함)
// let todoIdCounter = 1;


function createTodoItem(text, id) {
    const listItem = document.createElement('li');
    // Bootstrap list-group-item 클래스 및 스타일 적용
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center py-3';
    listItem.id = `todo-item-${id}`;

    listItem.innerHTML = `
        <div class="d-flex align-items-center">
            <input class="form-check-input me-3 todo-check" type="checkbox" data-todo-id="${id}">
            <span class="todo-text">${text}</span>
        </div>
        <div>
            <button class="btn btn-sm btn-outline-danger border-0 todo-delete-btn" data-todo-id="${id}">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;

    // 💡 todoListContainer의 가장 위쪽에 추가 (최신 할 일이 위에 오도록)
    todoListContainer.prepend(listItem);

    // 삭제 버튼에 이벤트 리스너 연결
    listItem.querySelector('.todo-delete-btn').addEventListener('click', deleteTodoItem);
    // 체크박스에 이벤트 리스너 연결 (완료 처리)
    listItem.querySelector('.todo-check').addEventListener('change', toggleTodoComplete);

    // 로딩 메시지 숨기기 (로딩 메시지가 있다면)
    if (loadingMessage) {
        loadingMessage.classList.add('d-none');
    }
    // 빈 목록 메시지가 있다면 숨기기
    if (emptyMessage && !emptyMessage.classList.contains('d-none')) {
        emptyMessage.classList.add('d-none');
    }
}

/**
 * 할 일을 삭제하는 이벤트 핸들러 (실제로는 서버 API 호출 필요)
 */
async function deleteTodoItem(event) {
    const btn = event.currentTarget;
    const todoId = btn.dataset.todoId;
    const item = document.getElementById(`todo-item-${todoId}`);

    try {
        await TodoService.deleteTodoById(item);

        if (item) {
            item.remove();

            // 목록이 비었는지 확인하여 emptyMessage 표시
            if (todoListContainer.children.length === 0 ||
                (todoListContainer.children.length === 1 && todoListContainer.children[0].id === 'loadingMessage')) {
                if (emptyMessage) {
                    emptyMessage.classList.remove('d-none');
                }
            }
        }
    } catch (e) {
        console.error(e);
        alert('삭제에 실패하였습니다. 잠시후 다시 시도해주세요');
    }

    if (item) {
        item.remove();

        // 목록이 비었는지 확인하여 emptyMessage 표시
        if (todoListContainer.children.length === 0 ||
            (todoListContainer.children.length === 1 && todoListContainer.children[0].id === 'loadingMessage')) {
            if (emptyMessage) {
                emptyMessage.classList.remove('d-none');
            }
        }
    }
}

/**
 * 할 일 완료 상태를 토글하는 이벤트 핸들러 (실제로는 서버 API 호출 필요)
 */
function toggleTodoComplete(event) {
    const checkbox = event.currentTarget;
    const todoId = checkbox.dataset.todoId;
    const itemText = checkbox.closest('.list-group-item').querySelector('.todo-text');

    // 실제로는 서버에 완료 상태 업데이트 API를 호출해야 함
    console.log(`[TodoHandler] Todo ID ${todoId} 완료 상태 변경: ${checkbox.checked ? '완료' : '미완료'} (API 호출 필요)`);

    if (checkbox.checked) {
        itemText.classList.add('text-decoration-line-through', 'text-muted');
    } else {
        itemText.classList.remove('text-decoration-line-through', 'text-muted');
    }
}

/**
 * 할 일 추가 버튼 클릭 이벤트 핸들러
 */
async function handleAddTodo() {
    const text = todoInput.value.trim();

    if (text) {
        try {
            const newTodo = await TodoService.saveNewTodo(text);

            // 2. 임시로 클라이언트에서 항목 생성 및 추가
            // createTodoItem(text, todoIdCounter++);

            // 3. 입력 필드 초기화
            todoInput.value = '';
            todoInput.focus();
        } catch (e) {
            console.error(e);
            alert('Todo 저장 중 서버 오류가 발생하였습니다.');
        }
    }

    alert('할 일 내용을 입력해주세요.');
    todoInput.focus();
}


document.addEventListener('DOMContentLoaded', () => {
    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', handleAddTodo);

        // 엔터 키로 입력
        todoInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // 기본 폼 제출 방지
                handleAddTodo();
            }
        });

        // 초기 로드 시 할 일이 없음을 가정 (TODO: 실제로는 API로 불러와야 함)
        if (todoListContainer.children.length === 1 && todoListContainer.children[0].id === 'loadingMessage') {
            // 500ms 후 로딩 메시지 숨김 처리 (API 응답 지연 시뮬레이션)
            setTimeout(() => {
                loadingMessage.classList.add('d-none');
                if (emptyMessage) {
                    emptyMessage.classList.remove('d-none');
                }
            }, 500);
        }
    }
});