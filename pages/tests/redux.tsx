// Tools
import { useState } from "react";
// Types
import type { FunctionComponent, ChangeEvent } from "react";
// Material UI Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
// Other components
import Head from "next/head";
// Redux
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { addItem, changeItem, deleteItem } from "@/redux/slices/landmarks";

const Tests: FunctionComponent = (props) => {
    const dispatch = useAppDispatch();
    const landmarks = useAppSelector((state) => state.landmarks.list);
    const [newLandmarkTitle, _setNewLandmarkTitle] = useState<string>("dasdasdasd");
    const [newLandmarkDescription, _setNewLandmarkDescription] = useState<string>("jebac gorzen");

    const addLandmark = () =>
        dispatch(
            addItem({
                title: newLandmarkTitle,
                description: newLandmarkDescription,
            })
        );

    const updateNewTitle = (e: ChangeEvent<HTMLInputElement>) => _setNewLandmarkTitle(e.target.value);
    const updateNewDescription = (e: ChangeEvent<HTMLInputElement>) => _setNewLandmarkDescription(e.target.value);

    const updateTitle = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(
            changeItem({
                itemToUpdate: landmarks[index],
                valueToUpdate: "title",
                newValue: e.target.value,
            })
        );
    };
    const updateDescription = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        dispatch(
            changeItem({
                itemToUpdate: landmarks[index],
                valueToUpdate: "description",
                newValue: e.target.value,
            })
        );
    };

    const deleteLandmark = (index: number) => {
        dispatch(
            deleteItem({
                itemToDelete: landmarks[index],
            })
        );
    };

    return (
        <>
            <Head>
                <title>Tests- redux</title>
            </Head>
            <Container sx={{ mt: "150px", py: 2, color: "white" }}>
                <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <Typography variant="h2">TESTS</Typography>
                    <TextField
                        label="New landmarks title" //
                        value={newLandmarkTitle}
                        onChange={updateNewTitle}
                        size="small"
                    ></TextField>
                    <TextField
                        label="New landmarks title" //
                        value={newLandmarkDescription}
                        onChange={updateNewDescription}
                        size="small"
                    ></TextField>

                    <Button onClick={addLandmark} variant="outlined">
                        Add landmark
                    </Button>
                </Container>

                <Divider sx={{ my: 2 }} />
                {JSON.stringify(landmarks)}
                <Divider sx={{ mt: 2 }} />
                {landmarks.map((item, index) => {
                    return (
                        <Box key={index}>
                            <h1>{item.id}</h1>
                            <TextField
                                label="title"
                                value={item.title} //
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateTitle(e, index)}
                                sx={{ mr: 1 }}
                            ></TextField>
                            <TextField
                                label="description"
                                value={item.description} //
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateDescription(e, index)}
                                sx={{ mr: 1 }}
                            ></TextField>
                            <Button color="error" variant="contained" onClick={() => deleteLandmark(index)}>
                                DELETE
                            </Button>
                            <Divider sx={{ my: 2 }} />
                        </Box>
                    );
                })}
            </Container>
        </>
    );
};

export default Tests;
