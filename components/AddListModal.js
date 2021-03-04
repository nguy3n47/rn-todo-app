import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../Colors';

const AddListModal = (props) => {
  const { onSubmit, closeModal } = props;
  const backgroundColors = [
    '#5CD859',
    '#24A6D9',
    '#595BD9',
    '#8022D9',
    '#D159D8',
    '#D85963',
    '#D88559',
  ];
  const [text, setText] = useState('');
  createTodo = () => {
    const value = {
      name: text,
      color,
    };

    onSubmit(value);
    setText('');
    closeModal();
  };

  const [color, setColor] = useState(backgroundColors[0]);
  function renderColors() {
    return backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setColor(color)}
        />
      );
    });
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <TouchableOpacity
          onPress={() => props.closeModal()}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
          }}>
          <Icon
            name="close"
            size={24}
            type="antdesign"
            color={colors.black}></Icon>
        </TouchableOpacity>

        <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
          <Text style={styles.title}>Create Todo List</Text>

          <TextInput
            value={text}
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setText(text)}></TextInput>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 18,
            }}>
            {renderColors()}
          </View>

          <TouchableOpacity
            onPress={() => createTodo()}
            style={[styles.create, { backgroundColor: color }]}>
            <Text style={{ color: colors.white, fontWeight: '600' }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddListModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.black,
    alignSelf: 'center',
    marginBottom: 16,
  },

  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },

  create: {
    marginTop: 18,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },
});
