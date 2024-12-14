import { View, Text, StyleSheet, Image } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../store/features/userSlicer";
import { LinearGradient } from 'expo-linear-gradient';
import FontistoIcon from 'react-native-vector-icons/Fontisto'
import IonicIcon from 'react-native-vector-icons/Ionicons'

export default function UserMain() {
  const { id } = useLocalSearchParams(); // Extract 'id' from the route
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const user = useSelector((state) => state.users.user)


  useEffect(() => {
        dispatch(fetchUserById(id))
  }, [dispatch])


  useEffect(() => {
    // Set the header title dynamically
    if (user) {
        navigation.setOptions({
            title: `${user.username}`, // Customize header title
          });
    }
  }, [id, navigation, user]);

  return (
    <LinearGradient
      colors={['#d4fc79', '#96e6a1']}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={styles.background}
    >
      <View style={styles.img_con}>
        <Image
          style={styles.image}
          source={{ uri: `https://picsum.photos/200/300?random=${id}` }} 
        />
        <View>
          <Text style={styles.name_txt}>{user.name}</Text>
          <View style={styles.email_con}>
            <FontistoIcon name="email" />
            <Text>{user.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.info_con}>
        <View>
          <Text style={styles.info_title}>Address</Text>
          <View>
            <Text style={styles.info_sub_key}>street: <Text style={styles.info_sub_value}>{user.address['street']}</Text></Text>
            <Text style={styles.info_sub_key}>suite: <Text style={styles.info_sub_value}>{user.address['suite']}</Text></Text>
            <Text style={styles.info_sub_key}>city: <Text style={styles.info_sub_value}>{user.address['city']}</Text></Text>
            <Text style={styles.info_sub_key}>zipcode: <Text style={styles.info_sub_value}>{user.address['zipcode']}</Text></Text>
          </View>
        </View>

        <View>
          <Text style={styles.info_title}>Company</Text>
          <View>
            <Text style={styles.info_sub_key}>name: <Text style={styles.info_sub_value}>{user.company['name']}</Text></Text>
            <Text style={styles.info_sub_key}>catchPhrase: <Text style={styles.info_sub_value}>{user.company['catchPhrase']}</Text></Text>
            <Text style={styles.info_sub_key}>bs: <Text style={styles.info_sub_value}>{user.company['bs']}</Text></Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    background: {
      flex: 1
    },
    container: {
        paddingTop: 40
    },
    image: {
      width: 70, // Set image width
      height: 70, // Set image height
      borderRadius: 50, // Optional: round the corners of the image
    },
    img_con: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      gap: 16,
      paddingVertical: 16
    },
    email_con: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    },
    name_txt: {
      fontSize: 24,
      fontWeight: 600,
    },
    info_con: {
      paddingHorizontal: 16,
      paddingTop: 16,
      gap: 20,
    },
    info_title: {
      fontSize: 16,
      fontWeight: 700
    },
    info_sub_key: {
      fontWeight: 600
    },
    info_sub_value: {
      fontWeight: 400
    }
})


