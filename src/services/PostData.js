export function PostData(type, userData) {
    let BaseURL = 'http://react-back.test/api/usuario';
    //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';

    return new Promise((resolve, reject) =>{

        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
              'Accept': 'application/json',
              'Content-Type': '/json',
            },
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });


      });
}
