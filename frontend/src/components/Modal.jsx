import { useState } from "react";

import { useAddActivityMutation } from "./../api";

export default function Modal({ modal, onSetModal }) {
  const [user, setUser] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const [addActivity, { isLoading, isSuccess }] = useAddActivityMutation();

  const validateForm = () => {
    const errors = {};
    if (user.length == 200) {
      errors.user = "Username is required.";
    }
    if (content.length == 0 || content.length > 200) {
      errors.content = "Content is required with max length of 200 characters.";
    }
    setErrors(errors);

    // check if form has any error
    return JSON.stringify(errors) === "{}";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addActivity({
        username: user,
        profileImage: profileImg,
        postContent: content
      });
    }
  };

  if (isSuccess) {
    onSetModal(!modal);
  }

  return (
    <>
      <div
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full
                    w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Activity
              </h3>
              <button
                type="button"
                onClick={() => onSetModal(!modal)}
                className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent
                            text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600
                          dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500
                              dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50
                              p-2.5 text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white
                              dark:placeholder-gray-400"
                    placeholder="Type username"
                    required="username is required"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  />
                </div>
                {errors.user && (
                  <div className="flex">
                    <p className="text-xs text-red-500  dark:text-gray-400">
                      {errors.user}
                    </p>
                  </div>
                )}

                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Profile image URL
                  </label>
                  <input
                    type="text"
                    name="profileImage"
                    id="profileImage"
                    className="bg-gray-50 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500
                                dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 p-2.5
                                text-sm text-gray-900 dark:border-gray-500 dark:bg-gray-600 dark:text-white
                                dark:placeholder-gray-400"
                    placeholder="Type profile image URL"
                    value={profileImg}
                    onChange={(e) => setProfileImg(e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Activity Post Content
                  </label>
                  <textarea
                    id="postContent"
                    rows="4"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5
                                text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500
                                dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400
                                dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Write activity post content here"
                    required="content is required"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="flex flex-row-reverse mt-1 mr-1">
                    <p className="text-xs text-gray-700  dark:text-gray-400">
                      {content.length}/200
                    </p>
                  </div>
                  {errors.content && (
                    <div className="flex">
                      <p className="text-xs text-red-500  dark:text-gray-400">
                        {errors.content}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center
                            text-sm font-medium text-white hover:bg-blue-800 focus:outline-none
                            focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                            dark:focus:ring-blue-800"
              >
                <svg
                  className="-ms-1 me-1 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add new activity
              </button>
            </form>

            {isLoading && (
              <div
                role="status"
                className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0
                    50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100
                    50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987
                    91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50
                    9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227
                    92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422
                    4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345
                    1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717
                    44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928
                    12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121
                    86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-gray-900/90"></div>
    </>
  );
}
