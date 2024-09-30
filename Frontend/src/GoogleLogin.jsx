import { GoogleLogin } from 'react-google-login';

// const clientId =
//   '598048758838-enhddjp4p7aecbg815on7utseok98276.apps.googleusercontent.com';

function Login() {
  return (
    <div id="loginButton">
      <GoogleLogin clientId={clientId}></GoogleLogin>
    </div>
  );
}
