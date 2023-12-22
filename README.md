## 대강 순서

1. 기본 세팅(assets까지 복사)
2. server > index.js 복사(이미지, express.router 제외 / 환경 변수는 세팅 O )
3. model 스키마 추가(이미지까지) -> mongoDB의 기존 simple-blog 삭제
4. router 폴더 추가(post.js추가, 서버 idex.js에 활성화)
5. utill 폴더 추가
6. components 폴더 추가
7. pages 폴더 추가(이름 post- 로 설정)
8. postWrite 작업
9. app.js, 프록시 설정(해야 이미지 업로드 됨. 에러시 트러블 슈팅 참고)
10. Login.jsx 페이지
11. firebase 연동
12. Join.jsx 페이지 -> firebase에 회원가입 정보 들어 감
13. mongoDB에도 연동하기(server에서 -> router에 user.js 생성)
14. 로그인 LoginFunc() 설정(로그인 에러시 에러메시지 뜨게)
15. Provider, redux 설정하고 연동하기(클라이언트 reducer폴더 생성(store, userSlice.js), 클라이언트 index.js에 연동, Provider추가)
16. app.js에 firebase와 useSelector 등등 추가
17. 로그인, 로그아웃 하고 정보 받아오기 (3번 참고)
18. 테스트 후 useSelector 부분 지우기
19. 헤더에서 로그인, 로그아웃 시 헤더 바뀌게 app.js에서 했던 거 넣기.(4번 참고)
20. postWrite.jsx에서 글 쓸 때 user 정보 가져오기 (post, user 스키마 join하기)
21. model > Post.js 에서 조인하기, router에서 User.js 스키마 연동하고 findOne해주기
22. router > post.js의 list, detail에 .populate("author") 추가해서 각 페이지에 author 정보 가져오기

- reducer, redux, store, userSlice 정리하기

# client

npx create-react-app .  
npm install sass  
npm install react-bootstrap bootstrap  
npm install react-router-dom

npm install axios  
npm install http-proxy-middleware  
(src폴더에 setupProxy.js 추가)

npm i @emotion/css  
npm i @emotion/react  
npm i @emotion/styled @emotion/react

npm install firebase

npm install react-redux  
npm install @reduxjs/toolkit

### 제작과정

[firebase 문서 바로가기](https://firebase.google.com/docs/auth/web/start?hl=ko&authuser=0)

[firebase key](https://console.firebase.google.com/u/0/project/simple-blog100/settings/general/web:NmFjNTg4ZmUtMzFmNi00OWQwLTgyM2MtMDYxYzAyODQ3YzJi?hl=ko)

[redux](https://ko.redux.js.org/introduction/getting-started)

- php의 session같이 부모자식관계가 아니더라도 확인할 수 있는 전역변수같은 어쩌구

# NPM

`npm install react-redux`
`npm install @reduxjs/toolkit`

.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.

# server

(npm init;)  
npm init -y;  
npm install express --save;  
npm install mongodb;  
npm install nodemon --save;

npm install path --save;  
npm install mongoose --save;

npm install multer --save;

npm install --save aws-sdk@2.348.0
npm install multer-s3@2.10.0

(package.json파일에

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```

로 변경하기
)

#### [express js](https://expressjs.com/ko/guide/routing.html)

- 가상의 서버컴퓨터를 만들어 줌.
- Express를 임시로 설치하고 종속 항목 목록에 추가하지 않으려면, 다음과 같이 --save 옵션을 생략하십시오.  
  express가 있어야 listen, get 사용 가능.

## 제작 과정(server의 index.js)

1. 서버에 home 페이지와 express 페이지 만들기(express 프레임워크 사용)

2. 서버에 home 페이지와 모든페이지 설정하기(파일 경로 설정을 위해 path 모듈 사용)

<details>

```js
const express = require("express");
const path = require("path");

const app = express();
const port = 5050;

// 추가(정적 파일(예: 이미지, 스타일시트, 스크립트)을 제공하기 위해 Express에 정적 미들웨어를 추가)
app.use(express.static(path.join(__dirname, "../client/build")));

app.listen(port, () => {
  console.log("listening --> " + port);
});

// 변경
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// 모든 페이지 설정
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
```

</details>

- path 모듈 설치 후 작업(client의 build폴더와 연동)
- client에서 npm run build 후 server폴더 npm start 하고 연동 (포트넘버 5050)확인하기

3. MongoDB 모듈 추가하고, 서버 시작 시 MongoDB 연결 설정

<details>

```js
const mongoose = require('mongoose');

app.listen(port, () => {
    // 추가, 변경
    mongoose
        .connect(
            'mongodb+srv://wolves941110:'비밀번호 입력'@cluster0.jfxqrps.mongodb.net/reactBlog?retryWrites=true&w=majority'
        )
        .then(() => {
            console.log("running -->" + port);
            console.log("connecting --> mongDB......");
        })
        .catch((err) => {
            console.log(err)
        })
})
```

</details>
   
- 추가된 부분은 서버가 시작될 때 MongoDB와의 연결을 수립하는 부분입니다. 이것은 주로 서버가 시작되면 데이터베이스와의 연결을 설정하고, 서버에서 데이터베이스를 사용할 수 있도록 하는 관례적인 방법입니다.

- index.js에 몽구스.js 적용(get 위에)

- code: 8000 에러 -> 비밀번호 오류

- listening --> 5050  
  connecting MongoDB...  
  나오면 잘 적용된 것.

#### [MongoDB 바로가기](https://www.mongodb.com/ko-kr)

<details>
<summary>MongoDB 주소 찾기</summary>
무료로 시작하기 --> 계정 생성 or 등록 --> 데이터베이스 create or 만들어진 데이터베이스 connect --> Connect to your application Drivers 선택 --> Add your connection string into your application code에서 code 복사   
</details>
   
   
#### [mongoose js 바로가기](https://mongoosejs.com/)

몽구스는 몽고DB와 Express.js 웹 애플리케이션 프레임워크 간 연결을 생성하는 자바스크립트 객체 지향 프로그래밍 라이브러리이다.

[expressjs](https://expressjs.com/ko/guide/routing.html)

- express.Router
  express.Router 클래스를 사용하면 모듈식 마운팅 가능한 핸들러를 작성할 수 있습니다. Router 인스턴스는 완전한 미들웨어이자 라우팅 시스템이며, 따라서 “미니 앱(mini-app)”이라고 불리는 경우가 많습니다.

9898. multer 미들웨어를 사용해서 이미지 파일 업로드를 처리

<details>

```js
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});
```

</details>

[multer](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)

- 멀터(Multer)는 Node.js에서 파일 업로드를 처리하기 위한 미들웨어.
  Express 프레임워크와 특히 파일 업로드를 처리해야 하는 경우에 매우 유용합니다. 멀터를 사용하면 클라이언트에서 서버로 전송된 파일을 쉽게 처리하고 저장할 수 있습니다.
- Router의 post.js 맨 밑에 삽입.

[네이버 클라우드 시작하기](https://guide.ncloud-docs.com/docs/objectstorage-start)

- Object Storage 이용 신청
  네이버 클라우드 플랫폼의 콘솔에서 Object Storage 이용을 신청하는 방법은 다음과 같습니다.

네이버 클라우드 플랫폼 콘솔에 접속해 주십시오.
Services > Storage > Object Storage 메뉴를 차례대로 클릭해 주십시오.
[이용 신청] 버튼을 클릭해 주십시오.
이용 신청 팝업 창이 나타나면 [적용] 버튼을 클릭해 주십시오.
정상적으로 이용 신청이 완료되면 [이용 신청] 버튼이 [상품 이용 중] 버튼으로 바뀝니다.

[시작하기](https://guide.ncloud-docs.com/docs/objectstorage-start)

-

[Javascript용 AWS SDK, 파일 업로드](https://guide.ncloud-docs.com/docs/storage-storage-8-4)

- AWS S3에서 제공하는 Javascript용 SDK를 이용해 네이버 클라우드 플랫폼의 Object Storage를 사용하는 예제입니다.

[Javascript용 AWS SDK](https://guide.ncloud-docs.com/docs/storage-storage-8-4)

1. 서버 util > upload.js

```js
const AWS = require("aws-sdk");
const fs = require("fs");
const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const access_key = "ACCESS_KEY";
const secret_key = "SECRET_KEY";

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});
```

// 서버 작업?
"multer": "^1.4.5-lts.1",

// 서버에서 올릴 때
"multer-s3": "^3.0.1",

2. 서버 util > upload.js

- 이미지 기능 추가
  [multer-s3 적용하기 Usage](https://www.npmjs.com/package/multer-s3)

```js
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const access_key = "마이페이지 -> 인증키 관리 -> Access Key ID";
const secret_key = "마이페이지 -> 인증키 관리 -> secret Key";

const S3 = new AWS.S3({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key,
  },
});

function setUpload(bucket) {
  const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket,
      acl: "public-read-write",
      key: function (req, file, cb) {
        let extenstion = path.extname(file.originalname);
        cb(null, Date.now().toString() + extenstion);
      },
    }),
  }).single("file");
  return upload;
}

module.exports = setUpload;
```

3. App.js에서 로그인, 로그아웃 정보 받아오는지 테스트

```js
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // 가져올 때는 useSelector 보낼 때는 useDispatch
import { loginUser, clearUser } from "./reducer/userSlice";
import firebase from "./firebase.js";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Main from "./components/layout/Main";

import Home from "./pages/Home";
import PostList from "./components/post/PostList";
import PostWrite from "./components/post/PostWrite";
import PostDetail from "./components/post/PostDetail";
import PostModify from "./components/post/PostModify";
import Login from "./components/user/Login";
import Join from "./components/user/Join";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // 테스트 용

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo : ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  // 로그인 테스트
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  // 로그아웃 테스트(버튼 누르면 로그아웃 되게. null이 나와야 함)
  useEffect(() => {
    firebase.auth().signOut(); // 주석처리하다가 로그아웃 정보 테스트 할 때만 켜고 로그아웃 해보기.
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/list" element={<PostList />}></Route>
          <Route path="/write" element={<PostWrite />}></Route>
          <Route path="/detail/:postNum" element={<PostDetail />}></Route>
          <Route path="/modify/:postNum" element={<PostModify />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  );
};

export default App;
```

4. App.js 테스트 삭제 후 Header.jsx 변경

- App.js

```js
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux"; // 가져올 때는 useSelector 보낼 때는 useDispatch
// import { useSelector, useDispatch } from 'react-redux' app.js에서는 테스트 용
import { loginUser, clearUser } from "./reducer/userSlice";
import firebase from "./firebase.js";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Main from "./components/layout/Main";

import Home from "./pages/Home";
import PostList from "./components/post/PostList";
import PostWrite from "./components/post/PostWrite";
import PostDetail from "./components/post/PostDetail";
import PostModify from "./components/post/PostModify";
import Login from "./components/user/Login";
import Join from "./components/user/Join";

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user); 테스트 용

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo : ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  // 로그인 테스트
  // useEffect(() => {
  //   console.log("user", user);
  // }, [user])

  // 로그아웃 테스트(버튼 누르면 로그아웃 되게. null이 나와야 함)
  // useEffect(() => {
  //  firebase.auth().signOut();
  // }, []);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/list" element={<PostList />}></Route>
          <Route path="/write" element={<PostWrite />}></Route>
          <Route path="/detail/:postNum" element={<PostDetail />}></Route>
          <Route path="/modify/:postNum" element={<PostModify />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  );
};

export default App;
```

- Header.jsx

```js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "../../firebase.js";

const Header = () => {
  //userSlice에 있는 user값 가져오기
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };

  return (
    <header id="header" role="banner">
      <div className="left">
        <Link to="/">
          <h1 className="logo">
            kitch <span>candy</span> <em>Diary</em>
          </h1>
        </Link>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
            <li>
              <Link to="/write">Write</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="right">
        {user.accessToken === "" ? (
          <nav className="nav">
            <ul>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/join">join</Link>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="nav">
            <ul>
              <li>{user.displayName}님 반갑습니다! ^^</li>
              <li>
                <Link onClick={() => LogoutHandler()}>logout</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
```

## 깃허브 관련

- github 연동(repository생성 후 실행)
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin [https://github.com/kiwowki/simple200.git]([]빼고 자기 주소 넣기)
  git push -u origin main

- 깃 업로드 방법
  npx create-react-app . 치기

git add .  
git status  
git commit -m "어쩌구"  
git push -u origin main

- .gitignore 설정(루트에)
  server/node_modules  
  server/package-lock.json
  client/node_modules
  client/package-lock.json

## 트러블 슈팅

.  
.  
.

<details>
    <summary>깃허브 화살표 폴더 문제 해결(깃허브 내 캐시 제거)</summary>

다음 작업들은 반드시 화살표가 생긴 폴더 경로에서 해야 한다.

1. .git 파일 제거 or 실제 폴더 안의 .git 폴더 제거
   `rm -rf .git`
2. 스테이지에 존재하는 파일 제거
   `git rm --cached . -rf`

캐시 제거 후 루트 경로에서 다시 git add .

[참고 사이트](https://velog.io/@yena1025/%EA%B9%83%ED%97%88%EB%B8%8C-%ED%99%94%EC%82%B4%ED%91%9C-%ED%8F%B4%EB%8D%94-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)

</details>
.   
.   
.   
<details>
    <summary>fatal: not a git repository (or any of the parent directories): .git 에러</summary>

`$ git init`
`$ git remote add origin`
[참고 사이트](https://velog.io/@yoon_han0/fatal-not-a-git-repository-or-any-of-the-parent-directories-.git)

</details>
.   
.   
.   
<details>
    <summary>세팅 후 404 에러</summary>

보통 서버와 클라이언트 연동시 404에러가 난다면 Proxy설정을 안 했거나, 적용이 안 된 것이다.

```js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5050",
      changeOrigin: true,
    })
  );
};
```

를 client > src > setupProxy.js 에 저장하고 한 번 껐다 켜면 에러가 사라진다.

[http-proxy-middleware](https://create-react-app.dev/docs/proxying-api-requests-in-development)

- Back-End Integration -> Proxying in Development의 맨 밑 코드 복사하기

</details>
.   
.   
.   
<details>
    <summary>multer 적용 후 이미지 업로드 시 504 or 500 오류</summary>

[참고 사이트](https://stackoverflow.com/questions/72431773/multers3-is-giving-this-client-send-is-not-a-function-error)

- multer 버전 호환 오류.(3버전으로 다운받았을 경우)
  `npm uninstall multer-s3` 로 기존 multer 삭제 후
  `npm i multer-s3@2.10.0` 로 새로 설치하기

</details>
.   
.   
.   
<details>
    <summary>회원가입 완료 버튼 누른 뒤 504 오류</summary>
</details>

<details>
    <summary>detail.jsx에서 displayName 못 받아오는 현상</summary>
    async, await 오류로서, 로딩이 데이터를 받아오는 것 보다 빨라서 생기는 문제
    flag설정해서 로딩중 페이지 만들기

```js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// 상세보기에 user 정보 가져오기
import { useSelector } from "react-redux";

const PostDetail = () => {
  let params = useParams();
  let navigate = useNavigate();

  const [postInfo, setPostInfo] = useState({});
  // 먼저 로딩 되는 현상 해결
  const [flag, setFlag] = useState(false);
  // userSlice에서 정보 가져오기
  const user = useSelector((state) => state.user);

  // 글 정보 가져오기

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

    axios
      .post("/api/post/detail", body)
      .then((respose) => {
        if (respose.data.success) {
          setPostInfo(respose.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.postNum]);

  const DeleteHandler = () => {
    if (window.confirm("정말로 삭제하겠습니까?")) {
      let body = {
        postNum: params.postNum,
      };
      axios
        // 삭제 할 번호 설정
        .post("/api/post/delete", body)
        .then((response) => {
          if (response.data.success) {
            alert("게시글이 삭제되었습니다.");
            navigate("/list");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("게시글 삭제가 실패햇습니다.");
        });
    }
  };

  return (
    <>
      <div className="detail_wrap">
        {flag ? (
          <>
            <div className="detail_title">
              <h3>{postInfo.title}</h3>
              <p className="auth">{postInfo.author.displayName}</p>
            </div>
            <div className="detail_content">
              {postInfo.image ? (
                <img src={`${postInfo.image}`} alt={postInfo.title} />
              ) : null}
              {postInfo.content}
            </div>

            {user.uid === postInfo.author.uid && (
              <div className="detail_btn">
                <Link to={`/modify/${postInfo.postNum}`}>수정하기</Link>
                <button onClick={() => DeleteHandler()}>삭제하기</button>
              </div>
            )}
            <div className="detail_btn">
              <Link to="/list">목록보기</Link>
            </div>
          </>
        ) : (
          <div>로딩중</div>
        )}
      </div>
    </>
  );
};

export default PostDetail;
```

</details>

.  
.  
.

<details>
    <summary>[Git 경고 메세지] LF will be replaced by CRLF in 해결 방안</summary>

- `git config --global core.autocrlf true`
</details>
