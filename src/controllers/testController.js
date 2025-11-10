import { createTestsFromUserStory } from "../services/testService.js";

export const generateTests = (req, res) => {
  const { userStory } = req.body;

  if (!userStory) {
    return res.status(400).json({ error: "O campo 'userStory' é obrigatório." });
  }

  const tests = createTestsFromUserStory(userStory);

  res.status(200).json({
    userStory,
    generatedAt: new Date(),
    totalTests: tests.length,
    tests
  });
};
