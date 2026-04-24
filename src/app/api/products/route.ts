import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "@/src/libs/schemas/product";

// Mock data storage - in production, this would be a database
let products: any[] = [];

// GET all products
export async function GET() {
  return NextResponse.json({ products });
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);
    
    const newProduct = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    products.push(newProduct);
    
    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Invalid data" },
      { status: 400 }
    );
  }
}
