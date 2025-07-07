import {
  Box,
  Heading,
  Textarea,
  Input,
  Button,
  Spinner,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { IoReturnDownBack } from "react-icons/io5";
import { toaster } from "../../components/ui/toaster";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const EditOpenQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useContext(AuthContext);

  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/api/question/open/${id}`);
        setQuestionText(response.data.question || "");
        setCorrectAnswer(response.data.correctAnswer || "");
      } catch (error) {
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
    try {
      await axios.put(
        "/api/question/open",
        {
          _id: id,
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
        title: "Zapisano zmiany",
        description: "Pytanie zostało zaktualizowane.",
      });

      navigate("/admin/open");
    } catch (error) {
      toaster.error({
        title: "Błąd",
        description: "Nie udało się zaktualizować pytania.",
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
        <Heading size="lg">Edytuj pytanie otwarte</Heading>
        <IconButton
          onClick={() => navigate("/admin/open")}
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
        placeholder="Wpisz treść pytania"
        rows={6}
        mb={4}
      />

      <Input
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
        placeholder="Wpisz poprawną odpowiedź"
        mb={6}
      />

      <Button colorScheme="teal" onClick={handleUpdate}>
        Zapisz zmiany
      </Button>
    </Box>
  );
};

export default EditOpenQuestion;
