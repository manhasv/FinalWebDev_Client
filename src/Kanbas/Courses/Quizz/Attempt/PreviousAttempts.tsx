import React, { useEffect, useState } from "react";
import * as client from "../client";
import { useSelector } from "react-redux";
import { setAttempt } from "./your_attempt_reducer";

export default function PreviousAttempts({ quizId, userId } : { quizId: string; userId: string; }) {
    const { attempts } = useSelector((state: any) => state.attemptReducer ?? []);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await client.getAllAttempts(quizId, userId);
        setAttempt(response);
      } catch (error) {
        console.error("Failed to fetch attempts:", error);
      }
    };

    fetchAttempts();
  }, [quizId, userId]);

  return (
    <div>
      <h3>Previous Attempts</h3>
      <ul className="list-group">
        {attempts.map((attempt:any, index:any) => (
          <li key={index} className="list-group-item">
            Attempt {index + 1}: Score {attempt.score} / Grade{" "}
            {attempt.grade.toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}