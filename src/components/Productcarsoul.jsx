import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow } from 'swiper/modules';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "../styles/ProductCarousel.css";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((json) => setData(json.products))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <Swiper
        style={{ borderRadius: "50px" }}
        effect={'coverflow'}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]} // Include additional modules in the modules array
        className="mySwiper"
        autoplay={{ delay: 1000, disableOnInteraction: false }} // Set autoplay with a delay of 1500ms and disableOnInteraction to false
        navigation={true}
      >
        {/* Map over the data array to create Swiper slides */}
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.thumbnail} alt={`Thumbnail ${index}`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            <div>{item.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
