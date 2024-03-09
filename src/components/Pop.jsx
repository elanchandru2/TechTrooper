import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ImageAvatars() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverId, setPopoverId] = useState(null);
  const [likedAvatars, setLikedAvatars] = useState([]);

  const products = [
    'Phone',
    'Laptop',
    'Headphones',
    'Camera',
    'Tablet',
    'Smartwatch',
    'Speaker',
    'Monitor',
    'Keyboard',
    'Mouse',
  ];

  const feedbackTemplates = [
    'I love the {product}! It exceeded my expectations.',
    'The {product} is fantastic. I highly recommend it.',
    'I\'m impressed with the quality of the {product}.',
    'Great value for money. The {product} is a game-changer.',
    'The {product} has made my life so much easier. Thank you!',
  ];

  const names = [
    'John Doe',
    'Jane Smith',
    'Michael Johnson',
    'Emily Brown',
    'David Wilson',
    'Sarah Taylor',
    'James Martinez',
    'Jessica Anderson',
    'Robert Lee',
    'Emma Garcia',
  ];

  const generateFeedback = () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const template = feedbackTemplates[Math.floor(Math.random() * feedbackTemplates.length)];
    return template.replace('{product}', product);
  };

  const generateName = () => {
    return names[Math.floor(Math.random() * names.length)];
  };

  const handlePopoverOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPopoverId(id);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverId(null);
  };

  const handleLike = (index) => {
    if (!likedAvatars.includes(index)) {
      setLikedAvatars([...likedAvatars, index]);
    }
  };

  const isLiked = (index) => {
    return likedAvatars.includes(index);
  };

  const open = Boolean(anchorEl);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const avatars = [];
  for (let index = 1; index <= 12; index++) {
    avatars.push(
      <div key={index}>
        <Avatar
          alt={`User ${index}`}
          src={`https://randomuser.me/api/portraits/men/${index}.jpg`}
          onClick={(event) => handlePopoverOpen(event, index)}
          aria-owns={popoverId === index ? `avatar-popover-${index}` : undefined}
          aria-haspopup="true"
          sx={{ width: 100, height: 100, cursor: 'pointer' }}
        />
        <Popover
          id={`avatar-popover-${index}`}
          open={popoverId === index && open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              padding: 2,
            },
          }}
        >
          <Card>
            <CardContent>
              <Avatar alt={`User ${index}`} src={`https://randomuser.me/api/portraits/men/${index}.jpg`} />
              <div>
                <div>{generateName()}</div>
                <Rating name={`rating-${index}`} value={Math.floor(Math.random() * 5) + 1} readOnly />
                <div>{generateFeedback()}</div>
                <IconButton
                  aria-label="like"
                  onClick={() => handleLike(index)}
                  color={isLiked(index) ? 'secondary' : 'default'}
                >
                  <FavoriteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Popover>
      </div>
    );
  }

  const rows = [];
  const chunkSize = window.innerWidth > 768 ? (window.innerWidth > 1200 ? 3 : 2) : 1; // Number of avatars per row
  const maxRows = window.innerWidth > 768 ? Math.ceil(avatars.length / (window.innerWidth > 1200 ? 3 : 2)) : 10; // Maximum number of rows to display
  

  for (let i = 0; i < avatars.length && rows.length < maxRows; i += chunkSize) {
    rows.push(avatars.slice(i, i + chunkSize));
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Slider {...settings}>
        {rows.map((row, index) => (
          <div key={index}>
            {row}
          </div>
        ))}
      </Slider>
    </div>
  );
}
