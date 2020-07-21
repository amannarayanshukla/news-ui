// import request from "@/utils/request";
/*
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: *
Access-Control-Allow-Methods: *
* */

const myHeaders = new Headers();
myHeaders.append('Cookie', '__cfduid=06e32d6f72d64c898ce7f7a7efc03c76');

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

// fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${APIKEY}`, requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     this.setState({sources: result.sources})
//   })
//   .catch(error => console.log('error', error));

export async function getTopNews({ pageSize = 10, pageNumber = 1, apiKey }) {
  return fetch(
    `https://newsapi.org/v2/top-headlines?pageSize=${pageSize}&page=${pageNumber}&language=en&apiKey=${apiKey}`,
    requestOptions,
  ).then((response) => response.json());
}

export async function getAllSources({ apiKey }) {
  return fetch(
    `https://newsapi.org/v2/sources?language=en&apiKey=${apiKey}`,
    requestOptions,
  ).then((response) => response.json());
}

export async function getEverythingFromSource({ pageSize = 10, pageNumber = 1, sources, apiKey }) {
  console.log('--10--');
  return fetch(
    `https://newsapi.org/v2/everything?pageSize=${pageSize}&page=${pageNumber}&sources=${sources}&apiKey=${apiKey}`,
    requestOptions,
  ).then((response) => response.json());
}
