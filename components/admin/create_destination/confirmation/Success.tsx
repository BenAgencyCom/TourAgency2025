import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
// Material UI Icons
import Check from "@mui/icons-material/Check";
// Styled components
const Wrapper = styled(Box)(({ theme }) => ({
    position: "absolute",
    width: "calc(100% - 40px)",
    height: "100%",
    zIndex: 1,
    background: theme.palette.success.main,
    backdropFilter: "blur(5px)",
}));
const Icon = styled(Box)(({ theme }) => ({
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    fontSize: "10rem",
    background: theme.palette.success.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
}));
const Content = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1,
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
}));
const Background = styled(Box)(({ theme }) => ({
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: 0.5,
    filter: "blur(10px)",
}));
interface SuccessProps {
    slug: string;
}

const Success: FunctionComponent<SuccessProps> = (props) => {
    return (
        <Wrapper>
            <Background sx={{ backgroundImage: `url("/images/admin/add_destination/success.jpg")` }}></Background>
            <Content>
                <Fade in={true} timeout={1000}>
                    <Icon>
                        <Check sx={{ fontSize: "inherit" }}></Check>
                    </Icon>
                </Fade>
                <Fade in={true} timeout={300}>
                    <Typography variant="h2" sx={{ fontWeight: "bold", maxWidth: "700px", textAlign: "center" }}>
                        Destination has been created successfully
                    </Typography>
                </Fade>

                <Fade in={true} timeout={1000}>
                    <Box sx={{ display: "flex", mt: 2 }}>
                        <Button variant="contained" color="success" sx={{ width: "200px", color: "#fff" }}>
                            Main page
                        </Button>
                        <Button variant="contained" color="success" sx={{ width: "200px", color: "#fff", mx: 1 }}>
                            Open
                        </Button>
                        <Button variant="contained" color="success" sx={{ width: "200px", color: "#fff" }}>
                            Browse landmarks
                        </Button>
                    </Box>
                </Fade>
            </Content>
        </Wrapper>
    );
};

export default Success;
