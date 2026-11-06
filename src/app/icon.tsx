import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default async function Icon() {
  const portrait = await readFile(join(process.cwd(), "public/images/biswojit_profile.png"));
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff", alignItems: "center", justifyContent: "center" }}>
      {/* ImageResponse uses a native image element to render the existing portrait. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${portrait.toString("base64")}`} alt="" width={192} height={192} style={{ objectFit: "contain" }} />
    </div>,
    size,
  );
}
