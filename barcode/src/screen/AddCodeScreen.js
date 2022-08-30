import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RNCamera} from 'react-native-camera';

import {addProduct} from '../api';

const AddCodeScreen = () => {
  const [scaning, setScaning] = useState(true);
  const [barcode, setBarcode] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [sentToServer, setSentToServer] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
  });

  const handleBarCodeRead = e => {
    setBarcode({barcodeNumber: e.data, type: e.type});
    setScaning(false);
  };

  const handleSubmit = async () => {
    try {
      if (
        formData.productName.trim().length === 0 ||
        formData.productPrice.trim().length === 0
      )
        return;
      const payload = {...barcode, ...formData};
      const {data} = await addProduct(payload);

      setError(false);
      setMessage(data.message);
    } catch (error) {
      const {response} = error;
      const msg = response.data.message || response.statusText;

      setError(true);
      setMessage(`${msg}. Try Again`);
    } finally {
      setSentToServer(true);
    }
  };

  const handleRetake = () => {
    setFormData({});
    setBarcode({});
    setMessage('');
    setError(false);
    setSentToServer(false);
    setScaning(true);
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
            <Text style={{fontWeight: '600'}}>Type : {barcode?.type}</Text>
            <Text style={{fontWeight: '600', marginBottom: 20}}>
              Value: {barcode?.barcodeNumber}
            </Text>
            <Text style={styles.formHeaderText}>Enter Product Details</Text>
            {message.length !== 0 && (
              <Text
                style={[
                  styles.responseMsg,
                  {color: error ? '#ff3333' : '#4BB543'},
                ]}>
                {message}
              </Text>
            )}
            <View style={styles.form}>
              <Text style={styles.inputHelpText}>Product Name:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Product Name..."
                  value={formData.productName}
                  style={styles.input}
                  onChangeText={text =>
                    setFormData(formData => ({
                      ...formData,
                      productName: text,
                    }))
                  }
                />
              </View>
              <Text style={styles.inputHelpText}>Product Price:</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Product Price..."
                  value={formData.productPrice}
                  style={styles.input}
                  onChangeText={text =>
                    setFormData(formData => ({
                      ...formData,
                      productPrice: text,
                    }))
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btn}
              onPress={sentToServer ? handleRetake : handleSubmit}>
              <Text style={styles.btnText}>
                {sentToServer
                  ? error
                    ? 'TRY AGAIN'
                    : 'SCAN ANOTHER'
                  : 'UPLOAD PRODUCT'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default AddCodeScreen;

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
  form: {
    width: '100%',
  },
  formHeaderText: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '600',
  },
  responseMsg: {
    fontWeight: '500',
    marginBottom: 20,
  },
  inputHelpText: {
    marginLeft: '5%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
