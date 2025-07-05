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

const Home = () => {
  const navigate = useNavigate();

  const cardHoverStyle = {
    transform: "translateY(-8px)",
    boxShadow: "lg",
    transition: "all 0.25s ease-in-out",
  };

  const modes = [
    { label: "Pytania zamknięte", path: "/closed-questions" },
    { label: "Pytania otwarte", path: "/open-questions" },
    { label: "Mix", path: "/questions-mix" },
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
        <Text
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
          color="gray.600"
          mb="2rem"
          px={{ base: 2, sm: 4 }}
          mt={4}
        >
          Z nami angielski jest prostszy! Sprawdź swoje umiejętności i poprawiaj
          je każdego dnia.
        </Text>
        <Heading
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
          color="#00247d"
          mb="2.5rem"
        >
          Wybierz tryb testu
        </Heading>

        <Stack
          direction={["column", "row"]}
          justify="center"
          align="center"
          spacing="4rem"
          wrap="wrap"
        >
          {modes.map((mode) => (
            <Card.Root
              key={mode.path}
              maxW="400px"
              minW="250px"
              cursor="pointer"
              borderRadius="md"
              boxShadow="md"
              _hover={cardHoverStyle}
              transition="all 0.25s ease-in-out"
              onClick={() => navigate(mode.path)}
            >
              <Card.Body p="1.5rem">
                <Button
                  variant="link"
                  color="#00247d"
                  fontWeight="500"
                  fontSize="lg"
                  fontFamily="Segoe UI, sans-serif"
                >
                  {mode.label}
                </Button>
              </Card.Body>
            </Card.Root>
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Home;
