import { useEffect, useState } from "react";
import axios from "axios";

interface ClueItem {
  name: string[];
  clues: string[];
}

const QuizQuestions = () => {
  const [history, setHistory] = useState<ClueItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [showAnswer, setShowAnswer] = useState(false); // add a simple comment

  const fetchRandomItem = () => {
    axios
      .get("/data.json")
      .then((res) => {
        const random = res.data[Math.floor(Math.random() * res.data.length)];
        const newHistory = [...history, random];
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
        setShowAnswer(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    fetchRandomItem();
  }, []);

  const currentItem = history[currentIndex];

  return (
    <>
      <div className="container ">
        <h1 className="mt-5">Quiz</h1>
        <ul className="list-group my-3">
          {currentItem?.clues.map((clue, index) => (
            <li key={index}>
              {index + 1}. {clue}
            </li>
          ))}
        </ul>

        <button
          className="btn btn-secondary me-2"
          onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
          disabled={currentIndex <= 0}
        >
          Previous
        </button>

        <button className="btn btn-primary me-2" onClick={fetchRandomItem}>
          Next
        </button>

        <button
          className="btn btn-warning me-2"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          Show Answer
        </button>

        {showAnswer && (
          <h2 className="mt-3">
            {/* Answer:{" "} */}

            {currentItem?.name.length > 1
              ? currentItem.name.join(", ")
              : currentItem.name}
          </h2>
        )}
      </div>
      <footer className="mt-5">Made with ❤️ by Eden</footer>
    </>
  );
};

export default QuizQuestions;
