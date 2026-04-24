import { NextRequest, NextResponse } from "next/server";
import { CategorySchema } from "@/src/libs/schemas/categories";

// Mock data storage - in production, this would be a database
let categories: any[] = [];

// GET all categories
export async function GET() {
  return NextResponse.json({ categories });
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CategorySchema.parse(body);
    
    const newCategory = {
      id: Date.now().toString(),
      ...validatedData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    categories.push(newCategory);
    
    return NextResponse.json({ category: newCategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Invalid data" },
      { status: 400 }
    );
  }
}
