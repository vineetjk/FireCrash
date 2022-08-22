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


function crash1(){
  const test: any = {};
  console.log(test.should.crash);
}
const a=10;
function crash2(){
  let b = 10/0;
}
export default function App() {
  useEffect(() => {
    crashlytics().log('App mounted.');
  }, []);

  return (
    <View >
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
      <Button title="Crash 1 (Force crash by crashlytics)" onPress={() => crashlytics().crash()} />
      <Button title="Crash 2 (undefined crash)" onPress={() => crash1()} />
      <Button title="Crash 3 (div by 0)" onPress={() => crash2()} />
      <Button title="Crash 4 (reasigning value to const)" onPress={() => a=0} />

    </View>
  );
}