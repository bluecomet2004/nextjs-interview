import { generateResult } from "@/store/results.action";
import { Button, Card, Divider, Slide, TextField, CircularProgress } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Swal from "sweetalert2";

export default function Home() {
  const [count, setCount] = useState(10);
  const [checked, setChecked] = useState(false);
  const dispatch: ThunkDispatch<{},{},any> = useDispatch();
  const router = useRouter();

  const handleCheck = () => {
    if(!count || count > 200) {
      Swal.fire({
        icon: "error",
        text: "Please enter a valid number."
      });
    } else {
      setChecked(true);

      dispatch(generateResult(count))
      .then(() => router.push('/profiles'))
      .catch((error: any) => {
        Swal.fire({
          title: "Failed",
          icon: "error",
          text: "Cannot load the data."
        });

        setChecked(false);
        console.log(error);
      });
    }
  }

  return (
    <main className="flex justify-center">
      <Head>
        <title>Profile List</title>
      </Head>

      <Slide direction="up" in={true}>
        <Card className="flex flex-col items-center mt-72 p-12">
          <h1 className="text-3xl m-4">Select the number of profiles</h1>
          <Divider />
          <TextField
            className="m-8"
            type="number"
            variant="outlined"
            value={count}
            onChange={({target:{value}}: any) => setCount(value)}
            onKeyDown={({keyCode}) => keyCode===13 && handleCheck()}
          />

          <Button
            color="primary"
            variant="contained"
            className="flex items-center text-lg w-48 p-3 mt-4 bg-green-500"
            disabled={checked}
            onClick={handleCheck}
          >
            {
              checked ? <CircularProgress size={24} /> : 'Generate'
            }
          </Button>
        </Card>
      </Slide>
    </main>
  )
}