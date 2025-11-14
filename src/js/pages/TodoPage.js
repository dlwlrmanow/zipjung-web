import {Layout} from "../../components/Layout.js";

export const renderTodoContent = () => {
    return `
        <!-- 3. 메인 콘텐츠 컨테이너 -->
        <main class="flex-grow-1">
          <div class="container max-w-5xl-card mx-auto px-4 px-sm-5 my-5">
            <!-- Main Content Row -->
            <div class="row g-4">
        
              <!-- Full Width: To-Do List -->
              <div class="col-12">
                <div class="card shadow-sm p-4 todo-list-card">
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="h5 fw-bold mb-0">오늘의 할 일</h2>
                  </div>
        
                  <!-- New To-Do Input Form -->
                  <div class="input-group mb-4">
                    <input type="text" id="todoInput" class="form-control form-control-lg" placeholder="새로운 할 일을 입력하세요" aria-label="새로운 할 일">
                    <button class="btn btn-main-dark-blue" type="button" id="addTodoBtn">
                      <i class="bi bi-plus-lg"></i> 추가
                    </button>
                  </div>
        
                  <!-- To-Do List Container -->
                  <ul class="list-group list-group-flush" id="todoListContainer">
                    <li class="list-group-item text-center text-muted py-5" id="loadingMessage">
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      할 일 목록을 불러오는 중...
                    </li>
                    <!-- To-Do items will be dynamically inserted here -->
                  </ul>
        
                  <div id="emptyMessage" class="alert alert-info text-center mt-3 d-none" role="alert">
                    <i class="bi bi-check-circle-fill me-2"></i> 모든 할 일을 완료했어요! 새로운 목표를 추가해보세요.
                  </div>
        
                </div>
              </div>
        
            </div>
          </div>
        </main>
    `;
}

export const renderTodoPage = (container) => {
    container.innerHTML = Layout(renderTodoContent());
}