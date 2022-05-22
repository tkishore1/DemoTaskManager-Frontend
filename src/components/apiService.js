import axios from "axios";

const BASE_API_URL = "http://localhost/api";

export const getAllTasks = () => {
  return axios
    .get(`${BASE_API_URL}/task`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("getAllTasks error----", error);
      throw error;
    });
};

export const getFilteredTasks = (id) => {
  return axios
    .get(`${BASE_API_URL}/task/filter?due=${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("getAllTasks error----", error);
      throw error;
    });
};

export const addTask = (payload) => {
  return axios
    .post(`${BASE_API_URL}/task`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("addTask error----", error);
      throw error;
    });
};

export const editTask = (id, payload) => {
  return axios
    .put(`${BASE_API_URL}/task/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("editTask error----", error);
      throw error;
    });
};

export const deleteTask = (id) => {
  return axios
    .delete(`${BASE_API_URL}/task/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("deleteTask error----", error);
      throw error;
    });
};

export const markComplete = (id) => {
  return axios
    .put(`${BASE_API_URL}/task/${id}/complete`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log("markComplete error----", error);
      throw error;
    });
};
