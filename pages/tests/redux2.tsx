// Type
import type { FunctionComponent, ChangeEvent } from "react";
// Material UI Components
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { actions, helpers } from "@/redux/slices/tests";

const Redux2: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { addItem } = helpers;
    const { updateMsg } = actions;

    const { msg, list } = useAppSelector((state) => state.tests);

    const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(updateMsg(e.target.value));

    const addItemToList = () => addItem({});

    return (
        <Container sx={{ mt: "150px", py: 2, color: "white" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h2">jebac reduxa</Typography>
                <Button variant="contained" onClick={addItemToList}>
                    DODAJ
                </Button>
            </Box>

            <Divider sx={{ my: 2 }}></Divider>

            <TextField
                value={msg} //
                onChange={inputOnChange}
            ></TextField>

            <Typography variant="h1">{msg}</Typography>

            <Divider sx={{ my: 2 }}></Divider>

            <Box>
                {list.map((item, index) => {
                    return (
                        <Box key={index}>
                            <span>{JSON.stringify({ item })}</span>
                            <br />
                            <TextField
                                value={item.data.description} //
                                onChange={(e: ChangeEvent<HTMLInputElement>) => item.changeProperty("description", e.target.value)}
                            ></TextField>
                            {(() => {
                                if (index !== list.length - 1) {
                                    return (
                                        <Button onClick={() => item.swapWith(list[index + 1])} variant="contained" color="error">
                                            SWAP WITH BOTTOM
                                        </Button>
                                    );
                                }
                            })()}
                            <Button
                                onClick={() =>
                                    item.replace({
                                        title: "KOCHAM",
                                        description: "REDUXA",
                                        picture: null,
                                        type: "ANTIQUE",
                                        tags: ["jebac", "gorzen"],
                                        pictureURL: "",
                                    })
                                }
                            >
                                REPLACE
                            </Button>
                            <Button onClick={() => item.remove()} variant="contained" color="error">
                                DELETE
                            </Button>
                            <Divider sx={{ my: 2 }}></Divider>
                        </Box>
                    );
                })}
            </Box>
        </Container>
    );
};

export default Redux2;
