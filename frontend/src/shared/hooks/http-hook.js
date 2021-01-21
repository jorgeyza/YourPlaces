import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeHttpRequests = useRef([]); // With useRef we can store data across multiple rerender cycles. We don't use useState because we don't want to change the UI each time an abort controller is instantiated

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrll = new AbortController(); //AbortController is a functionality built in modern browsers
      activeHttpRequests.current.push(httpAbortCtrll);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrll.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );

        if (!response.ok) {
          // if we receive a 400 o 500 status response
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // If I send a request from the client and suddenly change to another component, like changing to another page or going back in the browser, that request will be aborted
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
