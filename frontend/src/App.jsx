import { useEffect, useState } from "react";

import Card from "./components/Card";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";
import { useGetActivityListQuery, useGetActivityByUserQuery } from "./api";
import FloatingButton from "./components/FloatingButton";
import Modal from "./components/Modal";

function App() {
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState(0);
  const { data, error, isLoading, isFetching } = useGetActivityListQuery(page);

  const [user, setUser] = useState("");
  const {
    data: userData,
    error: userError,
    isLoading: isLoadingUser
  } = useGetActivityByUserQuery(user, { skip: !user });

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      if (scrolledToBottom && !isFetching) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    };

    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isFetching]);

  if (error) {
    console.error(`error: ${JSON.stringify(error)}`);
  }

  if (userError) {
    console.error(`userError: ${JSON.stringify(userError)}`);
  }

  return (
    <div className="min-h-screen dark:bg-gray-900">
      <NavBar user={user} onSearchUser={setUser} />
      <div className="pt-16">
        {modal && <Modal modal={modal} onSetModal={setModal} />}
        {data && !userData
          ? data.map(({ id, ...props }) => <Card key={id} {...props} />)
          : null}

        {userData
          ? userData.map(({ id, ...props }) => <Card key={id} {...props} />)
          : null}

        {isLoading || isFetching || isLoadingUser ? <Spinner /> : null}

        <FloatingButton modal={modal} onSetModal={setModal} />
      </div>
    </div>
  );
}

export default App;
