
export default class APIService {
    // test product list
    static URL =
      "https://jsonplaceholder.typicode.com/albums/"; // Demo

      static async execute(method, url, data) {
          console.log('working.....')
          var request = {};
          request.method = method;
          request.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
          };
    
    
          if (request.method !== "GET") {
            request.body = JSON.stringify(data);
          }
          // console.log('API Call = ', 'https://' + loginData.concernCode + '-test.maxxton.net' + url);
          // console.log('API Call = ', APIService.URLTEST + url);
          console.log("request", url, request);
    
          return fetch(url, request)
            .then((res) => {
              console.log("res", res.json);
              return res.json();
            })
            .then((response) => {
              console.log("API Response = ", response);
              return {
                success: true,
                data: response,
              };
            })
            .catch((error) => {
              console.log("API error = ", error);
              return error;
            });
        
      }
}


