import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Spinner,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { IoReturnDownBack } from "react-icons/io5";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster";

const AdminClosedQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const idsResponse = await axios.get("/api/questions-id/closed");
      const ids = idsResponse.data;

      const questionPromises = ids.map((id) =>
        axios.get(`/api/question/closed/${id}`)
      );

      const questionResults = await Promise.all(questionPromises);
      const fullQuestions = questionResults.map((res) => res.data);

      setQuestions(fullQuestions);
    } catch (err) {
      toaster.error({
        title: "Błąd",
        description: "Nie udało się pobrać pytań zamkniętych.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/question/closed/${id}`, {
        headers: { token },
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
        <Heading size="lg">Zarządzaj pytaniami zamkniętymi</Heading>
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
        colorScheme="blue"
        mb={6}
        onClick={() => navigate("/admin/closed/add")}
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

            <Stack spacing={1} mb={2}>
              {question.answers.map((ans, i) => (
                <Text
                  key={i}
                  color={
                    ans === question.correctAnswer ? "green.600" : "gray.700"
                  }
                >
                  • {ans}
                </Text>
              ))}
            </Stack>

            <Stack direction="row" spacing={4} mt={2}>
              <Button
                colorScheme="teal"
                onClick={() => navigate(`/admin/closed/edit/${question._id}`)}
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

export default AdminClosedQuestions;
