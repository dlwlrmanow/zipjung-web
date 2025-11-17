import {Layout} from "../../components/Layout.js";
import zipjungIconUrl from '../../assets/images/zipjung-icon.png'

export const renderMainContent = () => {
    return `
        <div class="p-5 p-lg-5 d-flex flex-column justify-content-center bg-main-light-blue text-white w-100 text-center">

            <div class="mb-4 d-flex align-items-center justify-content-center"> 
              <img src="${zipjungIconUrl}" class="me-2" style="width: 32px; height: 32px;">
              <span class="fs-1 fw-bolder text-main-dark-blue"> 집중!</span>
            </div>
            

            <h2 class="fs-2 fw-bold mb-3 text-main-dark-blue lh-sm">
              어디에서 어떤 집중을 했더라?!
            </h2>
            <div class="d-flex justify-content-center">
                <div class="col-12 col-md-7 mx-auto">
                    <p class="fs-6 text-main-dark-blue opacity-75 mb-4">
                        '집중!' 으로 오롯이 나에게 집중하는 소중한 순간들을 모아볼까요!
                        단순한 시간 기록을 넘어, 어디에서 내가 깊이 있는 집중을 하는지,
                        간결하고 직관적인 디자인으로 복잡한 설정 없이 바로 시작할 수 있습니다.
                    </p>
                </div>
            </div>
            
            <div class="mt-3 d-flex justify-content-center">
              <button class="btn px-4 py-2 bg-main-dark-blue text-white fw-semibold rounded-pill shadow-lg hover-shadow transition-all duration-300" onclick="navigateTo('/join')">
                지금 집중과 함께하기
              </button>
            </div>
          </div>
    `;
}

export const renderMainPage = (container) => {
    // DOM
    container.innerHTML = Layout(renderMainContent());
}