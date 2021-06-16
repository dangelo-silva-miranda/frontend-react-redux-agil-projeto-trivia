const fetchAPI = async (url) => {
  const response = await fetch(url); // busca o resultado de uma Promise de consulta usando a api do mercado livre e uma url como parâmetro
  return response.json(); // retorna o objeto JSON resultado do sucesso de uma Promise do processamento da stream response
};

export default fetchAPI;
