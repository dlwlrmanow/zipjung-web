import {loginEvents} from "../module/LoginHandler.js";

export const renderLoginContent = () => {
    return `
        <main class="d-flex flex-column align-items-center justify-content-center py-4 px-3 min-h-content">
        
          <!-- 기존의 2단 레이아웃 카드 -->
          <div class="card bg-white rounded-4 shadow-lg overflow-hidden w-100 max-w-5xl-card transition-all duration-300 border-0">
        
            <div class="row g-0">
        
              <!-- 1. 왼쪽 섹션: 소개글 (메인 컬러 포인트) -->
              <div class="col-md-6 p-5 p-lg-5 d-flex flex-column justify-content-center bg-main-light-blue text-white">
        
                <!-- 앱 로고/아이콘 영역 -->
                <div class="mb-4 d-flex align-items-center">
                  <!-- 앱 아이콘을 SVG로 단순화하여 배치 -->
                  <svg class="me-3" style="width: 56px; height: 56px;" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="var(--main-dark-blue)"/>
                    <path d="M12 4.5C12 4.5 9.5 7 9.5 11.5C9.5 15.5 12 18 12 18C12 18 14.5 15.5 14.5 11.5C14.5 7 12 4.5 12 4.5Z" fill="var(--main-light-blue)"/>
                  </svg>
                  <span class="fs-1 fw-bolder text-main-dark-blue">집중!</span>
                </div>
        
                <h2 class="fs-2 fw-bold mb-3 text-main-dark-blue lh-sm">
                  어디에서 어떤 집중을 했더라?!
                </h2>
                <p class="fs-6 text-main-dark-blue opacity-75 mb-4">
                  '집중!' 으로 오롯이 나에게 집중하는 소중한 순간들을 모아볼까요!
                  단순한 시간 기록을 넘어, 어디에서 내가 깊이 있는 집중을 하는지,
                  간결하고 직관적인 디자인으로 복잡한 설정 없이 바로 시작할 수 있습니다.
                </p>
                <div class="mt-3">
                  <button class="btn px-4 py-2 bg-main-dark-blue text-white fw-semibold rounded-pill shadow-lg hover-shadow transition-all duration-300">
                    앱 자세히 알아보기
                  </button>
                </div>
              </div>
        
              <!-- 2. 오른쪽 섹션: 로그인 폼 (앱 디자인 미러링) -->
              <div class="col-md-6 p-5 p-lg-5 d-flex flex-column justify-content-center bg-white">
                <h3 class="fs-4 fw-bold mb-4 text-center text-secondary">
                  회원 로그인
                </h3>
        
                <form id="loginForm" class="needs-validation" novalidate>
                  <!-- 아이디 입력 필드 (앱의 라이트 블루 배경 미러링) -->
                  <div class="mb-3">
                    <label for="username" class="form-label text-secondary">아이디</label>
                    <input
                            type="text"
                            id="username"
                            placeholder="아이디를 입력해주세요"
                            class="form-control form-control-lg bg-light-blue-30 border-main-light-blue rounded-4 focus-ring-main-light-blue"
                    />
                  </div>
        
                  <!-- 비밀번호 입력 필드 (앱의 라이트 블루 배경 미러링) -->
                  <div class="mb-4">
                    <label for="password" class="form-label text-secondary">비밀번호</label>
                    <input
                            type="password"
                            id="password"
                            placeholder="비밀번호를 입력해주세요"
                            class="form-control form-control-lg bg-light-blue-30 border-main-light-blue rounded-4 focus-ring-main-light-blue"
                    />
                  </div>
        
                  <!-- 로그인 버튼 (앱의 다크 블루 버튼 미러링) -->
                  <button
                          type="submit"
                          class="btn btn-lg w-100 py-3 bg-main-dark-blue text-white fw-bold rounded-4 shadow-sm hover-shadow transition-all duration-200"
                  >
                    Login
                  </button>
                </form>
        
                <div class="mt-5 pt-3 border-top d-flex justify-content-between align-items-center">
                  <!-- '집중 기록 시작하기!' 텍스트 (앱과 유사) -->
                  <p class="text-sm text-secondary fw-medium mb-0">집중 기록 시작하기!</p>
        
                  <!-- Join Us 버튼 (앱과 유사한 연한 회색 버튼 미러링) -->
                  <button id="joinBtn" class="btn px-4 py-2 bg-secondary-subtle text-secondary fw-semibold rounded-3 hover-bg-secondary-subtle transition-all duration-200">
                    Join Us
                  </button>
                </div>
              </div>
        
            </div>
          </div>
        </main>`
};

export const renderLoginPage = (container) => {
    // header, footer 제외
    container.innerHTML = renderLoginContent(); // 함수로 호출해야

    // 로그인 이벤트
    loginEvents();
}
