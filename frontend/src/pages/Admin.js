import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Heading,
  Text,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";

const Admin = () => {
  const navigate = useNavigate();

  const cardHoverStyle = {
    transform: "translateY(-8px)",
    boxShadow: "lg",
    transition: "all 0.25s ease-in-out",
  };

  const adminActions = [
    {
      label: "Zarządzaj pytaniami zamkniętymi",
      path: "/admin/closed",
    },
    {
      label: "Zarządzaj pytaniami otwartymi",
      path: "/admin/open",
    },
    {
      label: "Dodaj nowe pytanie",
      path: "/admin/add",
    },
  ];

  return (
    <Flex
      minHeight="70vh"
      align="center"
      justify="center"
      px="1rem"
      textAlign="center"
    >
      <Box>
        <Heading
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
          color="#00247d"
          mb="2rem"
        >
          Panel administratora
        </Heading>

        <Stack
          direction={["column", "row"]}
          justify="center"
          align="center"
          spacing="4rem"
          wrap="wrap"
        >
          {adminActions.map((action) => (
            <Card.Root
              key={action.path}
              maxW="400px"
              minW="250px"
              cursor="pointer"
              borderRadius="md"
              boxShadow="md"
              _hover={cardHoverStyle}
              transition="all 0.25s ease-in-out"
              onClick={() => navigate(action.path)}
            >
              <Card.Body p="1.5rem">
                <Button
                  variant="link"
                  color="#00247d"
                  fontWeight="500"
                  fontSize="lg"
                  fontFamily="Segoe UI, sans-serif"
                >
                  {action.label}
                </Button>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Admin;
