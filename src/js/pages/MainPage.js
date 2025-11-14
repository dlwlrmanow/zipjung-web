import {Layout} from "../../components/Layout.js";

export const renderMainContent = () => {
    return `
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
    `;
}

export const renderMainPage = (container) => {
    // DOM
    container.innerHTML = Layout(renderMainContent());
}