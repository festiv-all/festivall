import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { productIds } = await req.json();

    // Validate input
    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: "Invalid product IDs" },
        { status: 400 }
      );
    }

    // Check available quantities
    const { data, error } = await supabase.rpc("products_stock_check", {
      p_product_ids: productIds,
    });

    if (error) {
      console.error("Error checking quantities:", error);
      return NextResponse.json(
        { error: "Failed to check quantities" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
