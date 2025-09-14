import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import { useEffect, useState, useMemo } from "react";

// Responsive friends page: grid/list of friends; clicking navigates to /chat/:id
// On mobile, this page is separate. On desktop when in chat we will embed a mini list there.

const FriendsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const filtered = useMemo(() => {
    if (!search) return friends;
    const s = search.toLowerCase();
    return friends.filter(f =>
      f.fullName.toLowerCase().includes(s) ||
      f.nativeLanguage?.toLowerCase().includes(s) ||
      f.learningLanguage?.toLowerCase().includes(s)
    );
  }, [friends, search]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Friends</h1>
        <Link to="/" className="btn btn-sm btn-outline">Home</Link>
      </div>

      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input input-bordered w-full sm:max-w-xs"
        />
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : friends.length === 0 ? (
        <NoFriendsFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(friend => (
            <button
              key={friend._id}
              className="text-left"
              onClick={() => navigate(`/chat/${friend._id}`)}
            >
              <FriendCard friend={friend} />
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center opacity-70 py-8">
              No matches found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
