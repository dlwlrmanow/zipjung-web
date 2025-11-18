import {ExistUserException} from "../../utils/ExistUserException.js";
import {DuplicateUsernameException} from "../../utils/DuplicateUsernameException.js";

export function joinEvents() {
    const joinForm = document.getElementById('joinForm');
    const joinPassword = document.getElementById('joinPassword');
    const consentCheck = document.getElementById('consentCheck');
    const joinUsername = document.getElementById('joinUsername');
    const joinEmail = document.getElementById('joinEmail');

    // 비밀번호 유효성 확인
    if(joinPassword) {
        // 파라미터가 들어간 경우 () => {} 사용
        joinPassword.addEventListener('input', () => {
            validatePassword(joinPassword);
        });
    }

    if(joinForm) {
        joinForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const usernameValue = joinUsername.value.trim();
            const emailValue = joinEmail.value.trim();

            // 폼 유효성 확인
            if(usernameValue == null) {
                alert('아이디를 입력해주세요');
                joinUsername.focus();
                return;
            }

            if(emailValue == null) {
                alert('이메일을 입력해주세요');
                joinEmail.focus();
                return;
            }

            if(!consentCheck) {
                alert('필수 동의 사항에 동의해주세요');
                consentCheck.focus();
                return;
            }

            if(usernameValue != null && joinPassword != null && emailValue != null && consentCheck) {
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

                        // 초기화 및 포커스 + 이전 입력한 데이터는 그대로
                        joinUsername.value = '';
                        joinUsername.focus();
                        return; // 빠져나와 재시도
                    }

                    // 나머지 error
                    alert('서버 에러 발생 잠시후에 다시 시도');
                    throw e;
                }
            }

        })
    }
}

function validatePassword(inputJoinPassword) {
    const passwordValue = inputJoinPassword.value.trim();
    const messageSpan = document.getElementById('passwordValidationText').querySelector('span');

    if(passwordValue.length > 12 || 8 > passwordValue.length) {
        messageSpan.textContent = '비밀번호는 8자 이상 12자 이하로 입력해주세요';
        messageSpan.classList.add('text-danger');
        messageSpan.classList.remove('text-dark', 'text-success'); // 기존 색상 제거
    } else if (8 <= passwordValue.length && passwordValue.length <= 12){
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