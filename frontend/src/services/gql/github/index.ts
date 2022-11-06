/* This is an example snippet - you should consider tailoring it
to your service.
*/
/*
  Add these to your `package.json`:
    "apollo-boost": "^0.3.1",
    "graphql": "^14.2.1",
    "graphql-tag": "^2.10.0",
    "react-apollo": "^2.5.5"
*/

import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

// This setup is only needed once per application;

const createQueryForGetRepos = (username: string) => {
  return gql`
  query MyQuery {
    user(login: "${username}") {
      repositories(affiliations: OWNER, first: 100) {
        edges {
          node {
            id
            name
            description
            url
            languages(first: 10) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;
};

export { createQueryForGetRepos };
