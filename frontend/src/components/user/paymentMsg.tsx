interface PaymentMessageProps {
    isSuccess: boolean;
  }
  
  const PaymentMessage: React.FC<PaymentMessageProps> = ({ isSuccess }) => {
    return (
      <div>
        {isSuccess ? (
          <h2 className="text-green-500">Your payment was successful!</h2>
        ) : (
          <h2 className="text-red-500">Your payment failed. Please try again.</h2>
        )}
      </div>
    );
  };
  
  export default PaymentMessage;
  