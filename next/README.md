##### table of contents
- [ 왜 써야 할까 ?](#-speech-balloon-----------)
  * [서버 사이드 렌더링](#----------)
  * [파일 기반 라우팅](#---------)
  * [백엔드 api를 쉽게 추가할 수 있다.](#----api-------------)
- [ start](#-speech-balloon--start)
  * [node.js 설치](#nodejs---)
  * [create next app](#create-next-app)
  * [폴더 구조](#-----)
- [ pages](#-speech-balloon--pages)
  * [index와 서브 페이지 만들기](#index------------)
  * [중첩 경로 설정하기](#----------)
  * [동적 페이지 만들기](#----------)
  * [동적 페이지에서 매개변수를 활용하는 방법](#----------------------)
  * [navigation 구현하기](#navigation-----)
- [ Link, router.push(), a tag 차이점](#-speech-balloon--link--routerpush----a-tag----)
  * [Link](#link)
  * [a tag](#a-tag)
  * [router.push()](#routerpush--)
- [ _app.js에 대하여](#-speech-balloon---appjs-----)
  * [언제 사용할까 ?](#---------)
  * [구조](#--)
  * [전체 컴포넌트의 레이아웃을 한 번에 설정하고 싶을 때](#-----------------------------)
- [ useEffect으로 해결할 수 없는 사전 렌더링](#-speech-balloon--useeffect------------------)
- [ 사용할 수 있는 사전 렌더링 방법 2가지](#-speech-balloon---------------------2--)
  * [정적 렌더링 (getStaticProps())](#--------getstaticprops---)
  * [서버 사이드 렌더링 (getServerSideProps())](#------------getserversideprops---)
  * [동적 페이지에서 사용되는 getStaticPaths()](#--------------getstaticpaths--)
- [ 특별한 api 디렉토리와 http 요청](#-speech-balloon------api-------http---)
  * [mongoDB](#mongodb)
  * [기본적인 메서드와 POST 요청](#----------post---)
  * [api 디렉토리에서 만든 함수를 사용하는 방법](#api----------------------)
- [ getStaticProps에서의 http 요청](#-speech-balloon--getstaticprops----http---)
  * [동적 페이지에서의 http 요청](#----------http---)
- [ meta tag 추가하는 방법](#-speech-balloon--meta-tag--------)
  * [import](#import)
  * [하드코딩으로 설정하기](#-----------)
  * [동적으로 설정하기](#---------)

<br />


##  왜 써야 할까 ?

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

##  start

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

##  pages

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

##  Link, router.push(), a tag 차이점

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

##  _app.js에 대하여

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
<br />
<br />

##  useEffect으로 해결할 수 없는 사전 렌더링

```jsx
function HomePage() {
  const [state, setState] = useState([]);

  useEffect(() => {
		// fetch data code

    setLoadedMeetups(data);
  }, []);

  return <MeetupList meetups={loadedMeetups} />;
}

export default HomePage;
```

- useEffect으로 http 통신을 사용하면 처음 렌더링 시에는 빈 배열을 가지고, 리렌더링 때 비로소 데이터를 가지게 된다.

nextJS는 이러한 두 번째 렌더링을 기다리지 않고 첫 번째 렌더링 결과만을 가져와서 사전 렌더링한 html 코드를 반환한다.

이렇게 되면 원하지 않는 상황(= 비어있는 html)을 보게 된다.
<br />
<br />

##  사용할 수 있는 사전 렌더링 방법 2가지

### 정적 렌더링 (getStaticProps())

요청이 서버에 도달했을 때 서버에서 즉각적으로 페이지를 사전 렌더링 하지 않고, 애플리케이션이나 next 프로젝트를 빌드 할 때 사전 렌더링 된다.

배포되고 나면 사전 렌더링한 페이지는 변경되지 않는다.

그래서 **데이터를 업데이트 하는 경우 사전 렌더링한 페이지를 변경하기 위해서 빌드 프로세스를 다시 시작하고, 다시 배포해야 한다.**

페이지 콘텐츠가 매번 바뀌는 경우가 아니면 정적 렌더링도 나쁘지 않다.
<br />

```jsx
export function getStaticProps() {
  // code

	return {
		props: {}
	},
	revalidate: 10
}
```

- pages 폴더 안의 컴포넌트에서만 사용 가능하다.
- next는 이 함수를 발견하게 되면 사전 렌더링 프로세스 중에 이 함수를 실행하게 된다.
- 이 함수가 적힌 파일 안에서 작성된 컴포넌트 함수를 호출하기 전에 getStaticProps()를 먼저 호출한다.
- 파일 시스템에 접근할 수도 있고 데이터베이스에 연결할 수도 있다.
- 항상 return으로 **객체**를 반환하고, 
일반적으로 **객체를 가진 props 프로퍼티를 설정**한다.
이 props 객체는 페이지의 컴포넌트가 받는 props 객체가 된다.
- **revalidate를 설정하면** 점진적 정적 생성이라는 기능을 사용할 수 있다.
**페이지가 다시 생성될 때까지 next가 대기**하는 시간을 숫자 초 단위로 표시한다.
이렇게 설정하면 빌드 프로세스 중에 페이지가 바로 생성되지 않고 10초 뒤에 생성된다. 
이후 10초 마다 서버에서 페이지를 다시 생성한다.
숫자는 데이터 업데이트 빈도에 따라 결정하면 된다.
그러면 일부 데이터가 변경되었다고 해도 설정한 간격으로 서버에서 다시 페이지를 재생성 하기 때문에 다시 빌드하고 배포하지 않을 수 있다.
<br />

```jsx
export async function getStaticProps() {
  // code
}
```

- 이렇게 비동기도 된다.
- 이걸 사용하면 next는 데이터를 읽어 들일 때까지 기다린다.
<br />
<br />

### 서버 사이드 렌더링 (getServerSideProps())

요청이 들어올 때마다 페이지를 다시 만들어야 하는 경우 페이지를 동적으로 서버에서 재생성해야 한다.

```jsx
export async function getServerSideProps() {
	// code

	return {
		props: {}
	}
}
```

- getStaticProps와 동일하게 객체를 리턴하고, 객체를 가진 props  프로퍼티도 리턴한다.
- 데이터를 다시 만들고 패치하기 때문에 getStaticProps보다 느릴 수 있다.
- getStaticProps와의 차이점은 빌드 프로세스 중에 실행되지 않고 요청이 들어올 때마다 실행한다는 것이다.
- 또한 getStaticProps는 요청과 응답 객체에 접속하지 않지만 getServerSideProps는 접속할 수 있다.
<br />

```jsx
export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    }
  }
}
```

- context 매개 변수를 받아 요청 객체와 응답 객체에 접근할 수 있다.
- getStaticProps도 받을 수 있다.
- props 키는 페이지 컴포넌트 함수를 저장하고 있다.
- 요청이 들어올 때까지 페이지 생성이 딜레이 된다.
<br />

항상 바뀌는 데이터가 있는 경우나 요청 객체에 접속할 필요가 있다면 getServerSideProps 

그렇지 않다면 getStaticProps
<br />

### 동적 페이지에서 사용되는 getStaticPaths()

getStaticProps에서 빌드 프로세스 중에 사전 렌더링될 때, 동적 페이지에서 지원될 모든 id를 알고 있어야 한다.

미리 사전 렌더링하지 않는 id 페이지로 접속하면 404 페이지를 보게 될 것이다.

getStaticPaths는 동적 페이지를 위해 사전 렌더링할 id를 미리 정의하는 역할을 한다.
<br />

```jsx
export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          id: "m1",
        },
      },
      {
        params: {
          id: "m2",
        },
      },
    ],
  };
}
```

- fallback는 paths 배열이 모든 매개변수를 저장할지 일부만 저장할지 여부를 정한다.
    - false : 모든 id value를 저장한다. 사용자가 유효하지 않은 id를 입력하면 404페이지가 뜬다.
    - true: 들어오는 요청에 관해 서버에서 새로운 페이지를 동적으로 만든다.
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6e9ea99 (update README.md)
=======
>>>>>>> 1872db5 (update README.md)
    - ‘blocking’이나 true로 작성하면 여기서 지정한 경로 목록이 완전하지 않을 수 있고 더 유효한 페이지가 있을 수 있음을 next에게 알려준다.
    요청 시 사용자에게 404를 보여주지 않고 페이지를 생성한 후 캐시에 저장한다.
    true로 설정하면 빈 페이지가 즉시 반환되고 동적으로 생성된 페이지를 풀 다운하기 때문에 따로 페이지에 데이터가 없는 경우를 처리해주어야 한다.

‘blocking’으로 설정하면 페이지가 사전 생성될 때까지 사용자는 이전 페이지 상태에서 머무르게 된다.
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f036e22 (2022-07-13 next)
=======
>>>>>>> 6e9ea99 (update README.md)
=======
>>>>>>> 1872db5 (update README.md)
- 배열을 값으로 가지는 paths에 객체로 params 키를 넣을 수 있다.
- 실제로는 이렇게 하드코딩하지 않고 데이터 베이스에서 지원되는 id를 패치하거나, api에서 패치한다.
<br />

```jsx
export async function getStaticPaths(context) {
	const meetupId = context.params.meetupId

  return {
    fallback: boolean,
    paths: []
  };
}
```

- getStaticPaths 에서도 context를 사용할 수 있다.
- `context.params.동적페이지를 만들 때 [] 안에 적었던 이름` 이렇게 사용하면 사용자가 meetup/m1 이렇게 입력하는 경우 ‘m1’을 가져올 수 있게 된다.
<br />
<br />

##  특별한 api 디렉토리와 http 요청

html 코드를 리턴하지 않고 http 요청을 받는다.
데이터 베이스에 데이터를 저장하고 json을 리턴한다.

여기서 작성하는 코드는 클라이언트 측에서 끝나지 않기 때문에 인증 정보 저장에 안전한 장소이다.
<br />

### mongoDB

가입 후 새로운 클러스터를 만들고 IP를 등록한 후 사용자를 생성한다.

👉🏻 [자세한 사용 방법](https://www.notion.so/mongoDB-72327274f3834bbaafbbc83a8123a6f7)
<br />

### 기본적인 메서드와 POST 요청

```jsx
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://onmidnightblue:BO3lG2FzxaZkNPkK@cluster0.lfrakmv.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();
    res.status(201).json({ message: "success" });
  }
}

export default handler;
```

- `import { MongoClient } from "mongodb";`
    
    연결을 가능하게 해준다.
    
- `MongoClient.connect()`
    
    연결할 url을 매개 변수로 받는다.
    
    mongodb+srv://사용자아이디:비밀번호@cluster0.z04291e.mongodb.net/원하는 데이터베이스 이름?retryWrites=true&w=majority
    
- `const db = client.db();`
    
    ‘원하는 데이터 베이스 이름’에 연결 중인 데이터 베이스를 확보할 수 있다.
    
- `const meetupsCollection = db.collection("컬렉션 이름");`
    
    여러 문서를 보관하고 있는 컬렉션의 이름을 설정한다.
    
- `const result = await meetupsCollection.insertOne(data);`
    
    insertOne()은 query 명령 중 하나로, 컬렉션에 새 문서를 삽입할 수 있다.
    
- `client.close();`
    
    데이터베이스 연결을 차단한다.
    
- `res.status(201).json({ message: "success" });`
    
    status()로 응답을 호출할 수 있다.
    
    201의 경우 성공적으로 되었음을 의미한다.
    
    json()으로 발신 응답에 추가될 json 데이터를 작성할 수 있다.
<br />

### api 디렉토리에서 만든 함수를 사용하는 방법

```jsx
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
```

- fetch나 axios를 사용해 url로 옵션을 넣어서 데이터를 요청하면 된다.
<br />

##  getStaticProps에서의 http 요청
getStaticProps는 클라이언트 측에서 완료되지 않기 때문에 여기서 서버와 통신할 아이디/패스워드를 적어도 안전하다.

```jsx
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://onmidnightblue:BO3lG2FzxaZkNPkK@cluster0.lfrakmv.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
```

- `const meetups = await meetupsCollection.find().toArray();`
    
    find()는 해당하는 컬렉션의 모든 문서를 찾는다.
    
    toArray()를 입력하면 자바스크립트 객체 배열을 받을 수 있다.
<br />

### 동적 페이지에서의 http 요청

```jsx
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://onmidnightblue:BO3lG2FzxaZkNPkK@cluster0.lfrakmv.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://onmidnightblue:BO3lG2FzxaZkNPkK@cluster0.lfrakmv.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
```

- `const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();`
    
    find() 에서 첫번째 파라미터는 특정 필드값을 필터링할 때 필터 기준을 정의할 수 있다. 빈 객체로 두면 모든 문서를 가져오겠다는 뜻이다.
    
    두번째 파라미터는 모든 문서에서 원하는 필드만 가져오겠다는 뜻이며 {_id: 1}로 작성한 것은 _id만 포함하고 다른 필드 값은 포함하지 않는다는 뜻이다.
    
- `const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });`
    
    findOne()는 하나의 문서를 찾는다는 것을 의미하며 어떻게 필터링하고 어떻게 문서를 검색하는지 정의하는 객체를 전달한다. 필드 이름을 키로 전달하고 문서를 반환 받는다.
    ObjectId()는 mongoDB에서는 _id 값을 암호화하는데, 정확하게 이 _id 값을 찾을 때 사용한다. 자바스크립트 문자열로 변환해주어야 한다.


##  meta tag 추가하는 방법

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2c577d64-63b0-4cc0-9f14-5893ef61d367/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220713%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220713T080143Z&X-Amz-Expires=86400&X-Amz-Signature=250cd3877b10422ec40523362e8e05d47d491afd665e1e38349b8fe4fbe890fe&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22&x-id=GetObject" alt="meta tag" />

### import
```jsx
import Head from 'next/head'
```
<br />

### 하드코딩으로 설정하기

```jsx
import Head from 'next/head'
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>meetups</title>
        <meta name='description' content='meetups ! !' />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  )
}

export default HomePage;
```

<br />

### 동적으로 설정하기

```jsx
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        title={props.meetupData.title}
        description={props.meetupData.description}
      />
    </>
  );
}

export default MeetupDetails;
```
