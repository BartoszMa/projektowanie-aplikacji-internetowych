import { Box, Button, Input, Stack, Text, Heading } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

export const AuthForm = ({ title, onSubmit, error, buttonText, children }) => {
  return (
    <Box maxW="400px" mx="auto" borderRadius="md">
      <Heading as="h2" size="md" mb={4}>
        {title}
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          {children}
          <Button type="submit" colorScheme="blue">
            {buttonText}
          </Button>
        </Stack>
      </form>
      {error && (
        <Text color="red.500" mt={4}>
          {error}
        </Text>
      )}
    </Box>
  );
};

export const AuthInput = ({
  label,
  type,
  value,
  onChange,
  isRequired = true,
}) => (
  <FormControl isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Input type={type} value={value} onChange={onChange} />
  </FormControl>
);
