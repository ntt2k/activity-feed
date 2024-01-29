import { useState } from "react";

export default function SearchBar({ user, onSubmit }) {
  const [userQuery, setUserQuery] = useState(user);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(userQuery);
  };

  return (
    <form className="mr-4 min-w-full" onSubmit={handleSubmit}>
      <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="p-3.8 block w-full rounded-lg border border-gray-300 bg-gray-50
                      ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500
                      dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                      dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search User"
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute bottom-1 end-2.5 rounded-lg bg-blue-700
                      px-2.5 py-1 text-sm font-medium text-white
                      hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
                      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
  );
}
