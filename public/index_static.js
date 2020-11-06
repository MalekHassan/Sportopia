let URL = 'https://accounts.google.com/o/oauth2/v2/auth';

let options = {
  client_id:
    '1017961095121-u3na2ktuf9i8m0s7ndq0l9ishqpsbfst.apps.googleusercontent.com',
  redirect_uri: 'http://localhost:8000/oauth',
  response_type: 'code',
  scope: 'profile email',
  fetch_basic_profile: true,
};

let QueryString = Object.keys(options)
  .map((key) => {
    return `${key}=` + encodeURIComponent(options[key]);
  })
  .join('&');

let authURL = `${URL}?${QueryString}`;

let link = document.getElementById('oauth');
link.setAttribute('href', authURL);
