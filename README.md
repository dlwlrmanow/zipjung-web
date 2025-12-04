# Zipjung!

프로젝트나 학교 시험, 과제 등 중요한 일을 앞두고 집중이 필요할 때 <span style='background-color: #fff5b1'> 위치를 기반으로 당신의 집중 시간을 기록하여 어디에서 얼마나 어떤 일들을 해냈는지, 어느 장소에서 당신의 집중력이 최대치를 발휘 </style> 하는지를 발견하고 기록합니다.

### 🛠 Frontend Tech Stack

<img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=white" />
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/bootstrap-%237952B3.svg?&style=for-the-badge&logo=bootstrap&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<br/>

### 🛠 Backend Tech Stack
<img src="https://img.shields.io/badge/java-%23007396.svg?&style=for-the-badge&logo=java&logoColor=white" />
<img src="https://img.shields.io/badge/spring-%236DB33F.svg?&style=for-the-badge&logo=spring&logoColor=white" />
<img src="https://img.shields.io/badge/mysql-%234479A1.svg?&style=for-the-badge&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/redis-%23DC382D.svg?&style=for-the-badge&logo=redis&logoColor=white" /><img src="https://img.shields.io/badge/python-%233776AB.svg?&style=for-the-badge&logo=python&logoColor=white" />

<br/>
<br/>

## web - 기능 소개

### 회원가입
#### 비밀번호 조건 입력
조건을 만족해야 회원가입이 가능하기 때문에 사용자에게 미리 UI로 조건이 만족되었는지 확인할 수 있도록 화면에 표시
<img width="501" height="134" alt="Image" src="https://github.com/user-attachments/assets/4bf3a13c-fc06-4538-b2a3-feca2a3609f9" />
<img width="499" height="128" alt="Image" src="https://github.com/user-attachments/assets/378758c8-1557-4385-8a5b-18c94c27c79d" />
<img width="500" height="127" alt="Image" src="https://github.com/user-attachments/assets/8bd0d704-5912-4e8b-a3f9-5248ce08e1ad" />

#### ⚠️ Todo, 위치기반 집중기록, 집중 기록 평가 등 권한이 필요한 페이지는 로그인이 되어있지 않은 경우 로그인 페이지로 이동합니다.
![Image](https://github.com/user-attachments/assets/4450cd32-561e-4e63-ac68-c7ac791c33c6)

### Todo
#### Todo(할 일) 추가하기
할 일을 적고 enter 혹은 '+ 추가' 버튼으로 할일 추가 성공적으로 반영된 경우 SSE 실시간 알림
![Image](https://github.com/user-attachments/assets/51fe6284-94a1-4907-8571-9c96b1c93cb9)

#### Todo(할 일) 완료
할 일 완료 체크시 3초 지연시간을 두고 완료 상태를 반영 + SSE 알림 보내도록 구현, 그 지연 시간동안 사용자가 다시 할 일 완료를 취소하는 경우 완료 상태가 DB에 반영되지 않음
![Image](https://github.com/user-attachments/assets/f164e562-7e02-43a0-8ec0-fd521fe0f5e8)

#### Todo(할 일) 삭제
할 일 삭제 버튼 클릭시 할 일 id를 서버에서 받아 is_deleted = true로 update


