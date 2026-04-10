import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, StyleSheet } from 'react-native';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState } from 'react';

GoogleSignin.configure({
  webClientId: '417059671592-8hpg94oqiohctu16phppadvgpcl7b2rj.apps.googleusercontent.com', // from Google Cloud Console
  offlineAccess: true,
});

export default function ModalScreen() {
  const [error, setError] = useState<string>();
  const signIn = async () => {
  try {
    alert("1");
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    // ✅ Correct access
    const user = response.data?.user;
alert(user?.name)


  } catch (error) {
    alert(error)
    console.log(error);
  }
};



  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{error}</ThemedText>

      <Pressable onPress={() => signIn()}>
        <ThemedText type="link">Sign in & Create Sheet</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
