import { questions } from "./constant.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
const PORT = 3000;

app.get("/", (req, res) => res.send("Hello World"));

// localhost:3000/questions
app.get("/questions", (req, res) => {
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);
  const shuffledQuestions = shuffle([...questions]);

  const questionsWithShuffledAnswers = shuffledQuestions.map((question) => ({
    ...question,
    answers: shuffle([...question.answers]),
  }));
  res.json(questionsWithShuffledAnswers);
});

app.post("/logic-test", (req, res) => {
  // localhost:3000/logic-test
  // Example { "array": ["flower","flow","flight", "fly", "flop"] }  send JSON like this to postman

  // Write a function to find the longest common prefix string amongst an array of strings.
  // If there is no common prefix, return an empty string "".
  // Example 1:
  // Input: strs = ["flower","flow","flight"]
  // Output: "fl"
  // Example 2:
  // Input: strs = ["dog","racecar","car"]
  // Output: ""
  // Explanation: There is no common prefix among the input strings.
  // Constraints:
  // * 1 <= strs.length <= 200
  // * 0 <= strs[i].length <= 200
  // * strs[i] consists of only lower-case English letters.

  if (typeof req.body.array !== "object") {
    throw Error("must be array");
  }
  let strs = req.body.array;
  if (strs.length === 0) {
    res.send("");
  }
  let ans = strs[0];
  for (const [index] of strs.entries()) {
    while (strs[index].indexOf(ans) !== 0) {
      ans = ans.substring(0, ans.length - 1);
      if (ans === "") {
        return "";
      }
    }
  }
  res.send(ans);
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
export default app;
