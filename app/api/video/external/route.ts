import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('http://localhost:3968'); // Replace with your server URL
        const data = await response.text();

        return NextResponse.json({
            message: 'This Worked',
            data: data,
            success: true,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: err, success: false });
    }
}
