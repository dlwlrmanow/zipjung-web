import {Layout} from "../../components/Layout.js";
import {focusTimeEvents} from "../Handler/FocusedTimeListHandler.js";
import {focusTimerEvents} from "../Handler/FocusTimerHandler.js";
import {loadKakaoMap} from "../Handler/LoadKakaoMapHandler.js";

export const renderMainTimerContent = () => {
    return `
        <div class="container-fluid p-4" style="max-width: 1200px;">
        <div class="row g-4">
            
            <!-- 왼쪽: 이미지 스타일 타이머 UI -->
            <div class="col-lg-6">
                <div class="app-card h-100 d-flex flex-column">
                    <!-- 헤더 영역 -->
                    <div class="app-header">
                        <div class="header-title">
                            <i class="bi bi-heptagon-fill blueberry-icon"></i> <!-- TODO: png로 변경하기 -->
                            집중 집중!
                        </div>
                    </div>

                    <!-- 메인 컨텐츠 영역 -->
                    <div class="d-flex flex-column align-items-center flex-grow-1 pt-4">
                        
                        <!-- 타이머 시간 표시 (HH:MM:SS) -->
                        <div id="timerDisplay" class="timer-display">00:00:00</div>

                        <!-- 컨트롤 버튼 (재생, 리셋) -->
                        <div class="d-flex gap-4 align-items-center mb-4">
                            <!-- 재생/일시정지 -->
                            <button id="btnStartPause" class="control-btn" title="시작/일시정지">
                                <i class="bi bi-play-circle" id="iconStartPause"></i> <!-- 이미지처럼 원형 아이콘 -->
                            </button>
                            
                            <!-- 리셋 -->
                            <button id="btnReset" class="control-btn" title="초기화">
                                <i class="bi bi-arrow-clockwise"></i> <!-- 이미지의 회전 화살표 -->
                            </button>
                        </div>

                        <!-- 저장 버튼 -->
                        <button id="btnSave" class="btn-save-custom">
                            오늘의 집중 저장
                        </button>
                    </div>

                    <!-- 하단 총 집중시간 영역 -->
                    <div class="total-time-card mt-4">
                        <div class="total-time-title">오늘의 총 집중시간</div>
                        <div id="totalTimeDisplay" class="total-time-display">00:00:00</div>
                    </div>
                </div>
            </div>

            <!-- 오른쪽: 저장 목록 섹션 (테마 통일) -->
            <div class="col-lg-6">
                <div class="list-card p-4">
                    <div class="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                        <h5 class="m-0 fw-bold text-secondary"><i class="bi bi-journal-text me-2"></i>집중 기록</h5>
                        <button id="btnClearAll" class="btn btn-sm btn-outline-danger rounded-pill px-3">기록 전체 삭제</button>
                    </div>

                    <!-- focus time list container 영역 -->
                    <ul id="recordListContainer" class="list-group list-group-flush scroll-area">
                        <li class="list-group-item text-center text-muted py-5" id="loadingMessage">
                          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          집중 기록을 불러오는 중 ...
                        </li>
                    </ul>
                    
                    <div id="emptyMessage" class="alert alert-info text-center mt-3 d-none" role="alert">
                        <i class="bi bi-check-circle-fill me-2"></i> 아직 집중 기록이 없어요!
                    </div>

                </div>
            </div>
        </div>
    </div>
    
    <div class="modal fade" id="locationModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">위치 검색</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <input type="text" id="mapSearchKeyword" class="form-control" placeholder="장소를 입력하세요">
                        <button class="btn btn-primary" type="button" id="searchBtn">검색</button>
                    </div>
                    <div class="map_wrap">
                        <div id="map" style="width:100%;height:60vh;position:relative;overflow:hidden;"></div>
                        <div id="menu_wrap" class="bg_white">
                            <ul id="placesList"></ul>
                            <div id="pagination"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

export const renderMainTimerPage = (container) => {
    container.innerHTML = Layout(renderMainTimerContent());

    focusTimerEvents(); // 타이머 관련
    focusTimeEvents(); // 집중 기록 관련

    const locationModal = document.getElementById('locationModal');
    // 모달이 완전히 열린 후에 지도 대기
    locationModal.addEventListener('shown.bs.modal', () => {
        loadKakaoMap();
    });
}