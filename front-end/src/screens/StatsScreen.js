import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StatsScreen = () => {
  const navigation = useNavigation();
  
  // Sample state for tracking item counts (this could be updated dynamically based on your logic)
  const [recycled, setRecycled] = useState(0);
  const [composted, setComposted] = useState(0);
  const [trashed, setTrashed] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>your stats.</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Image source={require('../../assets/recycle-icon.png')} style={styles.icon} />
          <Text style={styles.statText}>items recycled: <Text style={styles.countText}>{recycled}</Text></Text>
        </View>

        <View style={styles.statItem}>
          <Image source={require('../../assets/compost-icon.png')} style={styles.icon} />
          <Text style={styles.statText}>items composted: <Text style={styles.countText}>{composted}</Text></Text>
        </View>

        <View style={styles.statItem}>
          <Image source={require('../../assets/trash-icon.png')} style={styles.icon} />
          <Text style={styles.statText}>items trashed: <Text style={styles.countText}>{trashed}</Text></Text>
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../../assets/home-icon2.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('CaptureImageScreen')}>
          <Image source={require('../../assets/camera-nav-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('../../assets/analytics-icon2.png')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#12142A',
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  statText: {
    fontSize: 22,
    color: '#12142A',
  },
  countText: {
    fontWeight: 'bold',
    color: '#3D9BE9',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#12142A',
    width: '100%',
    paddingVertical: 20,
  },
  navIcon: {
    width: 45,
    height: 45,
  },
});

export default StatsScreen;