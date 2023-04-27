import { withAuthenticationRequired } from "@auth0/auth0-react";
import LoadingLayout from "../layouts/LoadingLayout";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <LoadingLayout />,
  });

  return <Component />;
};
