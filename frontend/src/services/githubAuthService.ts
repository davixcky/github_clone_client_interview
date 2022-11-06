import { BaseService } from './baseService';
import { ApolloClient, createHttpLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export type RequestLoginResponse = {
  redirect_url: string;
};

class GithubAuthService extends BaseService {
  protected apolloClient: ApolloClient<any>;
  constructor() {
    super();

    this.baseEndpoint = '/auth/github';

    const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('github_access_token');
      return {
        headers: {
          ...headers,
          authorization: token ? 'Token ' + token : ''
        }
      };
    });

    const httpLinks = createHttpLink({
      uri: 'https://api.github.com/graphql'
    });

    this.apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLinks)
    });
  }

  requestLoginUrl() {
    return this.doGet<RequestLoginResponse>('/login');
  }

  getRepositories() {}
}

const GithubAuthServiceInstanceController = new GithubAuthService();
export { GithubAuthServiceInstanceController, GithubAuthService };
