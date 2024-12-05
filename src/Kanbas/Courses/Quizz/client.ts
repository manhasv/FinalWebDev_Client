import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZ_API = `${REMOTE_SERVER}/api/quizz`;

export const deleteQuizz = async (quizzId: string) => {
    const response = await axios.delete(`${QUIZZ_API}/${quizzId}`);
    return response.data;
};

export const updateQuizz = async (quizz: any) => {
    const response = await axios.put(`${QUIZZ_API}/${quizz._id}`, quizz);
    return response.data;
};

// attempt
export const startAttempt = async (quizId: string, userId: string) => {
    const response = await axios.post(`${QUIZZ_API}/${quizId}/attempt/${userId}`);
    // alert(`This is the response from client sa: ${JSON.stringify(response)}`)
    return response.data;
};
export const getLatestAttempt = async (quizId: string, userId: string) => {
    const response = await axios.get(`${QUIZZ_API}/${quizId}/attempt/${userId}`);
    // alert(`This is the response from client gla: ${JSON.stringify(response)}`)
    return response.data;
};

export const updateAttemptAnswers = async (quizId: string, userId: string, answers: any) => {
    console.log("answers", answers);
    const response = await axios.put(`${QUIZZ_API}/${quizId}/attempt/${userId}`, answers);
    return response.data;
};

export const submitAttempt = async (quizId: string, userId: string) => {
    const response = await axios.post(`${QUIZZ_API}/${quizId}/attempt/${userId}/submit`);
    return response.data;
};

export const getAllAttempts = async (quizId: string, userId: string) => {
    const response = await axios.get(`${QUIZZ_API}/${quizId}/attempts/${userId}`);
    return response.data;
};

export const publishQuiz = async (quizId: string) => {
    const response = await axios.post(`${QUIZZ_API}/${quizId}/publish`);
    return response.data;
};
export const unpublishQuiz = async (quizId: string) => {
    const response = await axios.post(`${QUIZZ_API}/${quizId}/unpublish`);
    return response.data;
}