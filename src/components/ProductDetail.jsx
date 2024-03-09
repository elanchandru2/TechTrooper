import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { List } from "@mui/material";
import randomColor from "randomcolor";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

import {
  Button,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Avatar,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      });
  }, [id]);

  useEffect(() => {
    // Fetch 10 random feedbacks
    const fetchFeedbacks = async () => {
      const responses = await Promise.all(
        Array.from({ length: 10 }, () => fetch("https://randomuser.me/api/"))
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      const feedbacksWithPictures = data.map((result, index) => ({
        ...result.results[0],
        productId: id,
        productName: product.title,
        productPrice: product.price,
      }));
      setFeedbacks(feedbacksWithPictures);
    };

    fetchFeedbacks();
  }, [id, product]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const feedbackList = [
    "The gadget's aesthetic is strikingly modern, with clean lines and a minimalist design that exudes sophistication.",
    "I love the sleek and elegant appearance of this gadget. It looks like a premium product that would complement any contemporary setting.",
    "The design is so sleek and stylish, it's almost like a piece of art. It's definitely a conversation starter.",
    "The gadget's sleek exterior gives it a high-end feel, making it stand out in a crowded market of similar devices.",
    "I'm impressed by the attention to detail in the design of this gadget. Every element seems carefully considered and well-executed.",
    "The gadget's sleek profile and futuristic appearance make it a visually appealing addition to any tech enthusiast's collection.",
    "The modern design of this gadget sets it apart from its competitors. It looks like something straight out of a sci-fi movie.",
    "I appreciate the minimalist design of this gadget. It's refreshing to see a product that prioritizes simplicity and elegance.",
    "The sleek finish of the gadget gives it a premium look and feel, suggesting quality craftsmanship and attention to detail.",
    "The gadget's sleek and understated design makes it a versatile accessory that would complement any style or décor.",
  ];

  // Function to generate a random index within the range of the feedbackList array
  const getRandomIndex = () => {
    return Math.floor(Math.random() * feedbackList.length);
  };

  // State to hold the randomly selected feedback
  const [randomFeedback, setRandomFeedback] = useState(
    feedbackList[getRandomIndex()]
  );

  // Function to handle the click event and update the random feedback
  const handleRandomFeedback = () => {
    const randomIndex = getRandomIndex();
    setRandomFeedback(feedbackList[randomIndex]);
  };

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");

      if (name.trim() !== "" && email.trim() !== "" && comment.trim() !== "") {
        const newComment = {
          name: name,
          email: email,
          comment: comment,
        };
        setComments([...comments, newComment]);
        setName("");
        setEmail("");
        setComment("");
      }
    }
  };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  //feedback

  //comment field

  if (!product || feedbacks.length < 10) {
    // Render loading spinner if data is being fetched
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress style={{ color: "#9C27B0" }} />
      </div>
    );
  }

  const images = product.images.map((image) => ({ url: image }));

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} color="gold" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key={stars.length} color="gold" />);
    }

    return stars;
  };

  return (
    <Container maxWidth="lg" className="mt-5">
      <Grid container spacing={1}>
        <Grid item md={6} sm={4}>
          <SimpleImageSlider
            width={500}
            height={500}
            images={images}
            showBullets={true}
            showNavs={true}
            useGPURender={true}
          />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h4">{product.title}</Typography>
          <Typography variant="body1" className="lead">
            {product.description}
          </Typography>
          <Typography variant="body2" className="" style={{ fontWeight: 'bold', fontSize: '40px',color:"black" }}>
  Price: ${product.price}
</Typography>

          <div className="mb-3">{renderRatingStars(product.rating)}</div>
          <Grid container className=" mb-4" spacing={2} alignItems="center">
            <Grid item>
              <IconButton onClick={handleDecrement}>
                <RemoveCircleOutline />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                type="text"
                value={quantity}
                InputProps={{ readOnly: true }}
                style={{ textAlign: "center" }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleIncrement}>
                <AddCircleOutline />
              </IconButton>
            </Grid>
          </Grid>
          <Link
            to={`/checkout/${product.id}/${quantity}/${encodeURIComponent(
              product.images[0]
            )}/${encodeURIComponent(product.title)}/${encodeURIComponent(
              product.description
            )}/${encodeURIComponent(product.price)}`}
          >
            <Button
              variant="outlined"
              style={{ borderColor: "#9C27B0", color: "#9C27B0" }}
            >
              Proceed to Checkout
            </Button>
          </Link>
        </Grid>
      </Grid>
      <div>
        <Typography variant="h6" className="p-4">
          Feedbacks:
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar style={{ backgroundColor: randomColor() }}>
              {/* You can replace the content with the user's initials or avatar image */}
            </Avatar>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Your Name"
              value={name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Your Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Add a comment"
              value={comment}
              label={
                <Typography variant="body1" style={{ fontWeight: 300 }}>
                  Add a comment
                </Typography>
              }
              onChange={handleCommentChange}
            />
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              style={{ borderColor: "#9C27B0", color: "#9C27B0" }}
              onClick={handleSubmit}
            >
              Comment
            </Button>
          </Grid>
        </Grid>

        {/* Comments Section */}
        <div>
          <Typography variant="h6">Comments:</Typography>
          {/* Map through the comments array and render each comment */}
          {comments.map((commentData, index) => (
            <div key={index} className="comment m-2">
              <Avatar style={{ backgroundColor: randomColor() }}>
                {/* You can replace the content with the user's initials or avatar image */}
              </Avatar>
              <div>
                <Typography variant="body2">{commentData.name}</Typography>
                <Typography variant="body2">{commentData.email}</Typography>
                <Typography variant="body2">{commentData.comment}</Typography>
              </div>
            </div>
          ))}
        </div>

        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback">
            <Avatar src={feedback.picture.thumbnail} alt="User" />
            <Typography variant="body2">{feedback.name.first}</Typography>
            <Typography variant="body2">{feedback.email}</Typography>
            <Typography variant="body2">{feedback.text}</Typography>
            <p>
              {feedbackList[Math.floor(Math.random() * feedbackList.length)]}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
