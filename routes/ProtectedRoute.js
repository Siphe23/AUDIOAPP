import React, { useContext } from 'react';
import { AuthContext } from '../screen/AuthProvider';
import { View, ActivityIndicator } from 'react-native';

const ProtectedRoute = ({ children, navigation }) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    navigation.navigate('Login');
    return <ActivityIndicator size="large" />;
  }

  return children;
};

export default ProtectedRoute;
