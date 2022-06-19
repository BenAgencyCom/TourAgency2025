// Tools
import { styled } from "@mui/system";
// Other components
import StyledButton from "@/components/create/_utils/forms/Button";

export default styled(StyledButton)(({ theme }) => ({
    marginTop: "50px",
    width: "200px",
    ["@media (max-width:1000px)"]: {
        alignSelf: "center",
        width: "100%",
        maxWidth: "400px",
    },
}));
