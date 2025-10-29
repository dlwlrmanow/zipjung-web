function showErrModal(title, message) {
    const modalElement = document.getElementById('errorModal');
    if(!modalElement) {
        console.error("modal 없음");
        return;
    }

    const modal = new bootstrap.Modal(modalElement);
    document.getElementById('modalErrorMessage').textContent = message; // 모달 메세지만 바꾸기

    modal.show();
}

// 모달 가져오기 위함
async function loadExternalHtml(url) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`외부 html load 실패 ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        document.body.insertAdjacentHTML('beforeend', html);
        console.log(`${url} load 완`);
    } catch (e) {
        console.error('외부 html load 실패: ', e);
    }

}

