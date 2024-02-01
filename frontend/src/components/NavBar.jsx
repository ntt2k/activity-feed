import DarkModeButton from "./DarkModeButton";
import SearchBar from "./SearchBar";

export default function NavBar({ user, onSearchUser }) {
  return (
    <nav className="fixed top-0 z-20 w-full bg-white border-b border-gray-200 start-0 dark:border-gray-600 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between p-3 mx-auto max-w-screen-xl">
        <a
          href="https://vitejs.dev/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/vite.svg" className="h-8" alt="Vite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-violet-600 dark:text-white">
            Activity Feed
          </span>
        </a>

        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <SearchBar user={user} onSubmit={onSearchUser} />

          <DarkModeButton />
        </div>
      </div>
    </nav>
  );
}
