import Areas from "@/components/Areas";
import Timer from "@/components/Timer";
import { notion } from "@/lib/notion";

export default function Home() {
  (async () => {
    const listUsersResponse = await notion.users.list({});
    console.log(listUsersResponse);
  })();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-4">
        <Timer />
        <Areas />
      </div>
    </div>
  );
}
