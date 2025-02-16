import React, { useState , useRef, useEffect} from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const flatListRef = useRef(null)

  const handleSend = () => {
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

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.userId === user.uid ? styles.ownMessage : styles.otherMessage
    ]}>
      <Text style={styles.messageEmail}>{item.userEmail}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    
    <View style={styles.container}>
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
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgb(33, 33, 33)'
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
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    color: 'white'
  },
});

export default HomeScreen;