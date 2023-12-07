import React, { Fragment } from 'react';
import { View, Text } from 'react-native';

export function Home(){
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Trabalhado este mês:</Text>
      </View>

      <View>
        <Text>Teste</Text>
      </View>
    </>
  )
}