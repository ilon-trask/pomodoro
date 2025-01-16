"use server";
import { notion } from "../notion";
import { ENV } from "../ENV";
import { revalidatePath } from "next/cache";

export async function createPomodoro(workTime: number) {
    await notion.pages.create({
        parent: { database_id: ENV.DATABASE_ID },
        properties: {
            workTime: {
                type: "number",
                number: workTime,
            },
        },
        children: [],
    });
    revalidatePath('/');
}