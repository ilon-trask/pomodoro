import { Client } from "@notionhq/client";
import { ENV } from "./ENV";

const notion = new Client({
    auth: ENV.NOTION_TOKEN,
})

export { notion };