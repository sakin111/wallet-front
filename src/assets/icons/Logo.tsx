import { Wallet } from "lucide-react";
import { Link } from "react-router";

export default function Logo() {
  return (
              <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-neutral-400  to-gray-500 rounded-lg">
                <Wallet className="h-6 w-6 text-white font-sans" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-sky-400  bg-clip-text text-transparent">
                Wallet
              </span>
            </Link>
          </div>

  )
}
