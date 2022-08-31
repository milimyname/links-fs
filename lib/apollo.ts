import {ApolloClient, InMemoryCache} from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities';

const apolloClient = new ApolloClient({
    // It'll be replaced with the real endpoint when the app is deployed.
    uri: `${process.env.AUTH0_BASE_URL}/api/graphql`,
    cache: new InMemoryCache({
        typePolicies:{
            Query:{
                fields:{
                    links: relayStylePagination(),
                }
            }
        }
    })
})

export default apolloClient