import {
  Box,
  Heading,
  Textarea,
  Input,
  Button,
  Stack,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { IoReturnDownBack } from "react-icons/io5";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toaster } from "../components/ui/toaster";

const AddClosedQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);

  const handleSubmit = async () => {
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

    if (!answers.includes(correctAnswer)) {
      toaster.error({
        title: "Błąd",
        description: "Poprawna odpowiedź musi być jedną z podanych opcji.",
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:4200/api/question/closed",
        {
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
        title: "Dodano pytanie",
        description: "Nowe pytanie zostało zapisane.",
      });

      navigate("/admin/closed");
    } catch (err) {
      toaster.error({
        title: "Błąd",
        description: "Nie udało się dodać pytania.",
      });
    }
  };

  return (
    <Box maxW="700px" mx="auto" py={6} px={4}>
      <Flex mb={6} justify="space-between" align="center">
        <Heading size="lg">Dodaj pytanie zamknięte</Heading>
        <IconButton
          onClick={() => navigate("/admin")}
          variant={"ghost"}
          size="md"
          aria-label="Powrót"
        >
          <IoReturnDownBack />
        </IconButton>
      </Flex>

      <Textarea
        placeholder="Treść pytania"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
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
        placeholder="Poprawna odpowiedź (musi być jedną z powyższych)"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        mb={6}
      />

      <Button colorScheme="blue" onClick={handleSubmit}>
        Dodaj pytanie
      </Button>
    </Box>
  );
};

export default AddClosedQuestion;
