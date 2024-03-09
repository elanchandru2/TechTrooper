import React, { useRef } from 'react';
import { Box, Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';

const OrderConfirmation = ({ fullName, quantity, totalAmount, title }) => {
  const confirmationRef = useRef(null);

  const handlePrint = () => {
    const content = confirmationRef.current.innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Order Confirmation</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .order-confirmation {
              max-width: 800px;
              margin: auto;
              padding: 20px;
              border: 1px solid #ccc;
            }
            .order-confirmation h4 {
              margin-top: 0;
            }
            .order-confirmation table {
              width: 100%;
              border-collapse: collapse;
            }
            .order-confirmation th,
            .order-confirmation td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            .order-confirmation th {
              background-color: #f2f2f2;
            }
            .order-confirmation button {
              display: none;
            }
          </style>
        </head>
        <body>
        <h4 style={{fontFamily:"monospace", color:"black"}} className='text-black'>Tech trooper</h4>
          <div class="order-confirmation">
            ${content}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <div ref={confirmationRef}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>Order Confirmation</Typography>
          <Typography variant="body1">Dear {fullName},</Typography>
          <Typography variant="body1">Thank you for your purchase. Your order has been successfully placed!</Typography>
          <Typography variant="body1">We will process your order and provide you with a tracking number shortly.</Typography>
          <Typography variant="h6" style={{ marginTop: '2rem' }}>Order Details</Typography>
        </Box>
        <TableContainer component={Paper} style={{ marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{title}</TableCell>
                <TableCell align="right">{quantity} qty</TableCell>
                <TableCell align="right">${totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box textAlign="center" marginTop="2rem">
          <Typography variant="h6">Total Amount: ${totalAmount.toFixed(2)}</Typography>
          <Typography variant="body1">We will send you an email confirmation shortly.</Typography>
          <Typography variant="body1">If you have any questions or concerns, feel free to contact our customer support.</Typography>
          <Typography variant="body1" style={{ marginTop: '2rem' }}>Thank you again for choosing our store!</Typography>
        </Box>
      </div>
      {/* Print button */}
      <Box textAlign="center" marginTop="1rem">
        <Button variant="outlined" style={{ borderColor: "#9C27B0", color: "#9C27B0"}} onClick={handlePrint}>Print</Button>
      </Box>
    </Container>
  );
};

export default OrderConfirmation;
