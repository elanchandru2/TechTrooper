import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function error() {
  toast.error("❌You did'nt complete", {
    position: "top-center",
    autoClose: 3000, // Close after 3 seconds
  });
}

//submit form

function submitfrom() {
  success();
  clearForm();
}

function success() {
  toast.success("😍successfully completed", {
    position: "top-center",
    autoClose: 3000, // Close after 3 seconds
  });
}

function clearForm() {
  setName("");
  setAddress("");
  setNumber("");
  setEmail("");
  setCity("");
  setState("");
  setAnyno("");
}

//validation

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [anyno, setAnyno] = useState("");
  // error
  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [anynoError, setAnynoError] = useState("");

  function hello(e) {
    e.preventDefault();
    if (validFrom()) {
      submitfrom();
    } else {
      error();
    }
  }

  function validFrom() {
    let isValid = true;

    if (!name) {
      setNameError("Please Enter Your Name");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!address) {
      setAddressError("Please Enter Your Address");
      isValid = false;
    } else {
      setAddressError("");
    }

    if (!number) {
      setNumberError("Please Enter Your Phone Number");
      isValid = false;
    } else {
      setNumberError("");
    }

    if (!email) {
      setEmailError("Please Enter Your Email Address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!city) {
      setCityError("Enter Your City");
      isValid = false;
    } else {
      setCityError("");
    }

    if (!state) {
      setStateError("Enter Your State");
      isValid = false;
    } else {
      setStateError("");
    }

    if (!anyno) {
      setAnynoError("Type Any Two-Digit Number");
      isValid = false;
    } else {
      setAnynoError("");
    }

    return isValid;
  }

  return (
    <>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1>Enquiry</h1>
          <form onSubmit={hello} action="">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label className="">Enter your Name</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className="text-danger">{nameError}</p>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Enter your Address</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <p className="text-danger">{addressError}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Enter your Phone number</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  <p className="text-danger">{numberError}</p>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Enter your email address</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-danger">{emailError}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Enter your city</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <p className="text-danger">{cityError}</p>
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <label>Enter your state</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <p className="text-danger">{stateError}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>type any two number</label> <br />
                  <input
                    className="form-control"
                    type="text"
                    value={anyno}
                    onChange={(e) => setAnyno(e.target.value)}
                  />
                  <p className="text-danger">{anynoError}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button className="m-4 btn btn-primary" >Submit</button>
                <ToastContainer
                  position="top-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                  transition={Bounce} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
