import {FocusLogException} from "../../utils/FocusLogException.js";
import {Result} from "../../models/Result.js";
import {FocusLogList} from "../../models/FocusLogList.js";

export class FocusLogListApi {
    static async fetchLogList(url, data) {
        console.log("[fetchLogList] start");
        const response = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json; charset=UTF-8', 'Authorization': `Bearer ${data}`},
            credentials: 'include'
        });

        if (response.ok) {
            console.log("fetch log data 성공");

            // TODO: rawData.count가 0인경우 alert
            const rawData = await response.json();
            const resultData = rawData.map(item => new Result(item.data, item.count));
            const logs = resultData.data.map(item => new FocusLogList(item.postId, item.focusLogId, item.title, item.rating, item.postCreatedAt, item.totalFocusedTime));
            const count = resultData.count;

            return logs;
        }

        throw new FocusLogException('[FocusLogListApi] fetch log list 중 error: ', response.status);
    }
}