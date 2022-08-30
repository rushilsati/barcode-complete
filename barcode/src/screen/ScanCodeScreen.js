import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React, {useContext, useState} from 'react';

import {ScanContext} from '../Context/ScanContext';

const ScanCodeScreen = () => {
  const [scaning, setScaning] = useState(true);
  const [codeData, setCodeData] = useState({});

  const {socket} = useContext(ScanContext);

  const handleBarCodeRead = e => {
    setCodeData({type: e.type, value: e.data});
    socket.emit('scanned code', {type: e.type, value: e.data});

    setScaning(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stream}>
        {scaning ? (
          <RNCamera
            onBarCodeRead={handleBarCodeRead}
            style={{
              width: '100%',
              height: '70%',
              borderRadius: 15,
              overflow: 'hidden',
            }}
          />
        ) : (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Code Successfully Scanned</Text>
            <Text style={{fontWeight: '600'}}>Type : {codeData?.type}</Text>
            <Text style={{fontWeight: '600', marginBottom: 20}}>
              Value: {codeData?.value}
            </Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setScaning(true);
              }}>
              <Text style={styles.btnText}>Scan Next Code</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ScanCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stream: {
    width: '80%',
    minHeight: '55%',
    borderRadius: 50,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    fontSize: 18,
    fontWeight: '500',
  },
  btn: {
    height: 40,
    width: '90%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0087FF',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
