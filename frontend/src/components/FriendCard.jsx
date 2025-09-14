import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";

const FriendCard = ({ friend, compact = false, onSelect, active = false, unread = 0 }) => {
  if (compact) {
    return (
      <button
        onClick={() => onSelect && onSelect(friend)}
        className={`flex items-center w-full gap-3 p-2 rounded-md text-left transition-colors relative group
        ${active ? 'bg-primary text-primary-content' : 'hover:bg-base-200'}`}
      >
        <div className="avatar size-10">
          <img src={friend.profilePic} alt={friend.fullName} className="rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate leading-tight flex items-center gap-2">
            <span>{friend.fullName}</span>
          </p>
          <p className={`text-xs truncate ${active ? 'opacity-80' : 'opacity-60'}`}>
            {friend.nativeLanguage} → {friend.learningLanguage}
          </p>
        </div>
        {unread > 0 && (
          <span className={`badge badge-sm absolute right-2 top-2 ${active ? 'badge-secondary' : 'badge-primary'}`}>{unread}</span>
        )}
      </button>
    );
  }

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}