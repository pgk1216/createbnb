import React, { useState } from "react";
import {
  Text as RNText,
  useWindowDimensions,
  View as RNView,
  TextInput as RNTextInput,
  TouchableOpacity as RNTouchableOpacity,
  ScrollView as RNScrollView,
  StyleSheet as RNStyleSheet,
  Switch as RNSwitch,
  FlatList as RNFlatList,
} from "react-native";
import {
  SafeAreaView as RNSafeAreaView,
  SafeAreaProvider as RNSafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image as RNImage } from "expo-image";
import RNIonicons from "@expo/vector-icons/Ionicons";
import { StatusBar as RNStatusBar } from "expo-status-bar";
import * as Reanimated from "react-native-reanimated";
import { LinearGradient as RNLinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <>
      <RNStatusBar style="dark" />
      <RNSafeAreaProvider
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <HomeScreen />
      </RNSafeAreaProvider>
    </>
  );
}

function HomeScreen() {
  const insets = useSafeAreaInsets();

  const SEARCH_CATEGORY = [
    { key: 0, label: "Cabins", icon: "home-outline" },
    { key: 1, label: "Icons", icon: "ticket-outline" },
    { key: 2, label: "Amazing views", icon: "image-outline" },
    { key: 3, label: "Treehouses", icon: "leaf-outline" },
    { key: 4, label: "Chef's Special", icon: "restaurant-outline" },
  ];

  const LISTINGS = [
    {
      key: 0,
      image: "https://picsum.photos/200/300",
      location: "Windsor, Vermont",
      rating: 4.99,
      distance: 107,
      dateRange: "Jun 17 - 22",
      price: 381,
    },
    {
      key: 1,
      image: "https://picsum.photos/200/300",
      location: "Hartford, Vermont",
      rating: 4.92,
      distance: 116,
      dateRange: "May 2 - 7",
      price: 333,
    },
    {
      key: 2,
      image: "https://picsum.photos/200/300",
      location: "Putney, Vermont",
      rating: 4.94,
      distance: 88,
      dateRange: "May 26 - 31",
      price: 150,
    },
    {
      key: 3,
      image: "https://picsum.photos/200/300",
      location: "West Windsor, Vermont",
      rating: 5.0,
      distance: 108,
      dateRange: "May 8 - 13",
      price: 475,
    },
  ];

  return (
    <RNView style={{ flex: 1 }}>
      <RNView
        style={[
          styles.upperPortion,
          { paddingTop: insets.top, paddingHorizontal: 24 },
        ]}
      >
        <RNTouchableOpacity style={styles.searchBar}>
          <RNIonicons name="search" size={16} color={"#000"} />
          <RNText style={{ fontWeight: "600", fontSize: 16 }}>
            Start your search
          </RNText>
        </RNTouchableOpacity>

        <RNView style={styles.categoriesListContainer}>
          {SEARCH_CATEGORY.map((category) => (
            <RNTouchableOpacity
              key={category.key}
              style={styles.categoryListItem}
            >
              <RNIonicons
                name={category.icon}
                size={24}
                style={styles.categoryIcon}
              />
              <RNText style={{ marginBottom: 8, fontWeight: "500" }}>
                {category.label}
              </RNText>
              <RNView
                style={{ width: "100%", height: 2, backgroundColor: "#000" }}
              />
            </RNTouchableOpacity>
          ))}
        </RNView>
      </RNView>

      <RNScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
        <RNView style={styles.displayTotalPriceContainer}>
          <RNView style={{ gap: 4 }}>
            <RNText style={styles.labelTitle}>Display total price</RNText>
            <RNText style={styles.labelSubtitle}>
              Includes all fees, before taxes
            </RNText>
          </RNView>
          <RNSwitch />
        </RNView>

        <RNFlatList
          data={LISTINGS}
          renderItem={({ item }) => (
            <RNView style={{ height: 100, backgroundColor: "blue" }} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 16 }}
        />
      </RNScrollView>
    </RNView>
  );
}

const styles = RNStyleSheet.create({
  upperPortion: {
    backgroundColor: "#fff",
    shadowRadius: 3,
    shadowColor: "#171717",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowRadius: 4,
    shadowColor: "#171717",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    borderRadius: 40,
    padding: 20,
    backgroundColor: "#fff",
  },
  categoriesListContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    marginTop: 20,
    backgroundColor: "#fff",
  },
  categoryIcon: {
    height: 24,
  },
  categoryListItem: {
    alignItems: "center",
    gap: 4,
  },
  mainAreaContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  displayTotalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "lightgray",
    gap: 4,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  labelSubtitle: {
    color: "gray",
  },
});
