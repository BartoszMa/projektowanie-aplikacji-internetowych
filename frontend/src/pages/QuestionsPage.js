import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { IoReturnDownBack, IoRefresh } from "react-icons/io5";

import axios from "axios";
import {
  Box,
  Button,
  Text,
  Stack,
  Heading,
  Spinner,
  Alert,
  Flex,
  RadioGroup,
  IconButton,
  Textarea,
} from "@chakra-ui/react";

const QuestionsPage = () => {
  const { type } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const allowedTypes = ["closed-questions", "open-questions", "questions-mix"];
  const isValidType = allowedTypes.includes(type);
  const navigate = useNavigate();

  const endpointMap = {
    "closed-questions": "/api/closed-questions",
    "open-questions": "/api/open-questions",
    "questions-mix": "/api/questions-mix",
  };

  const fetchQuestions = () => {
    setLoading(true);
    setError(null);
    axios
      .get(endpointMap[type])
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          const preparedQuestions = data.map((item, idx) => ({
            ...item,
            _localId: `${item.type}-${idx}`,
          }));
          setQuestions(preparedQuestions);
          setAnswers({});
          setResults(null);
          setScore(null);
        } else {
          setQuestions([]);
          setError("Nieprawidłowy format danych z serwera.");
        }
      })
      .catch(() => {
        setError("Nie udało się pobrać pytań. Spróbuj ponownie później.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isValidType) {
      fetchQuestions();
    }
  }, [type]);

  if (!isValidType) {
    return <Navigate to="/404" replace />;
  }

  const handleInputChange = (localId, value) => {
    setAnswers((prev) => ({ ...prev, [localId]: value }));
  };

  const handleSubmit = () => {
    const formattedAnswers = questions.map((q) => ({
      type: q.type,
      _id: q._id,
      answer: answers[q._localId] || "",
    }));

    axios
      .post("api/check-answers", {
        answers: formattedAnswers,
      })
      .then((res) => {
        const resultData = res.data;
        if (Array.isArray(resultData)) {
          const resultMap = {};
          resultData.forEach((r) => {
            const index = questions.findIndex(
              (q) => q._id === r._id && q.type === r.type
            );
            const localId = questions[index]._localId;
            if (localId) {
              const userAnswer = r.answer?.toLowerCase().trim();
              const correctAnswer = r.correctAnswer?.toLowerCase().trim();
              resultMap[localId] = {
                ...r,
                isCorrect: userAnswer === correctAnswer,
              };
            }
          });
          setResults(resultMap);
          const calculatedScore = Object.values(resultMap).filter(
            (r) => r.isCorrect
          ).length;
          setScore(calculatedScore);
        } else {
          setError("Nieprawidłowa odpowiedź z serwera.");
        }
      });
  };

  const renderBackButton = () => (
    <IconButton
      onClick={() => navigate("/")}
      variant={"ghost"}
      size="md"
      aria-label="Powrót"
    >
      <IoReturnDownBack />
    </IconButton>
  );

  if (loading) {
    return (
      <Flex minH="100vh" justify="center" align="center" direction="column">
        <Spinner size="xl" mb={4} />
        <Text>Ładowanie pytań...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex
        minH="70vh"
        justify="center"
        align="center"
        px={4}
        textAlign="center"
      >
        <Alert.Root status="error" maxW={"500px"}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Błąd podczas ładowania pytań</Alert.Title>
            <Alert.Description>
              <Text>{error}</Text>
              <Flex align="center" justify="center">
                <Text>Powrót</Text>
                {renderBackButton()}
              </Flex>
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Flex>
    );
  }

  return (
    <Box
      maxW={{ base: "100%", md: "700px" }}
      mx="auto"
      px={{ base: 4, sm: 6, md: 12 }}
      py={6}
    >
      <Flex align="center" gap={2} mb={4}>
        {renderBackButton()}
        <IconButton onClick={fetchQuestions} variant="ghost">
          <IoRefresh />
        </IconButton>
      </Flex>

      <Heading size="lg" mb={6}>
        Pytania ({type})
      </Heading>

      {questions.length === 0 ? (
        <Text>Brak pytań do wyświetlenia.</Text>
      ) : (
        <Stack spacing={6}>
          {questions.map((item, idx) => (
            <Box
              key={item._localId}
              p={6}
              boxShadow="md"
              borderRadius="md"
              bg="white"
              transition="all 0.2s ease-in-out"
              _hover={{ boxShadow: "lg" }}
            >
              <Text
                fontWeight="bold"
                mb={3}
                fontSize={{ base: "md", md: "lg" }}
                wordBreak="break-word"
                whiteSpace="pre-wrap"
              >
                {idx + 1}. {item.question}
              </Text>

              {item.type === "open" ? (
                <Textarea
                  value={answers[item._localId] || ""}
                  onChange={(e) =>
                    handleInputChange(item._localId, e.target.value)
                  }
                  placeholder="Wpisz odpowiedź"
                  resize="vertical"
                  fontSize={{ base: "sm", md: "md" }}
                />
              ) : (
                <RadioGroup.Root
                  value={answers[item._localId] || ""}
                  onValueChange={({ value }) =>
                    handleInputChange(item._localId, value)
                  }
                >
                  <Stack direction="column">
                    {item.answers.map((ans) => (
                      <RadioGroup.Item key={ans} value={ans}>
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText
                          sx={{
                            wordBreak: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                          fontSize={{ base: "sm", md: "md" }}
                        >
                          {ans}
                        </RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </Stack>
                </RadioGroup.Root>
              )}

              {results && results[item._localId] && (
                <Box mt={2}>
                  <Text
                    color={
                      results[item._localId].isCorrect ? "green.600" : "red.600"
                    }
                    fontWeight="medium"
                  >
                    {results[item._localId].isCorrect ? "✅" : "❌"} Twoja
                    odpowiedź: <strong>{results[item._localId].answer}</strong>
                  </Text>

                  <Text color="green.600" fontWeight="medium">
                    Poprawna odpowiedź:{" "}
                    <strong>{results[item._localId].correctAnswer}</strong>
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      )}

      <Button
        colorScheme="teal"
        size="md"
        mt={10}
        onClick={handleSubmit}
        isDisabled={questions.length === 0}
      >
        Sprawdź odpowiedzi
      </Button>

      {score !== null && (
        <>
          <Flex justify="center" mt={6} align="center">
            <Text fontWeight="bold" fontSize="xl">
              Twój wynik: {score} / {questions.length}
            </Text>
            <IconButton onClick={fetchQuestions} variant="ghost">
              <IoRefresh />
            </IconButton>
          </Flex>
          <Flex justify="center" mt={2}>
            <Text mt={2} textAlign="center" fontSize="md" color="gray.600">
              Powrót
            </Text>
            {renderBackButton()}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default QuestionsPage;
