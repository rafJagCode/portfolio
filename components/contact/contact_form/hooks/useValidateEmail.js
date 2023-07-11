import { useState } from 'react';

const useValidateEmail = () => {
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);

  const validateEmail = (email) => {
    if (email.length < 1) {
      setEmailErrorMessage('EMPTY_EMAIL');
      setIsEmailValid(false);
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailErrorMessage('INVALID_EMAIL');
      setIsEmailValid(false);
      return;
    }
    setIsEmailValid(true);
    return;
  };

  return [isEmailValid, setIsEmailValid, emailErrorMessage, validateEmail];
};

export default useValidateEmail;
