import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const apollo_client_provider = {
  provide: 'APOLLO_OPTIONS',
  useFactory: (httpLink: HttpLink) => {
    return {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: 'https://localhost:3000',
      }),
    };
  },
  deps: [HttpLink],
};
