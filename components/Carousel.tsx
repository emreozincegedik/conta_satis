import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
// import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import { CardMedia } from "@mui/material";

export const Carousel = ({ images, imgPath }: any) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image: any, i: number) => (
          <SwiperSlide key={i}>
            <CardMedia
              component="div"
              sx={{
                // 16:9
                pt: "100%",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
                maxHeight: "100%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  src={`${imgPath}/${image}`}
                  alt="Image"
                  fill
                  sizes="100%"
                  style={{ objectFit: "contain" }}
                  priority={true}
                  // objectFit="contain"
                />
              </div>
            </CardMedia>
            {/* <Image
              src="/images/Pump Cup Leathers for 1 Pint Stoves/1.jpeg"
              alt={"img alt"}
              width="100"
              height="200"
            /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
