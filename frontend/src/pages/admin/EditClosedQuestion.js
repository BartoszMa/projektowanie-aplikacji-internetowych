import {
  Box,
  Heading,
  Textarea,
  Input,
  Button,
  Stack,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { IoReturnDownBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toaster } from "../../components/ui/toaster";

const EditClosedQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);

  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4200/api/question/closed/${id}`
        );
        const data = response.data;
        setQuestionText(data.question || "");
        setAnswers(data.answers || ["", "", "", ""]);
        setCorrectAnswer(data.correctAnswer || "");
      } catch (err) {
        toaster.error({
          title: "Błąd",
          description: "Nie udało się pobrać pytania.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleUpdate = async () => {
    if (
      !questionText.trim() ||
      answers.some((a) => !a.trim()) ||
      !correctAnswer.trim()
    ) {
      toaster.error({
        title: "Błąd",
        description: "Wszystkie pola muszą być uzupełnione.",
      });
      return;
    }

    try {
      await axios.put(
        "http://localhost:4200/api/question/closed",
        {
          _id: id,
          question: questionText,
          answers,
          correctAnswer,
        },
        {
          headers: {
            username,
          },
        }
      );

      toaster.success({
        title: "Zapisano",
        description: "Pytanie zostało zaktualizowane.",
      });

      navigate("/admin/closed");
    } catch (err) {
      toaster.error({
        title: "Błąd",
        description: "Nie udało się zapisać zmian.",
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box maxW="700px" mx="auto" py={6} px={4}>
      <Flex mb={6} justify="space-between" align="center">
        <Heading size="lg">Edytuj pytanie zamknięte</Heading>
        <IconButton
          onClick={() => navigate("/admin/closed")}
          variant={"ghost"}
          size="md"
          aria-label="Powrót"
        >
          <IoReturnDownBack />
        </IconButton>
      </Flex>
      <Textarea
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        placeholder="Treść pytania"
        rows={4}
        mb={4}
      />

      <Stack spacing={3} mb={4}>
        {answers.map((ans, idx) => (
          <Input
            key={idx}
            placeholder={`Odpowiedź ${idx + 1}`}
            value={ans}
            onChange={(e) => {
              const updated = [...answers];
              updated[idx] = e.target.value;
              setAnswers(updated);
            }}
          />
        ))}
      </Stack>

      <Input
        placeholder="Poprawna odpowiedź (musi być identyczna z jedną z powyższych)"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        mb={6}
      />

      <Button colorScheme="teal" onClick={handleUpdate}>
        Zapisz zmiany
      </Button>
    </Box>
  );
};

export default EditClosedQuestion;
