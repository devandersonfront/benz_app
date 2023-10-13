import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

interface ProtedctedRouteProps {
  redirectCondition: boolean;
  redirectPath: string;
}
function ProtedctedRoute({
  children,
  redirectCondition,
  redirectPath,
}: PropsWithChildren<ProtedctedRouteProps>) {
  if (redirectCondition) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

export default ProtedctedRoute;
