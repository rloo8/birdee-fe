# 🐦 BIRDEE


## 📂 프로젝트 소개

**버디(BIRDEE)**(자신과 가까운 사람, 또는 익명의 누군가와 함께 교환일기를 쓸 수 있는 플랫폼)

> 다양한 소셜 네트워크 서비스 편리함 속에서 가벼운 대화가 많아지고, 특정한 사람과 깊은 소통이 부족한 경우가 많다.
이러한 상황에서 우리는 좀 더 의미 있는 소통의 가치를 찾고자 했다.


## 📆 개발 기간
2023.11.7 ~ 2023.12.7

## 👥 멤버 구성
- 김영은(Front-End)
- 고지수(Back-End)

## ⚙️ 기술 스택
- 프론트엔드 : React.js, JavaScript, HTML, CSS
- 백엔드 : Node.js, Sequelize (ORM - Object-Relational Mapping)
- 클라우드 서비스 : Azure App Service, Azure DB for MySQL, Azure Cloud, Azure Function app
- 컨테이너화 및 가상화 : Docker
- 기타 툴 : Notion, Postman, Github, VSCode



## 📌 주요 기능
- 다중 사용자 기능 : 최대 4인까지 함께 일기 작성 가능
- 일기 작성 제한 : 하루에 한번 씩만 일기 작성 가능
- 상대방 작성 필수 : 순서대로만 일기 작성 가능
  
- 랜덤 교환 일기 : 랜덤 사용자를 초대하여 일기 작성 가능
  
- 카테고리 분류 : 나만의 카테고리로 일기 분류 가능
- 일기장 숨김 : 메인 화면에서 일기장을 숨기기 가능
- 일기장 삭제 : 삭제한 일기장은 휴지통으로 이동 후, 7일 뒤 삭제
  

## 시스템 구성도
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/6599b49d-cc28-4da2-8732-7fce77f7f593)


## DB 설계
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/3a4b4f9d-d895-489c-91d4-10da5d02b3be)



## 구현

### 회원가입
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/c8af296b-b8cd-4a48-bb8d-8b73d0eba838)

- 아이디 중복 여부 확인
- 모든 입력창 작성 조건 확인
- 계정 생성 성공 시 로그인 페이지로 이동

### 로그인
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/b780132c-d802-4edd-9235-ae85126f8108)

- 로그인 입력 정보 확인
- 로그인 성공 시 토큰 저장
- 토큰을 통한 페이지 권한 제어

### 카테고리 분류 / 페이지네이션
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/4b48e21c-d724-4049-b5a7-d05a941ce925)

- drag&drop으로 카테고리 분류
- 카테고리 이외의 곳에 드롭 시 삭제
- 커서 기반 페이지네이션

### 일기장 생성 시 친구 초대
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/fbfb209b-0e06-486a-92fb-d5a9839cd61c)
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/169b4ec2-3201-4d7f-9309-20003cba9322)

- 친구 초대 시 아이디 유효성 검사
- 랜덤 친구 초대 : 랜덤 초대를 허용한 임의의 유저와 매칭
- 일기장 생성 및 초대 전송

### 초대 메일 전송
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/598afd5f-0aae-48a8-8a32-032c9a2a2534)

- nodemailer 사용
- 버튼 url로 초대 정보가 담긴 토큰 전달
- 수락 시 초대 상태 업데이트

### 일기장 삭제
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/44a36ed9-2495-4244-8929-0680b11a0f92)

- Azure Function App
- Time Trigger

### 일기 작성 및 조회
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/4ec0ba6b-ee50-437a-b9fb-d108eeda7685)

- 글쓰기 버튼 활성화 제약
- 캘린더에 작성일 표시
- 해당 날짜 클릭 시 스크롤
- 이모지 입력 가능

### 마이페이지
![image](https://github.com/nambu-web-cloud-course/birdee-fe/assets/141135378/b26ce975-61e8-48db-95f3-6fbe61fdef4a)

- 사용자 정보 조회 및 수정
- 사진 등록 : Azure Blob Storage에 저장
- 초대된 일기 목록 확인
- 숨김/삭제 일기장 확인
