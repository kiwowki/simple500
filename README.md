# 리스트, 디테일 페이지에 display 적용 이후 대강 순서

### 기본적 순서

- client 에서 작업 -> server 작업

기본적으로 ajax 내장되어있음.

1. UserJoin.jsx에 닉네임 중복검사 만들기

- 닉네임 밑에 중복검사 버튼 만들기
- nameCheck, nameInfo 등 상태변수들 만들어주기
- NameCheckFunc함수 만들어서 중복검사 하기 (nameInfo로 메세지 만들기, Axios를 사용하여 서버에 POST 요청을 보내기)
- 서버 router > user.js에서 받기("/api/user/namecheck")

{user.accessToken && <RepleWrite postId={props.postId} />}
// 로그인 되어있어야 write가 보임

[usehooks - 토글메뉴(useOnClickOutside)](https://usehooks.com/)
[momentjs - 시간](https://momentjs.com/)




## client

npx create-react-app .  
npm install sass  
npm install react-bootstrap bootstrap  
npm install react-router-dom  
npm install axios  
npm install http-proxy-middleware  
npm install @emotion/css  
npm install @emotion/react  
npm install @emotion/styled  
npm install firebase  
npm install react-redux  
npm install @reduxjs/toolkit

npm install react-avatar
npm install moment

## server

npm init -y;  
npm install express --save;  
npm install nodemon --save;  
npm install path --save;  
npm install mongoose@6.12.2 --save;  
npm install multer --save;  
npm install aws-sdk@2.348.0 --save;  
npm install multer-s3@2.10.0 --save;

## 문제 해결

- client 폴더에 화살표 생길 때 : .git 폴더를 지운다.  
  `rm -rf .git`  
  `git rm --cached . -rf`# simple300

- 대부분의 오류 : 버전 충돌..
- 댓글기능 수정 후 `MongooseError: Model.prototype.save() no longer accepts a callback` 에러.
