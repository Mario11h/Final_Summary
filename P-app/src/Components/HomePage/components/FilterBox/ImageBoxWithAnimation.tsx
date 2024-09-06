import React, { useEffect, useRef, useState } from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import FilterBoxImage from "./FilterBoxImage";

// Styled component with hover and animation behavior
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
    transform: "translateY(+100%)",
    "&.animate": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "&:hover": {
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
  })
);

interface ImageBoxWithAnimationProps {
  delay: number;
  text: string;
  imgurl: string;
}

const ImageBoxWithAnimation: React.FC<ImageBoxWithAnimationProps> = ({
  delay,
  text,
  imgurl,
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false); // Track if the element has already animated

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true); // Set this to true to prevent future animations
          }
        });
      },
      { threshold: 0.2 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <FilterBoxImageBox
      ref={boxRef}
      className={isVisible ? "animate" : ""}
      xs={3.8}
      item
      delay={delay}
    >
      <FilterBoxImage src={imgurl} alt="image3" />
      <Box
        sx={{
          padding: "4px",
          boxSizing: "border-box",
          maxHeight: "50%",
        }}
      >
        <Typography
          sx={{
            fontSize: "12px",
            overflow: "hidden",
          }}
        >
          {text}
        </Typography>
      </Box>
    </FilterBoxImageBox>
  );
};

export default ImageBoxWithAnimation;
