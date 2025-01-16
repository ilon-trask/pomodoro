'use server'

import { ENV } from "../ENV";
import { notion } from "../notion";

async function getPomodoros() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const date = currentDate.getDate().toString().padStart(2, "0");

    const listPomodoros = await notion.databases.query({
        database_id: ENV.DATABASE_ID,
        filter: {
            property: "createdAt",
            created_time: {
                equals: `${year}-${month}-${date}`,
            },
        },
    });

    return listPomodoros.results.map((el) => {
        //@ts-ignore
        if (!el.properties) throw new Error("properties of pomodoros were not found");

        return ({
            id: el.id,
            //@ts-ignore
            createdAt: el.properties.createdAt.created_time,
            //@ts-ignore
            workTime: el.properties.workTime.number,
        })
    })
}

export { getPomodoros };