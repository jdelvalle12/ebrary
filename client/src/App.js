import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql', // replace with your Apollo server URL
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from wherever you have it stored (e.g. local storage, context, etc.)
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // add the authorization header with the token
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // use the auth link and http link together
  cache: new InMemoryCache(), // use an in-memory cache
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
