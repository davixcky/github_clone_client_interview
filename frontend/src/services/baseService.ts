import axios from 'axios';

class BaseService {
  protected httpClient;
  protected baseEndpoint: string;

  constructor() {
    this.httpClient = axios.create({
      baseURL: 'http://localhost:8080/api',
      headers: { 'Content-Type': 'application/json' }
    });
    this.baseEndpoint = '/';
  }

  public createUri(newUri?: string) {
    let endpoint = this.baseEndpoint;
    if (this.baseEndpoint.endsWith('/') && newUri?.startsWith('/')) {
      endpoint = this.baseEndpoint.slice(1);
    }

    return `${endpoint}${newUri || ''}`;
  }

  protected doPost<Type>(url: string, data: object) {
    return this.httpClient.post<Type>(this.createUri(url), data);
  }

  protected doGet<Type>(url: string, params?: object) {
    return this.httpClient.get<Type>(this.createUri(url), { params });
  }

  protected withAlternativeUrl<Type>(func: () => Type, newUrl: string) {
    const currentBaseUrl = this.baseEndpoint;
    this.baseEndpoint = newUrl;
    const returnFunc = func();
    this.baseEndpoint = currentBaseUrl;
    return returnFunc;
  }
}

export { BaseService };
