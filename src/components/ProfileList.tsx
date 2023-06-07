import React from "react";
import { PROFIILE_PARAMS } from "../utils/profile";
import ProfilePreview from "./ProfilePreview";
import { Button } from "@mui/material";

const ProfileList = ({ profiles }) => {
  return (
    <div>
      <Button variant="contained">Hello</Button>
      <div
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {PROFIILE_PARAMS.map(({ columnTitle }, i) => (
          <h3 key={i} style={{ width: 200, textAlign: "center" }}>
            {columnTitle}
          </h3>
        ))}
      </div>
      {profiles.map((prof, index) => (
        <ProfilePreview profile={prof} key={index} />
      ))}
    </div>
  );
};

export default ProfileList;
