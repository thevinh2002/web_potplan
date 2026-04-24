import { NextRequest, NextResponse } from "next/server";
import { CategorySchema } from "@/src/libs/schemas/categories";

// Mock data storage - in production, this would be a database
let categories: any[] = [];

// Helper function to get categories from storage
function getCategories() {
  return categories;
}

// GET single category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = getCategories().find((c) => c.id === params.id);
  
  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  
  return NextResponse.json({ category });
}

// PUT update category
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = CategorySchema.parse(body);
    
    const index = getCategories().findIndex((c) => c.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    
    categories[index] = {
      ...categories[index],
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ category: categories[index] });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Invalid data" },
      { status: 400 }
    );
  }
}

// DELETE category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const index = getCategories().findIndex((c) => c.id === params.id);
  
  if (index === -1) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  
  categories.splice(index, 1);
  
  return NextResponse.json({ message: "Category deleted successfully" });
}
