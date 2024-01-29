import DarkModeSwitch from "./DarkModeSwitch";
import SearchBar from "./SearchBar";

export default function NavBar({ user, onSearchUser }) {
  return (
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3">
        <a
          href="https://vitejs.dev/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/vite.svg" className="h-8" alt="Vite Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-violet-600 dark:text-white">
            Activity Feed
          </span>
        </a>

        <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
          <SearchBar user={user} onSubmit={onSearchUser} />

          <DarkModeSwitch />
        </div>
      </div>
    </nav>
  );
}
