import {TodoService} from "../services/TodoService.js";

export function todoEvents() {
    const pendingRemovals = {};

    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoListContainer = document.getElementById('todoListContainer');
    const loadingMessage = document.getElementById('loadingMessage');
    const emptyMessage = document.getElementById('emptyMessage');

    const createTodoItem = (text, id, date) => {
        const listItem = document.createElement('li');

        listItem.className = 'list-group-item d-flex justify-content-between align-items-center py-3';
        listItem.id = `todo-item-${id}`;

        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <input class="form-check-input me-3 todo-check" type="checkbox" data-todo-id="${id}">
                <span class="todo-text">${text}</span>
            </div>
            <div class="d-flex align-items-center">
                <span class="small text-muted me-3">
                    ${date}
                </span>
                <button class="btn btn-sm btn-outline-danger border-0 todo-delete-btn" data-todo-id="${id}">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

        listItem.querySelector('.todo-delete-btn').addEventListener('click', handleDeleteTodoItem);
        listItem.querySelector('.todo-check').addEventListener('change', toggleTodoComplete);

        return listItem;
    }

    // 페이지 렌더링 되자마자 todos list 가져오기
    const initFetchTodos = async () => {
        // fetch 해오는 동안 로딩 보여주기
        if(loadingMessage) {
            loadingMessage.classList.remove('d-none');
        }

        try {
            const result = await TodoService.getTodos();

            todoListContainer.innerHTML = ''; // 리스트 초기화

            // 데이터가 있는지 확인
            if(result && result.count > 0) {
                result.data.forEach(todos => {
                    // TODO: 날짜 포맷 백엔드에서 하도록 수정
                    // 날짜 포맷
                    const dateFromDB = new Date(todos.createdAt); // 월/일 형태로 출력
                    const dateFormatted = `${dateFromDB.getMonth() + 1}. ${dateFromDB.getDate()}`

                    // todos item 그리기
                    const listItem = createTodoItem(todos.task, todos.id, dateFormatted);
                    todoListContainer.prepend(listItem); // 최신 항목이 맨 위로
                })

                // 데이터가 있으니까 empty message 숨기기
                if(emptyMessage) emptyMessage.classList.add('d-none');
                // loading도 끝났으니 숨기기
                if(loadingMessage) loadingMessage.classList.add('d-none');

                return;
            }

            // todos item이 존재하지 않는 경우
            if(emptyMessage) {
                emptyMessage.classList.remove('d-none');
                emptyMessage.textContent = '아직 할 일을 추가하지 않았어요!🥲';
            }
            if(loadingMessage) loadingMessage.classList.add('d-none');
        } catch (e) {
            console.error('[TodoHandler] fetch todos list 실패: ', e);

            // 에러 발생시 로딩 메세지는 숨기기
            if(emptyMessage) {
                emptyMessage.classList.remove('d-none');
                emptyMessage.textContent = '리스트를 가져오지 못했습니다🥲';
            }
        }
    }

    const handleAddTodo = async () => {
        const text = todoInput.value.trim();

        if(!text) {
            alert('할 일을 입력하세요');
            todoInput.focus();
            return;
        }
        // 임시 UI에 보여줄 date formate
        const dateObj = new Date(Date.now());
        const month = dateObj.getMonth() + 1;
        const date = dateObj.getDate();

        // 임시 todos UI
        const tempId = `temp-${Date.now()}`;
        const tempDate = `${month}. ${date}`;
        const tempItem = createTodoItem(text, tempId, tempDate);

        if(loadingMessage) loadingMessage.classList.add('d-none');
        if(emptyMessage) emptyMessage.classList.add('d-none');

        // 임시로 화면에 보이기
        todoListContainer.prepend(tempItem);

        // 입력창 초기화
        todoInput.value = '';
        todoInput.focus();

        // 진짜로 저장하기
        try {
            const realDBSave = await TodoService.saveNewTodo(text);

            if(realDBSave && realDBSave.id) {
                const savedTodoId = realDBSave.id;
                tempItem.id = `todo-item-${savedTodoId}` // 진짜 id로 수정

                // checkBox랑 deleteBtn도 진짜 id 필요하니까 수정해주기
                const checkBox = tempItem.querySelector('.todo-check');
                const deleteBtn = tempItem.querySelector('.todo-delete-btn');

                if(checkBox) checkBox.dataset.todoId = savedTodoId;
                if(deleteBtn) deleteBtn.dataset.todoId = savedTodoId;

                // TODO: 저장후에는 새로 fetch 받아오기
                initFetchTodos();
            }


        } catch (e) {
            console.error(e);

            // 실패한 경우에는 임시로 UI에 띄운 TODOs 삭제
            tempItem.remove();
            alert('Todo 저장 중 서버 오류가 발생하였습니다.');

            // 사용자 편의를 위해서 input 값 되돌려놓기
            todoInput.value = text;
        }
    }

    // 할 일 완료
    const toggleTodoComplete = async (event) => {
        const checkbox = event.currentTarget;
        const todoId = checkbox.dataset.todoId;
        const itemText = checkbox.closest('.list-group-item').querySelector('.todo-text');

        // isDone으로 변경되면 삭제될 항목
        const itemDone = document.getElementById(`todo-item-${todoId}`);

        if (checkbox.checked) {
            // UI에서 strike 어쩌구 선 긋게
            itemText.classList.add('text-decoration-line-through', 'text-muted');

            // 지연 시간 주고 todos 리스트에서 삭제
            const DELAY_TIME = 3000; // 3초

            const timeoutId = setTimeout(async () => {
                // 체크하고 5초 후 실행
                // DB 데이터 수정
                try {
                    await TodoService.changeIsDone(todoId);

                    // 성공시 해당 항목 삭제
                    if(itemDone) {
                        itemDone.remove();
                    }
                } catch (e) {
                    console.error('[TodoService isDone] fail', e);
                    alert('완료 처리 중에 오류 발생');
                    // 실패하면 중간에 선 그은 거 복구
                    checkbox.checked = false;
                    itemText.classList.remove('text-decoration-line-through', 'text-muted');
                }
                delete pendingRemovals[todoId];

            }, DELAY_TIME);
            pendingRemovals[todoId] = timeoutId;
        } else {
            if(pendingRemovals[todoId]) { // 진행중인 게 있는지 확인
                clearTimeout(pendingRemovals[todoId]); // 타이머 취소
                delete pendingRemovals[todoId]; // 저장된 Id 삭제
                console.log(`Todo is_Done ${todoId}진행 취소!`);
            }

            // UI 복구
            itemText.classList.remove('text-decoration-line-through', 'text-muted');
        }
    }

    const handleDeleteTodoItem = async (event) => {
        const btn = event.currentTarget;
        const todoId = btn.dataset.todoId;
        const item = document.getElementById(`todo-item-${todoId}`);

        try {
            await TodoService.deleteTodoById(todoId);

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
    }

    // 페이지 렌더링시에 자동 호출
    // todos리스트 가져오기
    initFetchTodos();

    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleAddTodo();
        });
    }
    // 엔터로도 저장 가능
    todoInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            handleAddTodo();
        }
    });
}