import React from "react";

interface IErrorHandlerProps {
  errorMessage: string | undefined;
  loading: boolean;
  loadingMessage: string;
}

function ErrorHandler({
  errorMessage,
  loading,
  loadingMessage,
}: IErrorHandlerProps) {
  if (!errorMessage && !loading) return null;

  return (
    <>
      {errorMessage && (
        <div style={{ maxWidth: 200 }}>
          {"Category name is not loaded: " + errorMessage}
        </div>
      )}
      {loading && <div>{loadingMessage}</div>}
    </>
  );
}

export default ErrorHandler;
