import itemsJson from "@/utils/items.json";
import { Items } from "@/components";

export default function Home() {
  return <Items itemsJson={itemsJson} />;
}
