import React, { useEffect, useState, useCallback } from "react";
import { Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { makeStkPush, stkCallback } from "../store/skt-slice";

const DonationComponent = () => {
  const [amount, setAmount] = useState("");
  const [donarName, setDonarName] = useState("");
  const [phone, setPhone] = useState("");
  const [merchantRequestId, setMerchantRequestId] = useState(null);

  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const { isLoading, details } = useSelector((state) => state.donationSlice);
  const dispatch = useDispatch();

  // 🔹 Function to show toast
  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // 🔹 Handle Amount Selection
  const handleAmountChange = (value) => {
    setAmount(value);
  };

  // 🔹 Function to handle STK Push transaction
  const handleDonate = async () => {
    if (!phone || !amount) {
      showToast("Please enter phone number and amount.", "danger");
      return;
    }

    try {
      const response = await dispatch(makeStkPush({ phone, amount, donarName })).unwrap();

      if (response?.success) {
        setMerchantRequestId(response.transaction?.merchantRequestId);
        showToast("STK push sent. Kindly approve on your phone", "success");
      } else {
        showToast("STK push failed. Try again.", "danger");
      }
    } catch (error) {
      console.error("STK Push Error:", error);
      showToast("Failed to send STK push. Try again.", "danger");
    }
  };

  // 🔹 Callback function to check transaction status
  const checkTransactionStatus = useCallback(async () => {
    if (!merchantRequestId) return;

    try {
      const response = await dispatch(stkCallback( merchantRequestId )).unwrap();      
      if (response?.success) {
        console.log('let me check',response?.success)
        showToast("Thank You For  your Donation", "success");
        setMerchantRequestId(null);
        setDonarName("");
        setAmount("");
        setPhone("");
      }
    } catch (error) {
      console.error("STK Callback Error:", error);
      showToast("Your Payment did not go through Try Again Please or Donate Direct to Till Below", "danger");
     
    }
  }, [merchantRequestId, dispatch]);

  // 🔹 useEffect to handle STK push callback
  useEffect(() => {
    if (merchantRequestId) {
      checkTransactionStatus();
    }
  }, [merchantRequestId, checkTransactionStatus]);

  return (
    <>
      <div className="donation-container">
        <h2>Make a Donation</h2>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-sm-12">
{/*               <input
                type="text"
                placeholder="Enter name or Donate Anonymously"
                value={donarName}
                onChange={(e) => setDonarName(e.target.value)}
                className="form-control mb-3 d-block"
              /> */}

              <div className="donation-buttons d-flex flex-wrap gap-2 mb-3">
                {[100, 200, 500, 1000].map((value) => (
                  <button key={value} onClick={() => handleAmountChange(value)} className="">
                    Ksh {value}
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Enter amount of your choice"
                name="amount"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="form-control mb-3 d-block"
              />

{/*               <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control mb-3 d-block"
              /> */}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button  className="donate-button mt-3">
            { `Donate Ksh ${amount}`}
          </button>
        </div>

        <h3 className="mt-3">Via  Mpesa Till NO. 6217699</h3>
      </div>

      {/* Toast Message */}
      {toast.show && (
        <div
          className="position-fixed d-flex justify-content-center align-items-center w-100 h-100"
          style={{ top: 0, left: 0, zIndex: 1050, backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <Toast isOpen={toast.show} className={`bg-${toast.type} text-white`}>
            <ToastHeader toggle={() => setToast({ ...toast, show: false })}>
              {toast.type === "success" ? "Success" : "Error"}
            </ToastHeader>
            <ToastBody>{toast.message}</ToastBody>
          </Toast>
        </div>
      )}
    </>
  );
};

export default DonationComponent;
