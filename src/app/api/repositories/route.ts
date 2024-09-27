import { list } from "@/app/adapters/repository";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const page = (searchParams.get("page") || 1) as number;

  const repositories = await list(page);

  return NextResponse.json(repositories);
};
