export const GRAVATAR_API = 'https://www.gravatar.com/avatar/';
export const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';
export const QUESTIONS_API = 'https://opentdb.com/api.php';

export const fetchAPI = async (url) => {
  const response = await fetch(url); // busca o resultado de uma Promise de consulta usando a api do mercado livre e uma url como parâmetro
  return response.json(); // retorna o objeto JSON resultado do sucesso de uma Promise do processamento da stream response
};
