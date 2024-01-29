import { format } from "date-fns";
import LikeButton from "./LikeButton";

const DATE_FORMAT = "MMM do yyyy, h:mm a";

export default function Card({
  username,
  profileImage,
  postContent,
  likeCount,
  timeStamp
}) {
  const formattedDate = format(timeStamp, DATE_FORMAT);

  return (
    <div className="m-12 flex justify-center">
      <a
        href="#"
        className="flex flex-col items-center rounded-lg border
                  border-gray-200 bg-white shadow hover:bg-gray-100
                  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
                  md:max-w-xl md:flex-row"
      >
        {profileImage && (
          <img
            className="m-4 h-44 w-44 rounded-full object-cover"
            src={profileImage}
            alt=""
          />
        )}
        {!profileImage && (
          <svg
            className="m-4 h-72 w-72 text-gray-200 dark:text-gray-700 me-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1
                    0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987
                    0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
            />
          </svg>
        )}
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            {username}
          </h5>
          <p className="text-xs text-gray-700  dark:text-gray-400">
            {formattedDate}
          </p>
          <p className="my-8 font-normal text-gray-700 dark:text-gray-400 md:mr-4">
            {postContent}
          </p>

          <div className="mr-4 flex flex-row-reverse">
            <p className="py-2 pl-0 pr-2 text-sm text-rose-500  dark:text-gray-400">
              {likeCount}
            </p>
            <LikeButton />
          </div>
        </div>
      </a>
    </div>
  );
}
