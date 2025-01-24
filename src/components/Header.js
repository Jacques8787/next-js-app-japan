import Link from "next/link";
import BrainIcon from "./icons/BrainIcon";
import SettingsIcon from "./icons/SettingsIcon";
export default function Header() {
  return (
    <div className="w-full border-b border-gray-300 py-6">
      <div className="flex justify-between items-center px-2">
        <Link
          href={`/`}
          className="flex items-center !text-black !hover:text-black !hover:no-underline !no-underline"
        >
          <BrainIcon className="w-8 " />
          <span className="ml-2 font-bold text-xl">BRAIN GAME</span>
        </Link>

        <Link href={`/settings`} className="hover:rotate-90 transition-all">
          <SettingsIcon className="w-8" />
        </Link>
      </div>
    </div>
  );
}