import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Log inquiry in server console for visibility
    console.log("New Corporate Inquiry Received:", data);
    
    // In a production app, we would save to database (e.g. Firestore) or send an email.
    return NextResponse.json({
      success: true,
      message: "Thank you for your inquiry. Our engineering team will review your request and contact you within 24 hours.",
      inquiryId: `SS-${Math.floor(100000 + Math.random() * 900000)}`,
    });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process inquiry. Please try again." },
      { status: 400 }
    );
  }
}
