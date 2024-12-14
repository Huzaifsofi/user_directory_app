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
          {user.address && Object.entries(user.address).map(([key, value]) => {
            if (key === 'geo' && value) {
              // Handle 'geo' (lat, lng) as a separate case
              return (
                <Text style={styles.info_sub_key} key={key}>
                  {`${key}: `}
                  <Text style={styles.info_sub_value}>
                    {`Lat: ${value.lat}, Lng: ${value.lng}`}
                  </Text>
                </Text>
              );
            }
            return (
              <Text style={styles.info_sub_key} key={key}>
                {`${key}: `}
                <Text style={styles.info_sub_value}>{value}</Text>
              </Text>
            );
          })}
          </View>
        </View>

        <View>
          <Text style={styles.info_title}>Company</Text>
          <View>
            {user.company && Object.entries(user.company).map(([key, value]) => (
              <Text style={styles.info_sub_key} key={key}>
                {`${key}: `}
                <Text style={styles.info_sub_value}>{value}</Text>
              </Text>
            ))}
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


