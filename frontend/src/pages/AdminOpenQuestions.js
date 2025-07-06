import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { IoReturnDownBack } from "react-icons/io5";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";

const AdminOpenQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { username } = useContext(AuthContext);
  const navigate = useNavigate();
  const fetchQuestions = async () => {
    try {
      const idsResponse = await axios.get(
        "http://localhost:4200/api/questions-id/open"
      );
      const ids = idsResponse.data;

      const questionPromises = ids.map((id) =>
        axios.get(`http://localhost:4200/api/question/open/${id}`)
      );

      const questionResults = await Promise.all(questionPromises);
      const fullQuestions = questionResults.map((res) => res.data);

      setQuestions(fullQuestions);
    } catch (err) {
      toaster.error({
        title: "Błąd",
        description: "Nie udało się pobrać pytań otwartych.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4200/api/question/open/${id}`, {
        headers: { username },
      });

      toaster.success({
        title: "Usunięto",
        description: "Pytanie zostało usunięte.",
      });

      setQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      toaster.error({
        title: "Błąd",
        description: "Nie udało się usunąć pytania.",
      });
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="70vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box maxW="800px" mx="auto" py={6} px={4}>
      <Flex mb={6} justify="space-between" align="center">
        <Heading size="lg">Zarządzaj pytaniami otwartymi</Heading>
        <IconButton
          onClick={() => navigate("/admin")}
          variant={"ghost"}
          size="md"
          aria-label="Powrót"
        >
          <IoReturnDownBack />
        </IconButton>
      </Flex>
      <Button
        onClick={() => navigate("/admin/open/add")}
        colorScheme="teal"
        mb={4}
      >
        + Dodaj nowe pytanie
      </Button>
      <Stack spacing={6}>
        {questions.map((question, idx) => (
          <Box
            key={question._id}
            p={4}
            boxShadow="md"
            borderRadius="md"
            bg="white"
          >
            <Text fontWeight="bold" mb={2}>
              {idx + 1}. {question.question}
            </Text>
            <Text mb={2}>
              Poprawna odpowiedź: <strong>{question.correctAnswer}</strong>
            </Text>

            <Stack direction="row" spacing={4}>
              <Button
                colorScheme="teal"
                onClick={() => navigate(`/admin/open/edit/${question._id}`)}
              >
                Edytuj
              </Button>

              <Button
                colorScheme="red"
                onClick={() => handleDelete(question._id)}
              >
                Usuń
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default AdminOpenQuestions;
