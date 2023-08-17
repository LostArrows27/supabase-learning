import { pipeline, env } from "@xenova/transformers";
import { NextResponse } from "next/server";
export function GET(request) {
  env.allowLocalModels = false;
  return NextResponse.json({ message: "Hello World" });
}
