import { Box, Button } from "@mui/material";
import { images } from "../Assets/DummyData";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  NavbarContainer,
  NavbarLink,
  NavbarLinksSection,
  NavbarLogoSection,
  NavbarLogoutSection,
} from "./NavbarStyles";

const Navbar = () => {
  return (
    <>
      <NavbarContainer container>
        <NavbarLogoSection xs={4} item>
          <Box
            component="img"
            src={images[0].imageUrl}
            alt="Description of the image"
            sx={{
              width: "100px",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </NavbarLogoSection>
        <NavbarLinksSection xs={4} item>
          <NavbarLink to="/">Home</NavbarLink>
          <NavbarLink to="/projects">Projects</NavbarLink>
        </NavbarLinksSection>
        <NavbarLogoutSection xs={4} item>
          <Button>
            <LogoutIcon sx={{ color: "black", height: "20px" }} />
          </Button>
        </NavbarLogoutSection>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
