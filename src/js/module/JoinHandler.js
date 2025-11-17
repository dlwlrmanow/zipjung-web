import {ExistUserException} from "../../utils/ExistUserException.js";
import {DuplicateUsernameException} from "../../utils/DuplicateUsernameException.js";

export function joinEvents() {
    const joinForm = document.getElementById('joinForm');
    const checkbox = document.getElementById('checkbox');
    const validationMessageContainer = document.getElementById('passwordValidationText');

    if(joinForm) {
        joinForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const joinUsername = document.getElementById('joinUsername');
            const joinPassword = document.getElementById('joinPassword');
            const joinEmail = document.getElementById('joinEmail');

            if(joinPassword) {
                joinPassword.addEventListener('input', validatePassword);
            }

            if(joinUsername != null && joinPassword != null && joinEmail != null && checkbox) {
                try {
                    await AuthService.join(joinUsername, joinPassword, joinEmail);
                    // 성공 시 로그인 페이지로 이동
                    navigateTo('/login');
                } catch (e) {
                    if(e instanceof ExistUserException) {
                        alert('가입한 적 있는 사용자 입니다. 로그인을 진행해주세요');
                        navigateTo('/login');
                    }
                    if(e instanceof DuplicateUsernameException) {
                        alert('이미 사용중인 아이디 입니다. 다른 아이디로 재시도 해주세요');

                        // 초기화 및 포커스
                        joinUsername.value = '';
                        joinUsername.focus();
                    }

                    // 나머지 error
                    alert('서버 에러 발생 잠시후에 다시 시도');
                    throw e;
                }
            }

        })
    }
}


function validatePassword() {
    const password = document.getElementById('joinPassword').value;
    const messageSpan = document.getElementById('passwordValidationText').querySelector('span');

    if(password.length > 12 || 8 > password.length) {
        messageSpan.textContent = '비밀번호는 8자 이상 12자 이하로 입력해주세요';
        messageSpan.classList.add('text-danger');
        messageSpan.classList.remove('text-dark', 'text-success'); // 기존 색상 제거
    } else if (8 <= password.length && password.length <= 12){
        messageSpan.textContent = '비밀번호로 사용할 수 있어요😎';
        messageSpan.classList.add('text-success');
        messageSpan.classList.remove('text-dark', 'text-danger');
    } else {
        // 입력 값이 d없을 때
        messageSpan.textContent = '비밀번호는 8자 이상 12자 이하로 입력해주세요';
        messageSpan.classList.add('text-dark');
        messageSpan.classList.remove('text-success', 'text-danger');
    }
}