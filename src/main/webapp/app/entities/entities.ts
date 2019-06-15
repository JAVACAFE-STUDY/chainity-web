enum Methods {
  GET, POST, PUT, DELETE
}

type Urls = '/groups/:groupId/login'
  | '/groups/:groupId'
  | '/groups/:groupId/events'
  | '/groups/:groupId/events/:eventId'
  | '/groups/:groupId/events/:eventId/participations'
  | '/groups/:groupId/events/:eventId/rewards'
  | '/groups/:groupId/events/:eventId/participations/:participationId'
  | '/groups/:groupId/participations'
  | '/groups/:groupId/rewards'
  | '/groups/:groupId/users'
  | '/groups/:groupId/users/:userId'
  | '/groups/:groupId/users/:userId/avatar'
  | '/groups/:groupId/users/:userId/participations'
  | '/groups/:groupId/users/:userId/rewards';

interface IApi {
  url: Urls;
  description: string;
  requestParam: object;
  method: Methods;
  response: object;
}

interface IApiList {
  apiList: IApi[];
  add(api: IApi): void;
  
}

/*
class ApiList implements IApiList {
  apiList: IApi[];
  constructor() {

  }
}

class Api implements IApi {
  url: Urls;
  description: string;
  method: Methods;
  requestParam: object;
  response: object;

  constructor(url: Urls,
              description: string,
              method: Methods,
              requestParam: object,
              response: object) {
    this.url = url;
    this.description = description;
    this.method = method;
    this.requestParam = requestParam;
    this.response = response;
    this.addApiList();
  }

  addApiList() {

  }
}
*/

function setApi(url: Urls, description: string, method: Methods, response) {

}

setApi('/groups/:groupId/login', '사용자: 로그인 요청.', Methods.POST, { token: 'sampleToken', email: 'test@test.com', name: 'anonymous' });

// const APIS = [
//   {
//     url: urls,
//     GET: ''
//   }
// ]

interface IGroups {
  api: '';
  method: Methods;
  _id: string;
}
