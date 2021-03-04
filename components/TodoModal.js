import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../Colors';

const TodoModal = (props) => {
  const { list, closeModal, updateSubmit } = props;
  const [name, setName] = useState(list.name);
  const [color, setColor] = useState(list.color);
  const [todos, setTodos] = useState(list.todos);
  const [newTodo, setNewTodo] = useState('');

  const taskCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  toggleTodoCompleted = (index) => {
    list.todos[index].completed = !list.todos[index].completed;
    updateSubmit(list);
  };

  addTodo = () => {
    const newValue = {
      title: newTodo,
      completed: false,
    };
    list.todos.push(newValue);
    updateSubmit(list);
    setNewTodo('');

    Keyboard.dismiss();
  };

  renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
          <Icon
            style={{ width: 32 }}
            name={todo.completed ? 'ios-square' : 'ios-square-outline'}
            size={24}
            type="ionicon"
            color={colors.gray}></Icon>
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            { textDecorationLine: todo.completed ? 'line-through' : 'none' },
            { color: todo.completed ? colors.gray : colors.black },
          ]}>
          {todo.title}
        </Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => closeModal()}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
          }}>
          <Icon
            name="close"
            size={24}
            type="antdesign"
            color={colors.black}></Icon>
        </TouchableOpacity>

        <View
          style={[styles.section, styles.header, { borderBottomColor: color }]}>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={todos}
            renderItem={({ item, index }) => renderTodo(item, index)}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 32,
              paddingVertical: 64,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.section, styles.footer]} behaviour="padding">
          <TextInput
            value={newTodo}
            onChangeText={(newTodo) => setNewTodo(newTodo)}
            style={[styles.input, { borderColor: color }]}
          />
          <TouchableOpacity
            onPress={() => addTodo()}
            style={[styles.addTodo, { backgroundColor: color }]}>
            <Icon
              name="plus"
              size={24}
              type="antdesign"
              color={colors.white}></Icon>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  section: {
    flex: 1,
    alignSelf: 'stretch',
  },

  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    marginBottom: 16,
    marginTop: 64,
    borderBottomWidth: 3,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.black,
  },

  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: '600',
  },

  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: 55,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 16,
    paddingHorizontal: 8,
  },

  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  todo: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '700',
  },
});
