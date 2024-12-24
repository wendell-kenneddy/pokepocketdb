import { FiPower } from "react-icons/fi";

export function LogoutButton() {
  return (
    <a href="/auth/logout">
      <FiPower size={14} className="text-red-500" />
    </a>
  );
}
