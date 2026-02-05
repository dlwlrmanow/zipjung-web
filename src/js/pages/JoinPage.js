import zipjungIconUrl from '../../assets/images/zipjung-icon.png'
import {joinEvents} from "../Handler/JoinHandler.js";

export const renderJoinContent= () => {
    return `
        <main class="d-flex align-items-center justify-content-center py-5 bg-light-blue-50">
          <div class="card bg-white rounded-4 shadow-lg border-0" style="max-width: 500px; width: 90%;">
            <div class="p-4 p-sm-5">
              
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div class="d-flex align-items-center">
                  <img src="${zipjungIconUrl}" alt="앱 아이콘" style="width: 30px; height: 30px;" class="me-2">
                  <h2 class="fs-5 fw-bold text-dark mb-0">집중! 회원가입</h2>
                </div>
                <button type="button" class="btn-close" aria-label="Close" onclick="navigateTo('/')"></button>
              </div>
        
              <form id="joinForm" class="needs-validation" novalidate>
                
                <div class="mb-3">
                  <label for="joinUsername" class="form-label fw-bold text-dark">아이디</label>
                  <input type="text" id="joinUsername" placeholder="아이디를 입력해주세요"
                         class="form-control bg-light-blue-10 border-0 rounded-3 p-3" required>
                  <div class="invalid-feedback">아이디를 입력해주세요.</div>
                </div>
        
                <div class="mb-3">
                  <label for="joinPassword" class="form-label fw-bold text-dark">비밀번호</label>
                  
                  <div id="passwordValidationText" class="text-start small mb-1">
                    <span class="text-dark">비밀번호는 8자 이상 12자 이하로 입력해주세요</span>
                  </div>
                  
                  <input type="password" id="joinPassword" placeholder="8자 이상 12자 미만"
                         class="form-control bg-light-blue-10 border-0 rounded-3 p-3" required>
                </div>
        
                <div class="mb-4">
                  <label for="joinEmail" class="form-label fw-bold text-dark">이메일</label>
                  <input type="email" id="joinEmail" placeholder="이메일을 입력해주세요"
                         class="form-control bg-light-blue-10 border-0 rounded-3 p-3" required>
                  <div class="invalid-feedback">유효한 이메일을 입력해주세요.</div>
                </div>
        
                <div class="mb-4">
                  <div class="form-check d-flex align-items-start">
                    <input class="form-check-input me-3" type="checkbox" id="consentCheck" required>
                    <div class="text-start">
                      <label class="form-check-label fw-bold" for="consentCheck">필수 동의 사항</label>
                      <p class="small text-muted mb-0">개인정보 수집 동의 안내</p>
                      <p class="small text-muted mb-0">수집 항목: 이메일, 로그인ID, 비밀번호, 접속 로그, 사용자 위치 등</p>
                      <div class="invalid-feedback">필수 동의가 필요합니다.</div>
                    </div>
                  </div>
                </div>
        
                <button type="submit"
                        class="btn btn-primary w-100 py-3 fw-bold rounded-3" 
                        > 
                  회원 가입 완료
                </button>
              </form>
            </div>
          </div>
        </main>
    `;

}

export const renderJoinPage = (container) => {
    // layut 제외
    container.innerHTML = renderJoinContent();

    joinEvents();
}