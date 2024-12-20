import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const App = () => {
  const [birthday, setBirthday] = useState('');
  const [countdown, setCountdown] = useState('');

  // Function to calculate the countdown
  const calculateCountdown = () => {
    if (!birthday) return ''; // If birthday is not set, return empty

    const now = new Date(); // Current date and time
    const birthdayDate = new Date(birthday); // User's entered birthday
    birthdayDate.setFullYear(now.getFullYear()); // Set the year of birthday to the current year

    // If the birthday has already passed this year, set it to next year
    if (birthdayDate < now) {
      birthdayDate.setFullYear(now.getFullYear() + 1);
    }

    const timeDiff = birthdayDate - now; // Time difference in milliseconds
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert time to days
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Convert time to hours
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Convert time to minutes

    setCountdown(`${days} Days, ${hours} Hours, ${minutes} Minutes`); // Set the countdown string
  };

  // Automatically update the countdown every minute
  useEffect(() => {
    const interval = setInterval(() => {
      calculateCountdown(); // Recalculate countdown every 60 seconds
    }, 60000); // Update every 60 seconds

    // Clean up interval on component unmount to avoid memory leaks
    return () => clearInterval(interval);
  }, [birthday]); // Re-run the effect when the birthday changes

  // Initial countdown calculation when the app starts (if the birthday is already provided)
  useEffect(() => {
    if (birthday) {
      calculateCountdown(); // Calculate immediately when the birthday is entered
    }
  }, [birthday]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Birthday Countdown</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter your birthday (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday} // Update birthday state on user input
      />
      
      {birthday && (
        <Text style={styles.countdownText}>
          Time until your birthday: {countdown}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  countdownText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
});

export default App;
