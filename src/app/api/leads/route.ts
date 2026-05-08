import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const lead = await request.json();

  // Point d’extension volontairement isolé pour brancher ensuite :
  // - base cloud / cluster Node.js
  // - webhook marketing automation
  // - CRM
  // - analytics événementiel
  return NextResponse.json({ ok: true, lead });
}
