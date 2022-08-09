import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements/dist/icons/Icon";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);

  let today = new Date();
  const hour = today.getHours();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>
        Good {hour >= 12 || hour <= 5 ? "Afternoon" : "Morning"}, Konstandinos
      </Text>

      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            minLength={2}
            returnKeyType={"search"}
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              // setTimeout(() => {
              //   navigation.navigate("RideOptionsCard");
              // }, 2000);
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100 ${
          !destination && "opacity-20"
        }`}
      >
        <TouchableOpacity
          disabled={!destination}
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="car"
            type="font-awesome"
            color="white"
            size={16}
            style={tw`pt-1`}
          />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
            style={tw`pt-1`}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
