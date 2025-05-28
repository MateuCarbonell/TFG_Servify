// /app/api/servicios/[id]/reviews/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(_: NextRequest, context: any) {
  const id = context.params.id;

  const reviews = await prisma.review.findMany({
    where: { serviceId: id },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
  });

  return NextResponse.json({ reviews });
}

