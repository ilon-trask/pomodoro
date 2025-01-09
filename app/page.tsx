import Areas from "@/components/Areas";
import Timer from "@/components/Timer";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex gap-4">
        <Timer />
        <Areas />
      </div>
    </div>
  );
}
