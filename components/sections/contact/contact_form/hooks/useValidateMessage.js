import { useState } from 'react';

const useValidateMessage = () => {
  const [isMessageValid, setIsMessageValid] = useState(null);
  const [messageErrorMessage, setMessageErrorMessage] = useState(null);

  const validateMessage = (message) => {
    if (!message.trim().length) {
      setMessageErrorMessage('VALIDATION_EMPTY_MESSAGE');
      setIsMessageValid(false);
      return;
    }
    if (message.trim().length < 10) {
      setMessageErrorMessage('VALIDATION_TO_SHORT_MESSAGE');
      setIsMessageValid(false);
      return;
    }
    setIsMessageValid(true);
    return;
  };

  return [isMessageValid, messageErrorMessage, validateMessage];
};

export default useValidateMessage;
