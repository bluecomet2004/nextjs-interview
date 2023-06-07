import React from "react";
import { PROFIILE_PARAMS } from "../utils/profile";

export default function ProfilePreview({ profile }) {
    return (
        <div
            style={{
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            {PROFIILE_PARAMS.map(({ key }, i) => (
                <span key={i} style={{ width: 200 }}>
                    {profile[key]}
                </span>
            ))}
        </div>
    );
}