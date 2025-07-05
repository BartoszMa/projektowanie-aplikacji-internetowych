import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginComponent from "../components/LoginComponent";
import { Flex, VStack, Text, Button } from "@chakra-ui/react";

const Login = () => {
  const { username, isLoggedIn, login, logout } = useContext(AuthContext);
  console.log("Login component rendered", isLoggedIn, username);
  return (
    <Flex align="center" justify="space-between" padding={4} h="100vh">
      {isLoggedIn ? (
        <VStack gap={10} mx="auto" h="50vh">
          <Text>Witaj, {username}</Text>
          <Button onClick={logout}>Wyloguj</Button>
        </VStack>
      ) : (
        <VStack gap={10} mx="auto" h="50vh">
          <LoginComponent onLoginSuccess={login} />
        </VStack>
      )}
    </Flex>
  );
};

export default Login;
