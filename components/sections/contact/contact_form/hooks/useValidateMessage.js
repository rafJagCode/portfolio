import { useState } from 'react';

const useValidateMessage = () => {
  const [isMessageValid, setIsMessageValid] = useState(null);
  const [messageErrorMessage, setMessageErrorMessage] = useState(null);

  const validateMessage = (message) => {
    let errorMessage = null;
    if (!message.length) errorMessage = 'VALIDATION_EMPTY_MESSAGE';
    else if (message.length < 10) errorMessage = 'VALIDATION_TO_SHORT_MESSAGE';

    if (errorMessage) {
      setMessageErrorMessage(errorMessage);
      setIsMessageValid(false);
      return false;
    }
    setIsMessageValid(true);
    return true;
  };

  return [isMessageValid, messageErrorMessage, validateMessage];
};

export default useValidateMessage;
