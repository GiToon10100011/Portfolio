import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_PORTFOLIO_SERVER_URL;
axios.defaults.withCredentials = true;

export const fetchComments = async (commentsProject: string) => {
  try {
    const response = await axios.get(`/api/comments/${commentsProject}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { head: null }; // 에러 발생시 기본값 반환
  }
};

export const addComment = async (commentsProject: string, commentData: any) => {
  try {
    const response = await axios.post(
      `/api/comments/${commentsProject}`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (
  commentsProject: string,
  commentId: string
) => {
  try {
    const response = await axios.delete(
      `/api/comments/${commentsProject}/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editComment = async (
  commentsProject: string,
  commentId: string,
  commentData: any
) => {
  try {
    const response = await axios.put(
      `/api/comments/${commentsProject}/${commentId}`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
