import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateRangePicker = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      if (selectedDate > endDate) {
        alert("Start date cannot be after end date");
      } else {
        if (selectedDate < (new Date())) return alert("Date cannot be in the past");
        setStartDate(selectedDate);
      }
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      if (selectedDate < startDate) {
        alert("End date cannot be before start date");
      } else {
        setEndDate(selectedDate);
      }
    }
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', width: '100%', height: 60, marginTop: 10 }}>
    <View style={{ display: 'flex', justifyContent:'space-between', width: '45%', height: '100%', }}>
            <Text style={{ fontWeight: 'bold' }}>Check-in</Text>
            <Text style={{ borderRadius: 100, paddingVertical: 5, paddingHorizontal: 20, borderWidth: 1, borderColor: '#000000' }} onPress={() => setShowStartPicker(true)}>{startDate.toDateString()}</Text>
        </View>
          {showStartPicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onStartDateChange}
            />
          )}
          
          <View style={{ display: 'flex', justifyContent:'space-between', width: '45%', height: '100%' }}>
            <Text style={{ fontWeight: 'bold' }}>Check-out</Text>
            <Text style={{ borderRadius: 100, paddingVertical: 5, paddingHorizontal: 20, borderWidth: 1, borderColor: '#000000' }} onPress={() => setShowEndPicker(true)}>{endDate.toDateString()}</Text>
        </View>
          {showEndPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onEndDateChange}
            />
          )}
        </View>
  );
};

export default DateRangePicker;
