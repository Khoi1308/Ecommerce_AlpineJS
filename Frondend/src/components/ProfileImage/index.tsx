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
  const initials = `${first_name[0]?.toUpperCase() ?? ""}${last_name[0]?.toUpperCase() ?? ""}`;

  // Generate a dynamic bg color
  const backgroundColor = stringToColor(`${last_name}${first_name}`);

  return (
    <div
      className="flex items-center justify-center rounded-full w-[80px] h-[80px] font-[20px] font-bold shadow-lg"
      style={{ backgroundColor }}
    >
      {initials}
    </div>
  );
};
