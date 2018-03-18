import * as React from "react";

export class PrivateRaw extends React.Component {
  render() {
    const {
      currentPermissions = ['admin'], // TODO: брать из контекста авторизации
      permissions = [],
      children,
      fallback,
    } = this.props;

    if (
      currentPermissions.some(permission => permissions.includes(permission))
    ) {
      return children;
    } else if (fallback) {
      return React.createElement(fallback);
    } else {
      return null;
    }
  }
}

export const Private = PrivateRaw;
