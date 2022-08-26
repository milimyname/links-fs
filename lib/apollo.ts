import {ApolloClient, InMemoryCache} from '@apollo/client'

const apolloClient = new ApolloClient({
    // It'll be replaced with the real endpoint when the app is deployed.
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
})

export default apolloClient