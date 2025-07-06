import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spinner, Flex } from "@chakra-ui/react";

const ProtectedAdminRoute = ({ children }) => {
  const { username, isLoggedIn, isAuthInitialized } = useContext(AuthContext);
  console.log("ProtectedAdminRoute rendered", isLoggedIn, username);

  if (!isAuthInitialized) {
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (!isLoggedIn || username !== "admin") {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
