export interface STUser {
  /// Steam ID of the user
  steamId: string;
  /// URL to the user's avatar
  avatar: string;
  /// User's display name
  displayName: string;
  /// List of string hashes of skins that the user has tracked
  tracking?: string[];
}
