import Areas from "@/components/Areas";
import Timer from "@/components/Timer";
import { getPomodoros } from "@/lib/pomodoro/get";

export default async function Home() {
  // const listPagesResponse = await notion.databases.update({
  //   properties: {
  //     workTime: {
  //       type: "number",
  //       number: {},
  //     },
  //     createdAt: {
  //       type: "created_time",
  //       created_time: {},
  //     },
  //   },
  //   database_id: ENV.DATABASE_ID,
  // });

  const listPomodoros = await getPomodoros();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-4">
        <Timer listPomodoros={listPomodoros} />
        {/* <Areas /> */}
      </div>
    </div>
  );
}
