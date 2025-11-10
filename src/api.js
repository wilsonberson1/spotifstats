
export const SPOTIFY_CLIENT_ID = "1219b0c01ed84863a059d8436e16d6ad"; // substitua
export function buildAuthorizeURL() {
  const redirectUri = window.location.origin + "/";
  const scopes = [
    "user-read-email",
    "user-read-private",
    "user-read-recently-played",
    "user-top-read"
  ];
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "token",
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    show_dialog: "true"
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export function getAccessTokenFromHash() {
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");
  const expiresIn = params.get("expires_in");
  return token ? { token, expiresIn: Number(expiresIn || 0) } : null;
}

export async function spotifyGet(token, path, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = `https://api.spotify.com/v1${path}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) throw new Error(`Spotify API ${res.status}`);
  return res.json();
}
