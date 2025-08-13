export interface CreateAvatarDto {
  img_url: string;
  is_default: boolean;
}

export interface UpdateAvatarDto {
  is_default?: boolean;
}
