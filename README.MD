### Project 구조

```
webapp
├── app                             - Your application
│   ├── config                      - General configuration (redux store, middleware, etc.)
│   ├── entities                    - Generated entities
│   ├── modules                     - Main components directory
│   │   ├── account                 - Account related components
│   │   ├── administration          - Administration related components
│   │   └── login                   - Login related components
│   ├── pages      
│   │   ├── announce                - Announce related components
│   │   ├── evnets                  - events related components
│   │   ├── home                    - Application homepage
│   │   └── profile                 - Profile related components 
│   │   └── rank                    - Rank related components              
│   ├── shared                      - Shared elements such as your header, footer, reducers, models and util classes
│   ├── app.scss                    - Your global application stylesheet if you choose the Sass option
│   ├── app.css                     - Your global application stylesheet
│   ├── app.tsx                     - The application main class
│   ├── index.tsx                   - Index script
│   ├── routes.tsx                  - Application main routes
│   └── typings.d.ts                -
├── i18n                            - Translation files
├── static                          - Contains your static files such as images and fonts
├── swagger-ui                      - Swagger UI front-end
├── 404.html                        - 404 page
├── favicon.ico                     - Fav icon
├── index.html                      - Index page
├── manifest.webapp                 - Application manifest
└── robots.txt                      - Configuration for bots and Web crawlers

```


### Project 실행방법

npm install (최초 실행시에만)

npm start


### 신규 페이지 Route 에 등록
* routes.tsx 파일에 아래와 같이 등록 (profile 페이지 등록 예시)
```
 import Profile from 'app/pages/profile/profile';

 const Routes = () => (
   <div className="view-routes">
     <ErrorBoundaryRoute path="/login" component={Login} />
     <Switch>
       ... 기존 route
       <ErrorBoundaryRoute path="/profile" component={Profile} />
       <ErrorBoundaryRoute path="/" component={Home} />
     </Switch>
   </div>
 );
``` 


### 특정페이지로 이동
* 로그인 페이지 이동 예
```
 import { Link } from 'react-router-dom';

 <Link to="/login">
    <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
</Link>

```


### Reducer 신규 추가
* reducer 를 사용하는 모듈과 같은 폴더에 생성. (모듈명.reducer.ts)
* shared/reducers 폴더의 index.ts 파일에 신규 생성한 reducer 등록


### Typescript 설정
* tsconfig.json
* tslint.json - 컴파일 에러 발생시 rule 이 적용되어있는지 확인 필요.


### React & Redux in TypeScript - Static Typing Guide

https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/README.md
