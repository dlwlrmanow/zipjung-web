import {saveTodoApi} from "../api/SaveTodoApi.js";
import {deleteTodoByIdApi} from "../api/DeleteTodoApi.js";
import {getTodoListApi} from "../api/GetTodoListApi.js";
import {updateTodoIsDoneApi} from "../api/UpdateTodoIsDoneApi.js";
import {fetchReminderApi} from "../api/FetchReminderApi.js";

export const saveNewTodo = async (text) => {
    const todoRequestDto = {
        task: text,
        isDone: false
    };

    return await saveTodoApi('/todo/save', todoRequestDto);
}

export const deleteTodoById= async (id) => {
    try {
        await deleteTodoByIdApi(`/todo/delete/${id}`);
    } catch (e) {
        console.error('[TodoService] getTodos: ', e);
        alert('삭제 중 문제 발생: ' + e.response.data);
    }
}

export const getTodos = async() => {
    return await getTodoListApi('/todo/fetch/list');
}

export const changeIsDone = async (todoId) => {
    return await updateTodoIsDoneApi(`/todo/update/isdone/${todoId}`);
}

export const getReminder = async () => {
    return await fetchReminderApi(`/todo/reminder`);
}
