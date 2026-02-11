import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Path to our JSON "database"
const dataFilePath = path.join(process.cwd(), 'data.json');

export async function GET() {
    try {
        // Check if file exists
        try {
            await fs.access(dataFilePath);
        } catch (e) {
            // File doesn't exist, return 404 or null to signal client to use defaults
            return NextResponse.json(null);
        }

        const fileContents = await fs.readFile(dataFilePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error reading data.json:", error);
        return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Basic validation could go here

        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error writing data.json:", error);
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
    }
}
