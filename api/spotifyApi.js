import { AuthSession } from "expo";
import * as SecureStore from "expo-secure-store";

const SPOTIFY_CLIENT_ID = "a8244670f47e4ea3a0de59b57b40826d";
const SECURE_STORE_ACCESS_TOKEN_KEY = "spotifyAccessToken";
const SECURE_STORE_EXPIRES_IN_KEY = "spotifyExpiresIn";

let token;
let expireTime;

export const logOutSpotify = () => {
  SecureStore.deleteItemAsync(SECURE_STORE_EXPIRES_IN_KEY);
  SecureStore.deleteItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY);
};

export const isAuthenticated = async () => {
  const expire = await SecureStore.getItemAsync(SECURE_STORE_EXPIRES_IN_KEY);
  const now = new Date();
  expireTime = new Date(expire);
  if (expireTime > now) {
    const accessToken = await SecureStore.getItemAsync(
      SECURE_STORE_ACCESS_TOKEN_KEY
    );
    token = accessToken;
    return true;
  }
  return false;
};

export const authorize = () => {
  const redirectUrl = AuthSession.getRedirectUrl();
  console.log(redirectUrl);
  return AuthSession.startAsync({
    authUrl:
      `https://accounts.spotify.com/authorize?response_type=token` +
      `&client_id=${SPOTIFY_CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&scope=user-follow-read`
  }).then(result => this.handleAuthResult(result));
};

handleAuthResult = ({ type, params }) => {
  if (type !== "success") {
    return false;
  }
  const { access_token, expires_in } = params;
  SecureStore.setItemAsync(SECURE_STORE_ACCESS_TOKEN_KEY, access_token).then(
    () => {
      token = access_token;
    }
  );
  const date = new Date(Date.now() + expires_in * 1000);
  SecureStore.setItemAsync(SECURE_STORE_EXPIRES_IN_KEY, date.toString());
  return true;
};

export const getUserArtistsPromise = () => {
  return fetch("https://api.spotify.com/v1/me/following?type=artist", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(result => {
      if (result.error && [401, 403].includes(result.error.status)) {
        throw new Error("Authorization error");
      }

      const artistas = result.artists.items.map(
        ({ id, name, images, followers: { total: followers } }) => {
          return {
            id,
            name,
            followers,
            image: images[0].url
          };
        }
      );
      return artistas;
    })
    .catch(() => {
      return [];
    });
};


export const fecthArtistInfo = (id) => {
  return fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=US`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then( result => result.json())
  .then(res => {
    return res.tracks.map(
      ({
        album: { name: album_name, images, release_date, total_tracks, uri },
        name,
        id
      }) => {
        return {
          id,
          name,
          image: images[0].url,
          release_date,
          total_tracks,
          uri,
          album_name
        };
      }
    );
  })
}

export const UserInfo = () => {
  return fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(({ display_name, images, uri, followers: { total: followers } }) => {
      return {
        display_name,
        followers,
        uri,
        image: images.length ? images[0].url : ''
      };
    });
};