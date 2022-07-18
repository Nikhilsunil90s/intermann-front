import { API_BASE_URL } from "../../../config/serverApiConfig";

export const loginUserService = (request: any) => {
  const LOGIN_API_ENDPOINT = API_BASE_URL + "signin";
  console.log(request);
  const parameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  }
  return fetch(LOGIN_API_ENDPOINT, parameters)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return JSON.stringify(json);
    });
};