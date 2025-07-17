import { stringToColor } from "./utils";
import "./profileImage.css";

interface ProfileImage {
  full_name: string;
}
export const ProfileImage = ({ full_name }: ProfileImage) => {
  const regex = /^(\S+).*?(\S+)$/;
  const segment_name = full_name.trim().match(regex);
  const first_name = segment_name?.[2] ?? "";
  const last_name = segment_name?.[1] ?? "";
  const initials = `${first_name?.toUpperCase() ?? ""}${last_name?.toUpperCase() ?? ""}`;

  // Generate a dynamic bg color
  const backgroundColor = stringToColor(`${last_name}${first_name}`);

  return (
    <div className="profile-image" style={{ backgroundColor }}>
      {initials}
    </div>
  );
};
