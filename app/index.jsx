import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Welcome from './welcome';

const index = () => {

  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync("token");
      setToken(storedToken);
      setIsReady(true);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (!token) {
        router.replace("/welcome");
      } else {
        router.replace("/feed");
      }
    }
  }, [isReady, token, router]);

  return null;
  
}

export default index