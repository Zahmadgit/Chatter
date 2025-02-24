import React, { useState , useRef, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, Pressable, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const flatListRef = useRef(null)
  const navigation = useNavigation();
  useEffect(() => {
    if (user === null) {
      //will reset the stack
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
  }, [user]);
  
  const handleSend = () => {
    if (!user) return; // Prevent sending messages if user is null
  
    if (message.trim()) {
      dispatch({
        type: 'SEND_MESSAGE',
        payload: {
          text: message,
          userId: user.uid,
          userEmail: user.email,
        },
      });
      setMessage('');
    }
  };
  

  const renderMessage = ({ item }) => {
    if (!user) return null; // Prevents error when rendering messages after logout
  
    return (
      <View style={[
        styles.messageContainer,
        item.userId === user.uid ? styles.ownMessage : styles.otherMessage
      ]}>
        <Text style={styles.messageEmail}>{item.userEmail}</Text>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>  
    <LinearGradient
      colors={['gray','black']}
      style={styles.container}
    >
     
        <Pressable onPress={() => dispatch({ type: 'LOGOUT_REQUEST' })} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor="white"
        />
        <Pressable onPress={handleSend} style={({ pressed }) => [styles.sendButton, pressed && styles.pressed]}>
          <View style={styles.sendButtonContainer}>
            <Image
              source={require('../../assets/images/uparrow.png')}
              style={styles.sendIcon}
            />
          </View>
        </Pressable>
      </View>
      </LinearGradient>
    </SafeAreaView>  
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 10,
    
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
    borderRadius: 10,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(48, 48, 48)',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'black',
  },
  messageEmail: {
    fontSize: 12,
    color: 'white',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    color: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    color: 'white'
  },
  sendIcon: {
    width: 25,
    height: 30,
    tintColor: 'white',
    resizeMode: 'contain'
  },
  sendButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.5
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: 100,
    alignSelf: 'center'
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default HomeScreen;