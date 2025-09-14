import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken, getUserFriends } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";
import FriendCard from "../components/FriendCard";
import { ArrowLeft } from "lucide-react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [unreadMap, setUnreadMap] = useState({});
  const navigate = useNavigate();

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        //
        const channelId = [authUser._id, targetUserId].sort().join("-");

        // you and me
        // if i start the chat => channelId: [myId, yourId]
        // if you start the chat => channelId: [yourId, myId]  => [myId,yourId]

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);

        // Listen for new messages in any 1-1 channel involving the user to update unread counts
        client.on(event => {
          if (event.type === 'message.new' && event.message?.user?.id !== authUser._id) {
            const members = event.channel?.state?.members;
            if (members) {
              const otherId = Object.keys(members).find(id => id !== authUser._id);
              if (otherId) {
                setUnreadMap(prev => ({ ...prev, [otherId]: (prev[otherId] || 0) + 1 }));
              }
            }
          }
        });
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  // Reset unread count for active friend
  useEffect(() => {
    if (targetUserId) {
      setUnreadMap(prev => {
        if (!prev[targetUserId]) return prev;
        const clone = { ...prev };
        delete clone[targetUserId];
        return clone;
      });
    }
  }, [targetUserId]);

  const filteredFriends = useMemo(() => {
    if (!search) return friends;
    const s = search.toLowerCase();
    return friends.filter(f =>
      f.fullName.toLowerCase().includes(s) ||
      f.nativeLanguage?.toLowerCase().includes(s) ||
      f.learningLanguage?.toLowerCase().includes(s)
    );
  }, [friends, search]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh] flex">
      {/* Friends list - hidden on small screens */}
      <aside className="hidden md:flex md:flex-col w-72 border-r border-base-300 overflow-y-auto">
        <div className="p-4 pb-3 sticky top-0 bg-base-100 z-10 border-b border-base-300 space-y-3">
          <h2 className="text-lg font-semibold">Chats</h2>
          <input
            type="text"
            className="input input-sm input-bordered w-full"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="p-2 space-y-1">
          {filteredFriends.map(f => (
            <FriendCard
              key={f._id}
              friend={f}
              compact
              active={f._id === targetUserId}
              unread={unreadMap[f._id] || 0}
              onSelect={(fr) => navigate(`/chat/${fr._id}`)}
            />
          ))}
          {filteredFriends.length === 0 && (
            <p className="text-xs opacity-60 p-3">No matches</p>
          )}
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header with back */}
        <div className="md:hidden flex items-center gap-2 p-3 border-b border-base-300">
          <button
            onClick={() => navigate('/friends')}
            className="btn btn-ghost btn-sm"
          >
            <ArrowLeft className="size-4" />
          </button>
          <p className="font-medium truncate flex-1">Conversation</p>
        </div>
        <div className="flex-1">
          <Chat client={chatClient}>
            <Channel channel={channel}>
              <div className="w-full relative h-full flex flex-col">
                <CallButton handleVideoCall={handleVideoCall} />
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput focus />
                </Window>
                <Thread />
              </div>
            </Channel>
          </Chat>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;