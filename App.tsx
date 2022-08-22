import React, { useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

async function onSignIn(user:any) {
  crashlytics().log('User signed in.');
  await Promise.all([
    crashlytics().setUserId(user.uid),
    crashlytics().setAttribute('credits', String(user.credits)),
    crashlytics().setAttributes({
      role: 'admin',
      followers: '13',
      email: user.email,
      username: user.username,
    }),
  ]);
}

const styles = StyleSheet.create({
  container: {alignItems: 'center',
  justifyContent: 'center'},

});
function crash1(){
  const test: any = {};
  console.log(test.should.crash);
}

export default function App() {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Sign In"
        onPress={() =>
          onSignIn({
            uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
            username: 'Laxmi Nagaral',
            email: 'lakshmi.nagaral@nagra.com',
            credits: 42,
          })
        }
      />
      <Button title="Test Crash" onPress={() => crashlytics().crash()} />
      <Button title="Crash 2 (Div by 0)" onPress={() => crash1()} />
    </View>
  );
}