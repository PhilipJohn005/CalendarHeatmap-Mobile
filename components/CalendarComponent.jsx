import React from 'react';
import { View } from 'react-native';
import Svg,{Rect,Text,G} from 'react-native-svg';

const CalendarComponent = ({ width, year, month, dateValues }) => {
  const getDaysInMonth = (month) => new Date(year, month + 1, 0).getDate();
  const highestValue = (dateValues || []).reduce((a, b) => Math.max(a, b.count), 0);

  const getIntensity = (activityCount) => {
    return highestValue !== 0 ? activityCount / highestValue : 0;
  };

  const getColorBasedOnIntensity = (intensity) => {
    const colorCodes = ['#FFEEEE', '#FFCCCC', '#FFAAAA', '#FF8888', '#FF6666', '#FF4444'];
    const colorIndex = Math.min(Math.floor(intensity * colorCodes.length), colorCodes.length - 1);
    return colorCodes[colorIndex];
  };

  const rectSize =width/14;
  const textSize =rectSize*0.8;
  const gap =rectSize/5;
  const viewBoxWidth=(rectSize+gap)*7;
  const viewBoxHeight=(rectSize+gap)*6+30;
  const cornerRadius=rectSize*0.1;
  const calculatedHeight=(width*viewBoxHeight)/viewBoxWidth;

  let firstDay = new Date(year,month,1).getDay();
  const calendarGrid = Array.from({length:getDaysInMonth(month)},(_,i)=>{
    const date = new Date(year,month,i+1);
    return date.toISOString().slice(0,10);
  });

  return (
    <View style={{width,maxWidth:'100%'}}>
      <Svg width="100%" height={calculatedHeight} viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
        {calendarGrid.map((day,index)=>{
          const activityCount=(dateValues).find((item) => item.date === day)?.count || 0;
          const intensity=getIntensity(activityCount);
          const color=getColorBasedOnIntensity(intensity);
          const x=((index+firstDay)%7)*(rectSize+gap);
          const y=Math.floor((index+firstDay)/7)*(rectSize+gap);

          return (
            <G key={day}>
              <Rect width={rectSize} height={rectSize} x={x} y={y} rx={cornerRadius} ry={cornerRadius} fill={activityCount === 0 ? '#ffffff50' : color}/>
            </G>
          );
        })}
        <Text x={viewBoxWidth/2} y={viewBoxHeight-rectSize-20} textAnchor="middle" fontSize={textSize} fill="white">
          {new Date(year, month).toLocaleString('default', { month: 'long' })}
        </Text>
        <Text x={viewBoxWidth/2} y={viewBoxHeight-20} textAnchor="middle" fontSize={textSize} fill="white">
          {year}
        </Text>
      </Svg>
    </View>
  );
};

export default CalendarComponent;
