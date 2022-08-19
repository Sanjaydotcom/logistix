
export function invoke(method, url, payload) {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('GET', 'POST');

 return( fetch(url, {
    method: method,
    // Adding body or contents to send
    // body: JSON.stringify({
    //     title: "foo",
    //     body: "bar",
    //     userId: 1
    // }),
    body: JSON.stringify(payload),
    // Adding headers to the request like json
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: Object.assign({}, headers)
  })
    .then(async function (response) {
      const data = await response.json()
      return data;

    }).catch(function (err) {
      console.log(err)
    })
 )

}

export function post(url, payload) {
  return invoke('POST', url, payload)
}
export function put(url, payload) {
  return invoke('PUT', url, payload)
}
export function get(url, payload) {

  return invoke('GET', url, payload)
}
export function del(url, payload) {
  return invoke('DELETE', url, payload)
}
