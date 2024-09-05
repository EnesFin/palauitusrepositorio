import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  creatorInfoAll:{
    display: "flex",
    flexDirection: "row",
    gap: 10,
    margin: 10
  },

  creatorInfoText:{
    display:"flex",
    flexDirection: "column",
    gap: 5
  },

  repoInfoContainer:{
    display:"flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    width: "86%",
    marginHorizontal: "7%",
    marginTop: 10
  },

  repoInfoBox:{
    display:"flex",
    flexDirection: "column",
    alignItems:"center"  },

  repoLanguageContainer: {
    backgroundColor: "#0366d1",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },

  repoLanguageText: {
    color: "white",
  },

  linkButton:{
    backgroundColor: "#222b2e",
    width:"60%",
    marginHorizontal: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10
  },

  linkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
  }
});

export function formatNumber(number) {
    if(typeof number === 'number')
    {
      if (number >= 1000) {
          const formattedNumber = (number / 1000).toFixed(2);
          return `${formattedNumber}k`;
      } else {
          return number.toString();
      }
    }
    else
      return '';
}

const RepositoryItem = ({repository, singleRepoView}) => {
  
  const handlePress = async () => {
    await Linking.openURL(repository.url);
  };


  const renderContent = () => {
    return (
      <View testID='repositoryItem' style={{backgroundColor:"white", padding: 20}}>
        <View style={styles.creatorInfoAll}>
        <Image style={styles.tinyLogo} source={{uri: repository.ownerAvatarUrl}}></Image>
          <View style={styles.creatorInfoText}>
            <Text style={{ fontWeight: 'bold' }}>{repository.fullName}</Text>
            <Text style={{ fontStyle: 'italic' }}>{repository.description}</Text>
            <View style={styles.repoLanguageContainer}>
              <Text style={[styles.repoLanguageText]}>{repository.language}</Text>
            </View>
          </View>
        </View>
        <View style={styles.repoInfoContainer}>
          <View style={styles.repoInfoBox}>
            <Text style={{fontWeight:"bold"}}>{formatNumber(repository.forksCount)}</Text><Text>forks</Text>
          </View>
          <View style={styles.repoInfoBox}>
            <Text style={{fontWeight:"bold"}}>{formatNumber(repository.stargazersCount)}</Text><Text>stargazers</Text>
          </View>
          <View style={styles.repoInfoBox}>
            <Text style={{fontWeight:"bold"}}>{repository.ratingAverage}</Text><Text>rating</Text>
          </View>
          <View style={styles.repoInfoBox}>
            <Text style={{fontWeight:"bold"}}>{repository.reviewCount}</Text><Text>review count</Text>
          </View>
        </View>
          {singleRepoView && <View style={styles.linkContainer}>
          <Pressable onPress={handlePress} style={styles.linkButton}><Text style={{fontSize: 20, color:"white"}}>Open in GitHub</Text></Pressable>
        </View>}
      </View>
    );
  };

  return singleRepoView ? (
    renderContent()
  ) : (
    <Link to={`/repos/${repository.id}`}>
      {renderContent()}
    </Link>
  );
};

export default RepositoryItem