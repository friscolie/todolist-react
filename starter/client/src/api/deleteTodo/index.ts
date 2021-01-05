import axios from "axios";

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://localhost:8080/api/remove-todo/${id}`,
    });
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
