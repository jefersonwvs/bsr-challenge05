import { Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import history from 'utils/history';
import Navbar from 'components/Navbar';
import Auth from 'pages/Auth';
import Catalog from 'pages/Catalog';
import MovieDetails from 'pages/MovieDetails';

const Routes = function () {
  return (
    <Router history={history}>
      <Navbar />

      <Switch>
        <Redirect from="/" to="/movies" exact />
        <PrivateRoute path="/movies" exact>
          <Catalog />
        </PrivateRoute>

        <Redirect from="/auth" to="/auth/login" exact />
        <Route path="/auth">
          <Auth />
        </Route>

        <PrivateRoute path="/movies/:movieId">
          <MovieDetails />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
