import React, { useEffect, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotes, addNote, deleteNote } from './notesSlice';

const NotesListScreen = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);
  const loading = useSelector(state => state.notes.loading);

  // Fetch notes 
  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  // Memoize the notes data
  const memoizedNotes = useMemo(() => notes, [notes]);

  // Add note 
  const handleAddNote = useCallback(() => {
    const newNote = { id: String(Date.now()), title: 'New Note', content: 'This is a new note.' };
    dispatch(addNote(newNote));
  }, [dispatch]);

  // Delete note 
  const handleDeleteNote = useCallback((id) => {
    dispatch(deleteNote(id));
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View style={styles.noteItem}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
      <Button title="Delete" onPress={() => handleDeleteNote(item.id)} />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading notes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Add Note" onPress={handleAddNote} />
      <FlatList
        data={memoizedNotes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default NotesListScreen;
