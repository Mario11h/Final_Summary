import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  FooterIconStyles,
  FooterLinkStyles,
  FooterMidBoxWrapper,
  FooterSection,
  MainContainer,
} from "./FooterStyles";

const Footer = () => {
  return (
    <MainContainer container>
      <FooterSection xs={4} item>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography sx={FooterLinkStyles}>TERMS AND CONDITIONS</Typography>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography sx={FooterLinkStyles}>PRIVACY NOTICE</Typography>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography sx={FooterLinkStyles}>LEGAL TERMS</Typography>
        </Link>
      </FooterSection>
      <FooterSection xs={4} item>
        <FooterMidBoxWrapper>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography sx={FooterLinkStyles}>
              VISITE OUR CORPORATE WEBSITE
            </Typography>
          </Link>
          <Typography
            sx={{ fontSize: "16px", color: "#888", fontWeight: "500" }}
          >
            © 2024 CMA CGM Group
          </Typography>
        </FooterMidBoxWrapper>
      </FooterSection>
      <FooterSection xs={4} item sx={{ justifyContent: "end", gap: "0px" }}>
        <MuiLink href="https://www.facebook.com" sx={{ mx: 1 }}>
          <FacebookIcon sx={FooterIconStyles} />
        </MuiLink>
        <MuiLink href="https://www.linkedin.com" sx={{ mx: 1 }}>
          <LinkedInIcon sx={FooterIconStyles} />
        </MuiLink>
        <MuiLink href="https://www.twitter.com" sx={{ mx: 1 }}>
          <TwitterIcon sx={FooterIconStyles} />
        </MuiLink>
        <MuiLink href="https://www.instagram.com" sx={{ mx: 1 }}>
          <InstagramIcon sx={FooterIconStyles} />
        </MuiLink>
      </FooterSection>
    </MainContainer>
  );
};

export default Footer;
