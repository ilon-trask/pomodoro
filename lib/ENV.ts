import { z } from "zod";

const schema = z.object({
    DATABASE_ID: z.string(),
    NOTION_TOKEN: z.string(),
});

const ENV = schema.parse(process.env);

export { ENV };