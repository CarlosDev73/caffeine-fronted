import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { Stack, useRouter } from 'expo-router';

const Layout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      const { path, queryParams } = Linking.parse(url);
      console.log("Parsed Deep Link:", { path, queryParams });
      if (path === "reset-password" && queryParams.token) {
        router.push(`/reset-password?token=${queryParams.token}`);
      }
    };

    // Add deep link listener
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Clean up the listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Maintain your custom header configuration
      }}
    />
  );
};

export default Layout;
