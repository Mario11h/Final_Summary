import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import { images } from "../../Assets/DummyData";
import FilterBoxImage from "./FilterBoxImage";

export const FilterBoxImageBox = styled(Grid)<{ delay: number }>(
  ({ delay }) => ({
    backgroundColor: "white",
    height: "100%",
    display: "flex",
    borderRadius: "10px",
    overflow: "hidden",
    flexDirection: "column",
    transition: `transform 1s ease ${delay}ms, opacity 1s ease ${delay}ms`,
    opacity: 0,
    transform: "translateX(-100%)",
    "&.animate": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "&.hide": {
      opacity: 0,
      transform: "translateX(-100%)",
      transition: "none",
    },
  })
);

interface ImageBoxWithAnimationProps {
  delay: number;
}

const ImageBoxWithAnimation: React.FC<ImageBoxWithAnimationProps> = ({
  delay,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  return (
    <FilterBoxImageBox
      ref={boxRef}
      className={isVisible ? "animate" : "hide"}
      xs={3.8}
      item
      delay={delay}
    >
      <FilterBoxImage src={images[3].imageUrl} alt="image3" />
      <Box sx={{ padding: "4px", boxSizing: "border-box" }}>
        <Typography sx={{ fontSize: "12px" }}>
          Container Sales Platform or CSP is an online e-commerce platform that
          allows CMA CGM customers to purchase containers that are older than 13
          years online.
        </Typography>
      </Box>
    </FilterBoxImageBox>
  );
};

export default ImageBoxWithAnimation;
