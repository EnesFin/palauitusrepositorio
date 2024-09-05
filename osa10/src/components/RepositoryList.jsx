import { FlatList, View, StyleSheet, Text, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  sortSelector: {
  }
});

const SortSelector = ({onChange, order, filter, onFilterChange}) => {
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef.current && filter != '') {
      textInputRef.current.focus();
    }
  }, [filter]); 

  return (
    <View style={styles.sortSelector}>
      <View style={{display: "flex", alignItems: "center", marginVertical: 20}}>
        <TextInput ref={textInputRef} onChangeText={onFilterChange} placeholder='Filter Repositories' value={filter} style={{borderRadius: 10, padding:10, height: 50, backgroundColor:"white", width: "90%"}}>
        </TextInput>
      </View>

      <Picker
        selectedValue={order.pickerDisplay}
        
        onValueChange={(itemValue) =>
          onChange(itemValue)
        }>

        <Picker.Item label="Latest Repositories" value="latest" />
        <Picker.Item label="Highest Rated Repositories" value="highest" />
        <Picker.Item label="Lowest Rated Repositories" value="lowest" />
      </Picker>
      
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState({criteria: "CREATED_AT", direction: "DESC", pickerDisplay: "latest"});
  const [filter, setFilter] = useState("");
  const [filterDebounced] = useDebounce(filter, 800);

  const handleOrderChange = (itemValue) => {
    switch(itemValue)
    {
        case "latest":
          setSelectedOrder({criteria: "CREATED_AT", direction: "DESC", pickerDisplay: "latest"});
          break;

        case "highest":
          setSelectedOrder({criteria: "RATING_AVERAGE", direction: "DESC", pickerDisplay: "highest"});
          break;

        case "lowest":
          setSelectedOrder({criteria: "RATING_AVERAGE", direction: "ASC", pickerDisplay: "lowest"});
          break;
    }
  };

  const handleFilterChange = (itemValue) => {
       setFilter(itemValue);
  };

  
  const { repositories, fetchMore, loading } = useRepositories({
    first: 8,
    searchKeyword: filterDebounced,
    orderBy: selectedOrder.criteria,
    orderDirection: selectedOrder.direction
  });

  if (loading) return <View style={{backgroundColor:"#aff4fe"}}></View>;
  if (!repositories) {
    return <Text>No data found</Text>;
  }

  // const repositories = data.repositories.edges.map(e => e.node);
  const repos = repositories.edges.map(e => e.node);
  const onEndReach = () => {
    fetchMore();
  };


  return (
    <FlatList style={{backgroundColor:"#aff4fe"}}
      data={repos}
      ListHeaderComponent={<SortSelector onFilterChange={handleFilterChange} filter={filter} onChange={handleOrderChange} order={selectedOrder}/>}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({item}) => <RepositoryItem repository={item} singleRepoView={false} />}
    />
  );
};

export default RepositoryList;