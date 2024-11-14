import {data} from '@/components/dateAPI'
import CalendarComponent from '@/components/CalendarComponent'
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
const index=()=>{
  const [dates,setDates]=useState([]);

  useEffect(()=>{
    setDates(data);
  },[]);

  return (
    <View style={styles.main}>
      <CalendarComponent width={300} year={2024} month={10} dateValues={dates} />
    </View>
  );
};

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'#000000',
    justifyContent:'center',
    alignItems:'center',
  },
});

export default index;
