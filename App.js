import React, { useState, useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Platform,
} from 'react-native';
import colors from './Colors';
import { Icon } from 'react-native-elements';
import data from './data';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import Fire from './Fire';

const App = () => {
  //State
  const [isVisible, setVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState({});
  //Effect
  useEffect(() => {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert('Uh oh, something went wrong');
      }

      firebase.getLists((lists) => {
        setLists(lists);
      });

      setUser(user);
    });
  }, []);

  const toggleVisiblity = () => {
    setVisible(isVisible ? false : true);
  };

  renderList = (list) => {
    return <TodoList list={list} onUpdateList={updateList} />;
  };

  addList = (value) => {
    // const newTodo = {
    //   ...value,
    //   todos: [],
    // };
    // const newTodoList = [...lists];
    // newTodoList.push(newTodo);
    // setLists(newTodoList);

    firebase.addList({
      ...value,
      todos: [],
    });
  };

  updateList = (value) => {
    // const newList = [...lists].map((item) => {
    //   return item.id === value.id ? value : item;
    // });
    // setLists(newList);

    firebase.updateList(value);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={isVisible}
        onRequestClose={() => toggleVisiblity()}>
        <AddListModal closeModal={toggleVisiblity} onSubmit={addList} />
      </Modal>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo{' '}
          <Text style={{ fontWeight: '300', color: colors.blue }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>

      <View
        style={{
          marginVertical: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => toggleVisiblity()}>
          <Icon name="plus" size={24} type="antdesign" color={colors.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 28, paddingRight: 28 }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    backgroundColor: colors.lightblue,
    flex: 1,
    height: 1,
    alignSelf: 'center',
  },

  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 50,
  },

  addList: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  add: {
    fontWeight: '300',
    color: colors.blue,
    fontSize: 14,
    marginTop: 8,
  },
});
