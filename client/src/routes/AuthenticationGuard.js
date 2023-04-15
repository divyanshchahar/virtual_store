import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

export const AuthenticationGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <h1>Loading</h1>,
  });

  return <Component />;
};
