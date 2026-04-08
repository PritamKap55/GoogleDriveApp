import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth(onSuccess) {

  const redirectUri = "https://auth.expo.io/@pritamkap123/GoogleDriveApp";

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '417059671592-8hpg94oqiohctu16phppadvgpcl7b2rj.apps.googleusercontent.com',
    redirectUri,

    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
    ],
  });

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