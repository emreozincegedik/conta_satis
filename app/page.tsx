import itemsJson from "@/utils/items.json";
import { Items } from "@/components";
import { Landing } from "@/components/Landing";

export default function Home() {
  return (
    <>
      <Landing />
      <Items itemsJson={itemsJson} />
    </>
  );
}
