import { extend } from 'umi-request';
import { notification } from 'antd';

const codeMessage = {
  200: 'Login success',
  400: 'Invalid Parameter or Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden ',
  404: 'Not found',
  409: 'User already exist',
  500: 'Internal Error',
  503: 'Backend Error',
};

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Request Error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'You cannot connect to the server',
      message: 'Network anomaly',
    });
  }

  return response;
};
const request = extend({
  errorHandler,
  credentials: 'include',
});
export default request;
