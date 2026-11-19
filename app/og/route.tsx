import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #1e1033, #6b3fa0)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 40, color: "#ffd166" }}>Portfolio</div>
        <div style={{ fontSize: 92, fontWeight: 700, marginTop: 16 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 44, marginTop: 24 }}>{site.role}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}