'use client';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface galaryProps {
  image: string[];
  removeItem: (index: number) => void;
}

interface ActionAndNavigationButtonsProps {
  activeIndex: number;
  totalImages: number;
  removeItem: (index: number) => void;
}

export const CommonSwiper = ({ image, removeItem }: galaryProps) => {

  const [slideIndex, setSlideIndex] = useState<number>(0);
  return (
    <Box sx={{
      position: "relative",
      height: "100%",
      borderRadius: "1rem",
      overflow: "hidden",
    }}>
      <Swiper
        lazyPreloadPrevNext={1}
        pagination={{
          clickable: true,
        }}
        // autoplay={{
        //   delay: 2500,
        //   waitForTransition: true,
        //   disableOnInteraction: false,
        // }}
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={20}
        lazyPreloaderClass="lazy-preloader"
        modules={[Navigation, Pagination]}
        onSlideChange={(swiper) => {
          setSlideIndex(swiper.activeIndex);
        }}
        style={
          {
            width: "100%",
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#fff",
            "--swiper-pagination-bullet-inactive-color": "#fff",
            "--swiper-pagination-bullet-inactive-opacity": ".1",
            "--swiper-pagination-bullet-horizontal-gap": "3px",
            minHeight: "300px",
          } as any
        }
      >
        {image.map((src: string, idx: number) => (
          <SwiperSlide
            key={idx}
            style={{
              height: "100%",
              borderRadius: "0.3rem",
            }}
          >
            <Box sx={{
              '& img': {
                borderRadius: "1rem",
                overflow: "hidden",
                objectFit: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                maxHeight: '300px'
              }
            }}>
              <img src={`${src}`} loading="lazy" />
            </Box>
          </SwiperSlide>
        ))}
        <ActionAndNavigationButtons
          activeIndex={slideIndex}
          totalImages={image?.length}
          removeItem={removeItem}
        />
      </Swiper>
    </Box>
  );
};

export default CommonSwiper;

const ActionAndNavigationButtons = ({
  activeIndex,
  totalImages,
  removeItem,
}: ActionAndNavigationButtonsProps) => {
  const swiper = useSwiper();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
        px: 4,
      }}>
        {activeIndex !== 0 ? (
          <IconButton
            sx={{
              p: 2,
              backgroundColor: "#fff",
              color: "black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              }
            }}
            disabled={activeIndex === 0}
            onClick={() => swiper.slidePrev()}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : <div></div>}
        {activeIndex !== totalImages - 1 ? (
          <IconButton
            sx={{
              p: 2,
              backgroundColor: "#fff",
              color: "black",
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              }
            }}
            disabled={activeIndex === totalImages - 1}
            onClick={() => swiper.slideNext()}
          >
            <ArrowForwardIcon />
          </IconButton>
        ) : <div></div>}
      </Box>
      <Box sx={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        padding: "0.5rem 1rem",
        color: "#000",
        borderRadius: "1rem",
        backgroundColor: "#fff",
      }}>
        <span>{activeIndex + 1}/{totalImages}</span>
      </Box>
      <Box sx={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        padding: ".2rem",
        color: "#000",
        borderRadius: "9999px",
        backgroundColor: "#fff",
      }}>
        <IconButton
          sx={{
            p: 2,
            backgroundColor: "#fff",
            color: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            }
          }}
          onClick={() => removeItem(activeIndex)}
        >
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};
