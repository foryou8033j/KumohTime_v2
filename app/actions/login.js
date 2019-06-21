// @flow
import axios from 'axios';

export function accountCheck(user_id: String, password: String) {
  axios.post('https://kumoh42.com/app/data/member/doLogin.php', {
      user_id: user_id,
      user_pw: password
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });

  return {
    type: 'DONE'
  };
}
