import { StyleSheet, Text, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});


const SingleRepoView = () => {
    const { id } = useParams();

    const { data, error, fetchMore, loading } = useQuery(GET_SINGLE_REPOSITORY, { fetchPolicy: 'cache-and-network', variables: { repoID: id, first: 2 } });

    console.log("single repo data", data)

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

      if (!canFetchMore) {
        return;
      }
    
      console.log("fetching more", data?.repository.reviews.pageInfo.endCursor);

      fetchMore({
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          repoID: id,
          first: 1, 
        },
      })
      .then(() => console.log("Fetch more successful."))
      .catch(error => console.error("Error fetching more reviews:", error));
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error fetching repositories: {error.message}</Text>;

    const reviews = data?.repository.reviews.edges;
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item.node} showRepoName={false}/>}
        keyExtractor={({ id }) => id}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={() => <RepositoryItem repository={data.repository} singleRepoView={true}/>}
      />
    );
};

export default SingleRepoView;