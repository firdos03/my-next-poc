import { Box } from "@mui/material";
import SignUpPage from "./signup/page";

export default function Home() {

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <SignUpPage />
      </Box>
    </>
  );
}
