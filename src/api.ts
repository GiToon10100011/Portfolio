import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

export const fetchComments = async (commentsProject: string) => {
  try {
    const response = await axios.get(`/api/comments/${commentsProject}`);
    return response.data;
  } catch (error) {
    console.error(error);
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
