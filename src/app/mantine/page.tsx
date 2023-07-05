import { ColorSchemeToggle } from "@/client/components/ColorSchemeToggle/ColorSchemeToggle";
import { Welcome } from "@/client/components/Welcome/Welcome";

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
