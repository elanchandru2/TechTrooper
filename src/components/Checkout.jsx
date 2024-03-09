import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import OrderConfirmation from './OrderConfirmation'; // Import OrderConfirmation component
import { Container, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, Skeleton } from "@mui/material";
import Rating from '@mui/material/Rating'; // Import Rating component

const Checkout = () => {
  const { id, quantity: urlQuantity, image, title, description, price } = useParams();
  const [loading, setLoading] = useState(true); // State to track loading state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantity, setQuantity] = useState(0); // State to store quantity
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track if order is placed

  useEffect(() => {
    // Simulate fetching data with a delay
    const timer = setTimeout(() => {
      // Calculate total amount based on quantity from URL and price
      const totalPrice = parseInt(urlQuantity) * parseFloat(price);
      setTotalAmount(totalPrice);
      // Set quantity from URL
      setQuantity(parseInt(urlQuantity));
      setLoading(false); // Set loading to false once data is fetched
    }, 4000); // Simulate 4 seconds delay
    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [urlQuantity, price]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const errors = {};
    if (!fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    if (!paymentMethod.trim()) {
      errors.paymentMethod = "Payment Method is required";
    }
    if (paymentMethod === "creditCard") {
      if (!creditCardNumber.trim()) {
        errors.creditCardNumber = "Credit Card Number is required";
      }
      if (!expiryDate.trim()) {
        errors.expiryDate = "Expiry Date is required";
      }
      if (!cvv.trim()) {
        errors.cvv = "CVV is required";
      }
    }
    setFormErrors(errors);

    // Process form data if no errors
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", {
        fullName,
        email,
        address,
        paymentMethod,
        creditCardNumber,
        expiryDate,
        cvv,
        quantity, // Include quantity in form data
        price,
        totalAmount,
      });
      // Mark order as placed
      setOrderPlaced(true);
    }
  };

  return (
    <Container maxWidth="lg" className="m-4">
      <Typography variant="h2" className="mt-5 mb-4">Checkout</Typography>
      {orderPlaced ? (
        // If order is placed, display OrderConfirmation component
        <OrderConfirmation title={title} fullName= {fullName} quantity={quantity} totalAmount={totalAmount}  />
      ) : (
        // If order is not placed, display checkout form or skeleton loading
        <Grid container spacing={3}>
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            {loading ? ( // Show skeleton loading if data is still loading
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Skeleton variant="rectangular" height={200} animation="wave" sx={{ backgroundColor: '#9C27B0' }} />
                </Grid>
                <Grid item xs={12} md={8}>
                  <Skeleton variant="text" height={50} animation="wave" sx={{ backgroundColor: '#9C27B0' }} />
                  <Skeleton variant="text" height={100} animation="wave" sx={{ backgroundColor: '#9C27B0' }} />
                  <Skeleton variant="text" height={30} animation="wave" sx={{ backgroundColor: '#9C27B0' }} />
                </Grid>
              </Grid>
            ) : (
              <div className="card">
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    {/* Image */}
                    <img
                      src={decodeURIComponent(image)}
                      alt="Product"
                      className="img-fluid"
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    {/* Text */}
                    <div className="card-body">
                      <Typography variant="h5">{decodeURIComponent(title)}</Typography>
                      <Typography variant="body1">{decodeURIComponent(description)}</Typography>
                      <Typography variant="body1">Quantity: {quantity}</Typography>
                      {/* Other checkout form elements can go here */}
                    </div>
                  </Grid>
                </Grid>
              </div>
            )}
          </Grid>
          {/* Checkout Form */}
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <TextField
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                fullWidth
                required
                margin="normal"
              />
              {/* Email */}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!formErrors.email}
                helperText={formErrors.email}
                fullWidth
                required
                margin="normal"
              />
              {/* Address */}
              <TextField
                label="Address"
                multiline
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={!!formErrors.address}
                helperText={formErrors.address}
                fullWidth
                required
                margin="normal"
              />
              {/* Payment Method */}
              <FormControl fullWidth margin="normal" error={!!formErrors.paymentMethod}>
                <InputLabel id="paymentMethodLabel">Payment Method</InputLabel>
                <Select
                  labelId="paymentMethodLabel"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                >
                  <MenuItem value="">Select Payment Method</MenuItem>
                  <MenuItem value="cod">Cash on Delivery</MenuItem>
                  <MenuItem value="gpay">Gpay</MenuItem>
                  <MenuItem value="creditCard">Credit Card</MenuItem>
                </Select>
              </FormControl>
              {/* Credit Card fields */}
              {paymentMethod === "creditCard" && (
                <>
                  <TextField
                    label="Credit Card Number"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                    error={!!formErrors.creditCardNumber}
                    helperText={formErrors.creditCardNumber}
                    fullWidth
                    required
                    margin="normal"
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Expiry Date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        error={!!formErrors.expiryDate}
                        helperText={formErrors.expiryDate}
                        fullWidth
                        required
                        margin="normal"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        error={!!formErrors.cvv}
                        helperText={formErrors.cvv}
                        fullWidth
                        required
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {/* QR Code for Gpay */}
              {paymentMethod === "gpay" && (
                <div className="mb-3">
                  <Typography variant="h6" gutterBottom>Gpay QR Code:</Typography>
                  <QRCode value="elanchandru2-1@oksbi" />
                </div>
              )}
              {/* Total amount */}
              {/* // Total amount */}
{loading ? (
  <Skeleton variant="text" height={24} width={200} animation="wave" sx={{ backgroundColor: '#9C27B0' }} />
) : (
  <Typography variant="h6" gutterBottom>Total Amount: ${totalAmount.toFixed(2)}</Typography>
)}
              {/* Place Order button */}
              <Button type="submit"  variant="outlined" style={{ borderColor: "#9C27B0", color: "#9C27B0"}} className="mt-3">Place Order</Button>
            </form>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Checkout;
