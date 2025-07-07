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

const NavigationPanel = ({ heading, description, actions }) => {
  const navigate = useNavigate();

  const cardHoverStyle = {
    transform: "translateY(-8px)",
    boxShadow: "lg",
    transition: "all 0.25s ease-in-out",
  };

  return (
    <Flex
      minHeight="70vh"
      align="center"
      justify="center"
      px="1rem"
      textAlign="center"
    >
      <Box>
        {description && (
          <Text
            fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
            color="gray.600"
            mb="2rem"
            px={{ base: 2, sm: 4 }}
            mt={4}
          >
            {description}
          </Text>
        )}
        <Heading
          fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
          color="#00247d"
          mb="2.5rem"
        >
          {heading}
        </Heading>

        <Stack
          direction={["column", "row"]}
          justify="center"
          align="center"
          spacing="4rem"
          wrap="wrap"
        >
          {actions.map((action) => (
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

export default NavigationPanel;
