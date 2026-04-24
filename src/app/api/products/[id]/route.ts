import { NextRequest, NextResponse } from "next/server";
import { ProductSchema } from "@/src/libs/schemas/product";

// Mock data storage - in production, this would be a database
let products: any[] = [];

// Helper function to get products from storage
function getProducts() {
  return products;
}

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = getProducts().find((p) => p.id === params.id);
  
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  
  return NextResponse.json({ product });
}

// PUT update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = ProductSchema.parse(body);
    
    const index = getProducts().findIndex((p) => p.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    products[index] = {
      ...products[index],
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ product: products[index] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Invalid data" },
      { status: 400 }
    );
  }
}

// DELETE product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = getProducts().findIndex((p) => p.id === params.id);
  
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  
  products.splice(index, 1);
  
  return NextResponse.json({ message: "Product deleted successfully" });
}
