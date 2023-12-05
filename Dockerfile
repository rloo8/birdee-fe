# 기반 이미지 설정
FROM node:18

# 백엔드 API의 URL을 환경 변수로 설정
ENV REACT_APP_HOST_URL = https://apibirdeedoc.azurewebsites.net

# 앱 소스 코드를 포함하는 디렉토리 생성
WORKDIR /app

# 앱 종속성 설치 (package.json 및 package-lock.json 복사 후)
COPY package*.json ./
RUN npm install

# 앱 소스 코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 앱 실행을 위한 명령어
CMD ["npm", "start"]

