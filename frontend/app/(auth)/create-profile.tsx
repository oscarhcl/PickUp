import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import {router} from 'expo-router'
import React, { useState } from 'react';
import { supabase } from '../../libs/supabaseClient';
import { useSearchParams } from 'expo-router/build/hooks';

type FormFieldProps = {
    value: string;
    placeholder: string;
    handleChangeText: (text: string) => void;
  };

const FormField: React.FC<FormFieldProps>  = ({ value, placeholder, handleChangeText }) => {
  return (
    <View style={styles.formField}>
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const createprofile = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  const email = searchParams.get('email');
  const updatedAt = searchParams.get('updated_at'); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
        console.log( firstName + lastName + username)
        const { error: insertError } = await supabase
            .from('profiles') // Replace 'users' with your actual table name
            .insert([
            {
                id: id,
                email: email,
                updated_at: updatedAt,
                first_name: firstName,
                last_name: lastName, // You can store the Apple ID or any other relevant data
                username: username,
            },
            ]);

        if (insertError) {
            console.error('Error inserting user:', insertError);
        } else {
            console.log('User profileinserted successfully into the table');
        }
        //console.log(JSON.stringify({ error, user }, null, 2))
        router.replace('/courts');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      <FormField
        value={firstName}
        placeholder="First Name"
        handleChangeText={setFirstName}
      />
      <FormField
        value={lastName}
        placeholder="Last Name"
        handleChangeText={setLastName}
      />
      <FormField
        value={username}
        placeholder="Username"
        handleChangeText={setUsername}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default createprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formField: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
});