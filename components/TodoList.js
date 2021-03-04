import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../Colors';
import TodoModal from './TodoModal';

const TodoList = (props) => {
  const { list, onUpdateList } = props;
  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  const [showListVisible, setListVisible] = useState(false);
  const toggleShowListVisiblity = () => {
    setListVisible(showListVisible ? false : true);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={showListVisible}
        onRequestClose={() => toggleShowListVisiblity()}>
        <TodoModal
          list={list}
          closeModal={() => toggleShowListVisiblity()}
          updateSubmit={onUpdateList}
        />
      </Modal>
      <TouchableOpacity
        onPress={() => toggleShowListVisiblity()}
        style={[styles.listContainer, { backgroundColor: list.color }]}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.count}>{remainingCount}</Text>
          <Text style={styles.subtitle}>Remaining</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.count}>{completedCount}</Text>
          <Text style={styles.subtitle}>Completed</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },

  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 18,
  },

  count: {
    fontSize: 24,
    fontWeight: '200',
    color: colors.white,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
});
