import {
  Box,
  Heading,
  Textarea,
  Input,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { IoReturnDownBack } from "react-icons/io5";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toaster } from "../components/ui/toaster";

const AddOpenQuestion = () => {
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!questionText.trim() || !correctAnswer.trim()) {
      toaster.error({
        title: "Błąd",
        description: "Pytanie i odpowiedź nie mogą być puste.",
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:4200/api/question/open",
        {
          question: questionText,
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

      navigate("/admin/open");
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
        <Heading size="lg">Dodaj nowe pytanie otwarte</Heading>
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
        rows={6}
        mb={4}
      />

      <Input
        placeholder="Poprawna odpowiedź"
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

export default AddOpenQuestion;
