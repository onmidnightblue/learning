## :speech_balloon: 왜 써야 할까 ?

### 서버 사이드 렌더링
- react는 클라이언트 사이드 자바스크립트 라이브러리라서 모든 렌더링이 클라이언트 측에서 일어난다.
    - 처음 페이지를 들어왔을 때에 서버에 데이터를 요청하기 때문에 사용자는 잠깐 동안 로딩 화면을 목격하게 되는데, 이 부분은 사용자에게 불편함을 느끼게 할 수 있다.
- 검색 엔진 최적화도 문제가 될 수 있다.
    - 일반적인 react 페이지의 소스 코드를 확인해보면 코드가 많이 비어 있는 것을 볼 수 있다.
    - 컨텐츠가 많은 경우 사용자의 유입이 중요한데, 검색 엔진 크롤러는 비어 있는 초기 html 페이지만 보고 있기 때문에 크롤러가 컨텐츠를 가져오지 못하는 상황이 발생한다.
    

next를 사용하면 서버에서 화면을 만들고 클라이언트에 보여주기 때문에 첫 진입 시 로딩 같은 화면 깜빡임을 해소할 수 있다. 

또한 html도 채워서 보여주어 크롤러 문제도 해결할 수 있다.
<br />

### 파일 기반 라우팅

- react에서는 react router를 사용해 라우팅을 구현한다.
    - 때문에 추가로 코드를 작성해야 한다.

next는 페이지 역할을 하는 컴포넌트를 ‘page’라는 별도의 디렉토리에 저장해 라우터 설정을 하기 때문에 따로 코드를 작성할 필요가 없다.
<br />

### 백엔드 api를 쉽게 추가할 수 있다.
<br />
<br />

## :speech_balloon: start

### node.js 설치

[Node.js](https://nodejs.org/ko/)
<br />

### create next app

```jsx
npx create-next-app

? what is your project named ? 여기에 폴더 이름 적고 enter
```
<br />

### 폴더 구조

```jsx
+---pages
|       index.js
|       _app.js
|
+---public
|       favicon.ico
|       vercel.svg
|
\---styles
        globals.css
```

- pages
    파일 기반 라우팅을 설정하고 애플리케이션을 구성할 여러 페이지를 정의함
    
- public
    페이지에서 사용할 공개 리소스
    ex) image
    
- styles
    스타일 파일
<br />

<aside>
필요없는 파일 및 폴더

- styles > Home.module.css
- pages > api
</aside>
<br />

## :speech_balloon: pages

### index와 서브 페이지 만들기

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/da4e8558-2ae2-4340-9972-c5314aed84b9/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T001517Z&X-Amz-Expires=86400&X-Amz-Signature=8a66289db206b727cb1f3fc99b13082d26f057f36f08108db68aeabe74499a5c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="pages folder" width="400px" />
<br />

- index.js
  .com/ 페이지를 나타낸다.
  <br />
    
    ```jsx
    function HomePage() {
      return <h1>HomePage</h1>;
    }
    
    export default HomePage;
    ```
    
    index.js 파일 안에서 위와 같이 작성하고 터미널에서 실행한 후 
    
    localhost:3000에 접속하면 아래와 같은 화면을 확인할 수 있다.
    <br />
    
    ```jsx
    npm run dev
    ```
    <br />
    
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/72cd1b4c-ad77-4853-bd2d-bcb7a86dec7a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T001551Z&X-Amz-Expires=86400&X-Amz-Signature=ed3d77c4b4e9ca9c6512da4f4a701086f23a2d3efec235226def9fe4842dcfc5&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="homepage localhost3000" width="400px"/>
    
- news.js
    .com/news 페이지를 나타낸다.
    <br />

    ```jsx
    function NewsPage() {
      return <h1>NewsPage</h1>;
    }
    
    export default NewsPage;
    ```
    <br />

    <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/fca734b6-8d2f-48fb-821f-f6ae36d6f31c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T001647Z&X-Amz-Expires=86400&X-Amz-Signature=38646c4d9eab3326ef0ec39ddb78e663f1d9d61292c527c8fac72de543741633&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="newspage localhost3000" width="400px" />
    
    페이지의 소스 코드에서 `<h1>NewsPage</h1>`을 확인할 수 있다.

    <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7b08f80f-2a54-4bea-88c0-9c82752b7f8f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T001840Z&X-Amz-Expires=86400&X-Amz-Signature=b485af625d81d4645624738217ae6a0f40fc2242084149da6f60a36dcde8c050&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="page source" width="400px" />
<br />
<br />

### 중첩 경로 설정하기

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/830fc23f-5fb8-488b-bfbe-8ba2d2b1511c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T002254Z&X-Amz-Expires=86400&X-Amz-Signature=cc67866e9a5a1117d6abca5083620db21592ae74e569409c81ccbd89929469d2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="중첩 경로 폴더 만들기" width="400px" />
<br />

- pages > news > index.js
    위에서 만들었던 pages >new.js와 같은 결과를 보여준다.
- pages > news > detail.js
    .com/news/detail 페이지를 나타낸다.
    <br />

    ```jsx
    function DetailPage() {
      return <h1>DetailPage</h1>;
    }
    
    export default DetailPage;
    ```
    <br />

    <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a32a40ba-9ad3-48a0-8670-760847e57440/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T002334Z&X-Amz-Expires=86400&X-Amz-Signature=ef7de92baa2e33a20769739da9d0185877ab66383f5f82d56019e7e194e0d878&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="detailpage localhost3000" width="400px" />
    

이런 식으로 폴더를 계속 계속 중첩해 중첩된 path를 만들 수 있다.
<br />
<br />

### 동적 페이지 만들기

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/67d2b2de-8d60-4de6-89ad-65167a4b52bc/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T002415Z&X-Amz-Expires=86400&X-Amz-Signature=943e77f5a2a574186cb9adffe315f0f2c1afb57df3daf941a4259939ea5c9b88&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="동적 페이지 폴더 만들기" width="400px" />
<br />

- 파일 이름에 대괄호([])를 사용하면 동적인 페이지를 만들 수 있다.
<br />

    ```jsx
    function DetailPage() {
      return <h1>DetailPage</h1>;
    }
    
    export default DetailPage;
    ```
  <br />

  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a600bfb2-e2f4-44bb-9d27-fbf3e9b4acc4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T002512Z&X-Amz-Expires=86400&X-Amz-Signature=429132e7a8df5d0717f18264068223ee7b3469f0d0613f216b1a9ed3a6197295&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="동적 페이지 만들기" width="400px" />
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7df3915a-f81d-42d3-9959-f69233504f2a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T002518Z&X-Amz-Expires=86400&X-Amz-Signature=be983b6a90e04365a38c65ef91163add11c820294b2765cd038ea0885a9a663c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="동적 페이지 만들기" width="400px" />
    
  주소 검색창에서 news/ 뒤에 무엇을 입력하더라도 DetailPage로 연결된다.
<br />
<br />

### 동적 페이지에서 매개변수를 활용하는 방법

useRouter를 사용하면 라우터 객체에 접근해서 특정 데이터나 호출할 수 있는 메서드를 얻을 수 있다.

```jsx
import { useRouter } from "next/router";
function DetailPage() {
  const router = useRouter();
  console.log(router);

  return <h1>DetailPage</h1>;
}
```
<br />

이렇게 콘솔에 출력을 해보면 아래와 같은 결과를 얻을 수 있다.

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/0c741106-89c4-4dcc-bb2a-c7bd174f2c9c/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T002604Z&X-Amz-Expires=86400&X-Amz-Signature=c0f7b5b0b965aef220fa87d59289dbd2764087aa9184c5576e4cfaba67e2717c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="동적 페이지에서 매개변수를 활용하는 방법" width="500px" />
<br />

여기서 사용할 것은 query의 newsId 객체의 값이다.
<br />

```jsx
import { useRouter } from "next/router";

function DetailPage() {
  const router = useRouter();

  console.log(router.query.newsId);

  return <h1>DetailPage</h1>;
}

export default DetailPage;
```
<br />


<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/65004f80-4e9a-4055-b492-9d4461e73926/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T002644Z&X-Amz-Expires=86400&X-Amz-Signature=5c22813565f7a34ccd79fd6abac85390f71dd319f082955db28a3279fd53e32c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="" width="400px" />

이제 백엔드 api에 router.query.newsId에 해당하는 데이터를 요청할 수 있다.
<br />
<br />

### navigation 구현하기

Link를 사용하면 새로고침 없이 페이지를 전환할 수 있다.

```jsx
import Link from "next/link";

function NewsPage() {
  return (
    <>
      <h1>NewsPage</h1>
      <ul>
        <li>
          <Link href="news/01">01</Link>
        </li>
        <li>
          <Link href="news/02">02</Link>
        </li>
      </ul>
    </>
  );
}

export default NewsPage;
```
<br />
<br />

## :speech_balloon: Link, router.push(), a tag 차이점

```jsx
import Link from "next/link";
import { useRouter } from "next/router";

function HomePage() {
  const router = useRouter();

  return (
    <>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link href="/news">news</Link>
        </li>
        <li>
          <a href="/news">news</a>
        </li>
        <li>
          <p onClick={() => router.push("/news")}>news</p>
        </li>
      </ul>
    </>
  );
}

export default HomePage;
```

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e2323c18-06da-407b-bf75-95b810a2a374/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T003334Z&X-Amz-Expires=86400&X-Amz-Signature=9f1fd9546bcd3cf5df09d6a4a35f2d5f22e454982b509725ae5a43a2fee57e9b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="Link, router.push(), a tag 3개 다 사용한 페이지 화면" />
<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b296e7f4-11ab-4ff7-a1a3-6c72973c6d6a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T003353Z&X-Amz-Expires=86400&X-Amz-Signature=0374a23bc950701e7cdf79eff849279b01f46510e2bc3dac3290f2cef9ae76a9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="Link, router.push(), a tag 3개 다 사용한 코드" />

li는 Link, a tag, router.push()의 순서로 작성되었다.
<br />

### Link
- a 태그를 생성한다
- 페이지를 다시 로드하지 않는다.
<br />

### a tag
- 새 페이지로 이동하는 하이퍼링크를 생성한다.
- 페이지를 다시 로드해 spa 기능을 잃게 된다.
<br />

### router.push()
- a 태그를 생성하지 않는다.
- 때문에 크롤러에 의해 감지되지 않는다.
<br />

SPA를 유지하기 위해 웬만하면 Link를 사용하고, 
사용자에게 다른 url을 제공하는 리디렉션이 필요할 때에 route.push가 권장된다고 한다.
<br />
<br />

## :speech_balloon: _app.js에 대하여

### 언제 사용할까 ?
pages 폴더 안에 들어있는 특별한 파일로 최상위 컴포넌트처럼 작동한다.

페이지에 특정 레이아웃을 전체로 적용하고 싶을 때 페이지가 많을 경우 하나하나 설정해주어야 해서 매우 번거로울 수 있는데 이때 유용하게 사용할 수 있다.

따라서 모든 페이지에 적용할 컴포넌트나 설정이 있을 때 사용하면 좋다.
<br />

### 구조
```jsx
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
```
<br />

### 전체 컴포넌트의 레이아웃을 한 번에 설정하고 싶을 때
```jsx
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
```

그냥 import해서 감싸주면 끝
