import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import useGoogleAuth from '../hooks/useGoogleAuth';

export default function ModalScreen() {

  const createSheet = async (token: string) => {
    try {
      const res = await fetch(
        'https://sheets.googleapis.com/v4/spreadsheets',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              title: 'My App Sheet',
            },
          }),
        }
      );

      const data = await res.json();
      console.log('Sheet created:', data);
    } catch (err) {
      console.error(err);
    }
  };

  const { promptAsync } = useGoogleAuth(createSheet);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login with Google</ThemedText>

      <Pressable onPress={() => promptAsync()}>
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
