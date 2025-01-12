import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

type Props = {
  path: string;
  exact?: boolean;
  children: React.ReactNode;
};

const PrivateRoute = (props: Props) => {
  const { path, children } = props;

  return (
    <Route
      path={path}
      exact
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
