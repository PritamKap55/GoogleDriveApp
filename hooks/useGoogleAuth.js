import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth(onSuccess) {
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: '417059671592-8hpg94oqiohctu16phppadvgpcl7b2rj.apps.googleusercontent.com',
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive.file',
      ],
      redirectUri,
    },
    {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const access_token = response.authentication?.access_token;

      if (access_token && onSuccess) {
        onSuccess(access_token);
      }
    }
  }, [response]);

  return { promptAsync, request };
}


