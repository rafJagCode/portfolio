import { useState } from 'react';

const useValidateEmail = () => {
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);

  const validateEmail = (email) => {
    let errorMessage = null;
    if (!email.length) errorMessage = 'VALIDATION_EMPTY_EMAIL';
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) errorMessage = 'VALIDATION_INVALID_EMAIL';

    if (errorMessage) {
      setEmailErrorMessage(errorMessage);
      setIsEmailValid(false);
      return false;
    }

    setIsEmailValid(true);
    return true;
  };

  return [isEmailValid, emailErrorMessage, validateEmail];
};

export default useValidateEmail;
