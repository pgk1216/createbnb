import RNIonicons from "@expo/vector-icons/Ionicons";
import RNBottomSheet, {
	BottomSheetScrollView as RNBottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BlurView as RNBlurView } from "expo-blur";
import { Image as RNImage } from "expo-image";
import { StatusBar as RNStatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	FlatList as RNFlatList,
	ScrollView as RNScrollView,
	StyleSheet as RNStyleSheet,
	Switch as RNSwitch,
	Text as RNText,
	TextInput as RNTextInput,
	TouchableOpacity as RNTouchableOpacity,
	View as RNView,
} from "react-native";
import { GestureHandlerRootView as RNGestureHandlerRootView } from "react-native-gesture-handler";
import RNMapView, { Marker as RNMarker } from "react-native-maps";
import RNAnimated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import {
	SafeAreaProvider as RNSafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

const AnimatedText = RNAnimated.createAnimatedComponent(RNText);
const AnimatedTouchableOpacity =
	RNAnimated.createAnimatedComponent(RNTouchableOpacity);
const AnimatedBlurView = RNAnimated.createAnimatedComponent(RNBlurView);

const ANIMATION_DURATION = 400;

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

function SearchBar({ openOverlay, closeOverlay, isOpen }) {
	const SUGGESTED_DESTINATIONS = [
		{
			key: 0,
			color: "#00cc00",
			icon: "",
			place: "Miami, FL",
			description: "Popular beach destination",
		},
		{
			key: 1,
			color: "#0000cc",
			icon: "",
			place: "New York City, NY",
			description: "For sights like Central Park",
		},
		{
			key: 2,
			color: "#cc0000",
			icon: "",
			place: "Los Angeles, CA",
			description: "For its busting nightlife",
		},
		{
			key: 3,
			color: "#111111",
			icon: "",
			place: "Miami Beach, FL",
			description: "For its top-notch dining",
		},
	];

	const OVERLAYS = [
		{
			key: 0,
			label: "Stays",
		},
		{
			key: 1,
			label: "Experiences",
		},
	];

	const insets = useSafeAreaInsets();

	//#region [animation region]
	const springAnimate = (target, damping = 33, stiffness = 400) => {
		return withSpring(target, {
			damping,
			stiffness,
		});
	};
	const timingAnimate = (target, duration = ANIMATION_DURATION) => {
		return withTiming(target, {
			duration,
		});
	};

	const searchTextOpacity = useSharedValue(1);
	const searchTextAnimatedOpacity = useAnimatedStyle(() => {
		return {
			opacity: searchTextOpacity.value,
		};
	});

	const searchBarReplacementOpacity = useSharedValue(0);
	const searchBarReplacementAnimatedOpacity = useAnimatedStyle(() => {
		return {
			opacity: searchBarReplacementOpacity.value,
		};
	});

	const searchBarReplacementBorderRadius = useSharedValue(40);
	const searchBarReplacementAnimatedBorderRadius = useAnimatedStyle(() => {
		return {
			borderRadius: searchBarReplacementBorderRadius.value,
		};
	});

	const searchBarContainerWidth = useSharedValue("90%");
	const searchBarContainerHeight = useSharedValue(56);
	const searchBarContainerAnimatedSize = useAnimatedStyle(() => {
		return {
			width: searchBarContainerWidth.value,
			height: searchBarContainerHeight.value,
		};
	});

	const searchBarContainerPosition = useSharedValue(0);
	const searchBarContainerAnimatedPosition = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: searchBarContainerPosition.value }],
		};
	});

	const topOverlayOpacity = useSharedValue(0);
	const topOverlayAnimatedOpacity = useAnimatedStyle(() => {
		return {
			opacity: topOverlayOpacity.value,
		};
	});

	const topOverlayPosition = useSharedValue(36);
	const topOverlayAnimatedPosition = useAnimatedStyle(() => {
		return {
			top: topOverlayPosition.value,
		};
	});

	const inactiveOverlayOpacity = useSharedValue(0);
	const inactiveOverlayAnimatedOpacity = useAnimatedStyle(() => {
		return {
			opacity: inactiveOverlayOpacity.value,
		};
	});

	const inactiveOverlayPosition = useSharedValue(10);
	const inactiveOverlayAnimatedPosition = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: inactiveOverlayPosition.value }],
		};
	});

	const bottomOverlayPosition = useSharedValue(200);
	const bottomOverlayAnimatedPosition = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: bottomOverlayPosition.value }],
		};
	});

	useEffect(() => {
		if (isOpen) {
			searchTextOpacity.value = timingAnimate(0, ANIMATION_DURATION - 400);
			searchBarReplacementOpacity.value = timingAnimate(1);
			searchBarReplacementBorderRadius.value = timingAnimate(20);
			searchBarContainerWidth.value = timingAnimate(
				"95%",
				ANIMATION_DURATION - 200,
			);
			searchBarContainerHeight.value = springAnimate(480);
			searchBarContainerPosition.value = timingAnimate(
				48,
				ANIMATION_DURATION - 200,
			);
			topOverlayOpacity.value = timingAnimate(1, ANIMATION_DURATION);
			topOverlayPosition.value = timingAnimate(insets.top, ANIMATION_DURATION);
			setTimeout(() => {
				inactiveOverlayOpacity.value = timingAnimate(1, ANIMATION_DURATION);
				inactiveOverlayPosition.value = timingAnimate(0, ANIMATION_DURATION);
			}, 150);
			bottomOverlayPosition.value = springAnimate(0);
		} else {
			topOverlayOpacity.value = timingAnimate(0, ANIMATION_DURATION - 400);
			topOverlayPosition.value = timingAnimate(36, ANIMATION_DURATION - 400);
			searchTextOpacity.value = timingAnimate(1, ANIMATION_DURATION - 400);
			searchBarReplacementOpacity.value = timingAnimate(
				0,
				ANIMATION_DURATION - 400,
			);
			searchBarReplacementBorderRadius.value = timingAnimate(40);
			searchBarContainerWidth.value = timingAnimate(
				"90%",
				ANIMATION_DURATION - 200,
			);
			searchBarContainerHeight.value = springAnimate(56, 50, 400);
			searchBarContainerPosition.value = timingAnimate(
				0,
				ANIMATION_DURATION - 200,
			);
			bottomOverlayPosition.value = timingAnimate(
				200,
				ANIMATION_DURATION - 200,
			);
			setTimeout(() => {
				inactiveOverlayOpacity.value = timingAnimate(
					0,
					ANIMATION_DURATION - 200,
				);
				inactiveOverlayPosition.value = timingAnimate(
					10,
					ANIMATION_DURATION - 200,
				);
			}, 250);
		}
	}, [
		isOpen,
		searchTextOpacity,
		searchBarReplacementOpacity,
		searchBarReplacementBorderRadius,
		searchBarContainerWidth,
		searchBarContainerHeight,
		searchBarContainerPosition,
		topOverlayOpacity,
		topOverlayPosition,
		inactiveOverlayOpacity,
		inactiveOverlayPosition,
		bottomOverlayPosition,
		insets.top,
	]);
	//#endregion

	const [selectedOverlay, setSelectedOverlay] = useState(OVERLAYS[0]);

	return (
		<RNView
			style={{
				height: isOpen ? "100%" : "0%",
			}}
		>
			{isOpen && (
				<RNAnimated.View
					style={[
						styles.searchOverlayTopSection,
						topOverlayAnimatedOpacity,
						topOverlayAnimatedPosition,
					]}
				>
					<RNTouchableOpacity
						style={styles.closeSearchOverlayButton}
						onPress={closeOverlay}
					>
						<RNIonicons name="close" size={16} />
					</RNTouchableOpacity>
					<RNView
						style={{ flexDirection: "row", alignItems: "center", gap: 28 }}
					>
						<RNTouchableOpacity
							style={
								selectedOverlay.key === OVERLAYS[0].key
									? styles.searchOverlayTopButtonSelected
									: styles.searchOverlayTopButton
							}
							onPress={() => setSelectedOverlay(OVERLAYS[0])}
						>
							<RNText
								style={[
									styles.searchOverlayTopText,
									selectedOverlay.key === OVERLAYS[0].key
										? { color: "#000" }
										: { color: "gray" },
								]}
							>
								{OVERLAYS[0].label}
							</RNText>
						</RNTouchableOpacity>
						<RNTouchableOpacity
							style={
								selectedOverlay.key === OVERLAYS[1].key
									? styles.searchOverlayTopButtonSelected
									: styles.searchOverlayTopButton
							}
							onPress={() => setSelectedOverlay(OVERLAYS[1])}
						>
							<RNText
								style={[
									styles.searchOverlayTopText,
									selectedOverlay.key === OVERLAYS[1].key
										? { color: "#000" }
										: { color: "gray" },
								]}
							>
								{OVERLAYS[1].label}
							</RNText>
						</RNTouchableOpacity>
					</RNView>
					<RNTouchableOpacity
						style={[styles.closeSearchOverlayButton, { opacity: 0 }]}
						disabled={true}
					>
						<RNIonicons name="close" size={16} />
					</RNTouchableOpacity>
				</RNAnimated.View>
			)}
			<RNView style={{ gap: 12, marginTop: isOpen ? 52 : 0 }}>
				<AnimatedTouchableOpacity
					style={[
						styles.searchBar,
						searchBarContainerAnimatedSize,
						searchBarContainerAnimatedPosition,
						searchBarReplacementAnimatedBorderRadius,
						isOpen ? { marginBottom: 52 } : { position: "absolute", top: 64 },
					]}
					onPress={openOverlay}
					activeOpacity={1}
					disabled={isOpen}
				>
					<RNAnimated.View
						style={[styles.searchBarText, searchTextAnimatedOpacity]}
					>
						<RNIonicons name="search" size={16} color={"#000"} />
						<RNText style={{ fontWeight: "600", fontSize: 16 }}>
							Start your search
						</RNText>
					</RNAnimated.View>

					<RNAnimated.View
						style={[
							{
								width: "100%",
								height: "100%",
								justifyContent: "space-between",
								overflow: "hidden",
							},
							searchBarReplacementAnimatedOpacity,
						]}
					>
						<RNText style={{ fontSize: 28, fontWeight: "600" }}>
							Where to?
						</RNText>
						<RNView>
							<RNTextInput
								style={styles.searchInput}
								placeholder="Search destinations"
								placeholderTextColor="gray"
							/>
							<RNIonicons
								name="search"
								size={16}
								color="#000"
								style={styles.searchIcon}
							/>
						</RNView>
						<RNView style={{ gap: 16 }}>
							<RNText style={styles.smallHeader}>Suggested destinations</RNText>
							{SUGGESTED_DESTINATIONS.map((destination) => (
								<RNTouchableOpacity
									key={destination.key}
									style={styles.suggestedDestination}
								>
									<RNView
										style={[
											styles.suggestedDestinationIcon,
											{ backgroundColor: `${destination.color}10` },
										]}
									>
										<RNIonicons
											name="home-outline"
											size={20}
											color={destination.color}
										/>
									</RNView>
									<RNView style={{ gap: 2 }}>
										<RNText style={{ fontWeight: "600" }}>
											{destination.place}
										</RNText>
										<RNText style={styles.suggestedDestinationDesc}>
											{destination.description}
										</RNText>
									</RNView>
								</RNTouchableOpacity>
							))}
						</RNView>
					</RNAnimated.View>
				</AnimatedTouchableOpacity>
				{isOpen && (
					<AnimatedTouchableOpacity
						style={[
							styles.closedContainer,
							inactiveOverlayAnimatedOpacity,
							inactiveOverlayAnimatedPosition,
						]}
					>
						<RNText style={{ fontWeight: "500", color: "gray" }}>When</RNText>
						<RNText style={{ fontWeight: "600" }}>Any week</RNText>
					</AnimatedTouchableOpacity>
				)}
				{isOpen && (
					<AnimatedTouchableOpacity
						style={[
							styles.closedContainer,
							inactiveOverlayAnimatedOpacity,
							inactiveOverlayAnimatedPosition,
						]}
					>
						<RNText style={{ fontWeight: "500", color: "gray" }}>Who</RNText>
						<RNText style={{ fontWeight: "600" }}>Any guests</RNText>
					</AnimatedTouchableOpacity>
				)}
			</RNView>
			{isOpen && (
				<RNAnimated.View
					style={[styles.bottomOverlayContainer, bottomOverlayAnimatedPosition]}
				>
					<RNView style={styles.bottomOverlayButtonsContainer}>
						<RNTouchableOpacity>
							<RNText style={styles.clearAllButton}>Clear all</RNText>
						</RNTouchableOpacity>
						<RNTouchableOpacity style={styles.searchButton}>
							<RNIonicons
								name="search"
								size={16}
								color={"#fff"}
								style={{ textAlign: "left" }}
							/>
							<RNText style={{ color: "#fff", fontWeight: "600" }}>
								Search
							</RNText>
						</RNTouchableOpacity>
					</RNView>
				</RNAnimated.View>
			)}
		</RNView>
	);
}

function HomeScreen() {
	const insets = useSafeAreaInsets();
	const mainListingSheetRef = useRef(null);
	const snapPoints = useMemo(() => ["10%", "90%"], []);
	const [selectedCategory, setSelectedCategory] = useState(0);

	const [isOpen, setIsOpen] = useState(false);

	const animatedBlurIntensity = useSharedValue(0);

	const blurBackground = () => {
		animatedBlurIntensity.value = withTiming(100, {
			duration: 200,
		});
	};
	const unblurBackground = () => {
		animatedBlurIntensity.value = withTiming(0, {
			duration: 200,
		});
	};

	const openOverlay = () => {
		blurBackground();
		setIsOpen(true);
	};

	const closeOverlay = () => {
		setIsOpen(false);
		unblurBackground();
	};

	const SEARCH_CATEGORY = [
		{ key: 0, label: "Cabins", icon: "home-outline" },
		{ key: 1, label: "Icons", icon: "ticket-outline" },
		{
			key: 2,
			label: "Amazing views",
			icon: "image-outline",
		},
		{ key: 3, label: "Treehouses", icon: "leaf-outline" },
		{
			key: 4,
			label: "Chef's Special",
			icon: "restaurant-outline",
		},
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
			guestFavorite: true,
			rareFinding: true,
		},
		{
			key: 1,
			image: "https://picsum.photos/200/300",
			location: "Hartford, Vermont",
			rating: 4.92,
			distance: 116,
			dateRange: "May 2 - 7",
			price: 333,
			guestFavorite: true,
			rareFinding: false,
		},
		{
			key: 2,
			image: "https://picsum.photos/200/300",
			location: "Putney, Vermont",
			rating: 4.94,
			distance: 88,
			dateRange: "May 26 - 31",
			price: 150,
			guestFavorite: false,
			rareFinding: false,
		},
		{
			key: 3,
			image: "https://picsum.photos/200/300",
			location: "West Windsor, Vermont",
			rating: 5.0,
			distance: 108,
			dateRange: "May 8 - 13",
			price: 475,
			guestFavorite: false,
			rareFinding: false,
		},
	];

	return (
		<RNGestureHandlerRootView style={{ flex: 1 }}>
			<SearchBar
				openOverlay={openOverlay}
				closeOverlay={closeOverlay}
				isOpen={isOpen}
			/>
			<RNView style={[styles.upperPortion, { paddingTop: insets.top + 64 }]}>
				<RNScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.categoriesListContainer}
				>
					{SEARCH_CATEGORY.map((category) => (
						<RNTouchableOpacity
							key={category.key}
							style={styles.categoryListItem}
							onPress={() => {
								setSelectedCategory(category.key);
							}}
						>
							<RNIonicons
								name={category.icon}
								size={24}
								style={styles.categoryIcon}
								color={
									selectedCategory === category.key
										? "#000"
										: "rgba(0, 0, 0, 0.5)"
								}
							/>
							<RNText
								style={{
									marginBottom: 8,
									fontWeight: "500",
									color:
										selectedCategory === category.key
											? "#000"
											: "rgba(0, 0, 0, 0.5)",
								}}
							>
								{category.label}
							</RNText>
							<RNView
								style={{
									width: "100%",
									height: 2,
									backgroundColor:
										selectedCategory === category.key ? "#000" : "transparent",
								}}
							/>
						</RNTouchableOpacity>
					))}
				</RNScrollView>
			</RNView>

			<RNMapView
				style={{ flex: 1 }}
				contentContainerStyle={{ padding: 24 }}
				showsVerticalScrollIndicator={false}
			>
				<RNMarker />
			</RNMapView>

			<RNBottomSheet
				ref={mainListingSheetRef}
				index={1}
				snapPoints={snapPoints}
				handleIndicatorStyle={{ backgroundColor: "lightgray", width: 48 }}
				containerStyle={{ zIndex: 50 }}
			>
				<RNBottomSheetScrollView
					contentContainerStyle={{ paddingHorizontal: 24 }}
					showsVerticalScrollIndicator={false}
				>
					<RNView style={{ alignItems: "center", marginVertical: 16 }}>
						<RNText style={{ fontWeight: "600" }}>Over 1000 listings!</RNText>
					</RNView>
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
							<RNTouchableOpacity style={styles.listingItem}>
								{item.guestFavorite && (
									<RNView style={styles.guestFavoriteContainer}>
										{item.rareFinding && (
											<RNIonicons name="trophy" size={16} color={"gold"} />
										)}
										<RNText style={{ fontWeight: "500" }}>
											Guest favorite
										</RNText>
									</RNView>
								)}
								<RNTouchableOpacity style={styles.heartIcon}>
									<RNIonicons
										name={"heart-outline"}
										size={24}
										color={"#fff"}
										style={styles.overHeart}
									/>
									<RNIonicons
										name={"heart"}
										size={24}
										color={"rgba(0, 0, 0, 0.5)"}
										style={styles.underHeart}
									/>
								</RNTouchableOpacity>
								<RNImage
									source={{ uri: item.image }}
									style={{ width: "100%", height: 320, borderRadius: 16 }}
									contentFit="cover"
								/>
								<RNView style={{ gap: 4 }}>
									<RNView style={styles.listingItemHeader}>
										<RNText style={{ fontWeight: "600" }}>
											{item.location}
										</RNText>
										<RNText>
											<RNIonicons name="star" /> {item.rating}
										</RNText>
									</RNView>
									<RNText style={styles.listingItemSubtitle}>
										{item.distance} miles away
									</RNText>
									<RNText style={styles.listingItemSubtitle}>
										{item.dateRange}
									</RNText>
									<RNText style={{ marginTop: 4 }}>
										<RNText style={{ fontWeight: "600" }}>
											${item.price}{" "}
										</RNText>
										night
									</RNText>
								</RNView>
							</RNTouchableOpacity>
						)}
						scrollEnabled={false}
						contentContainerStyle={{
							gap: 36,
							marginVertical: 16,
							paddingBottom: 24,
						}}
						keyExtractor={(item) => item.key}
					/>
				</RNBottomSheetScrollView>
			</RNBottomSheet>

			<AnimatedBlurView
				intensity={animatedBlurIntensity}
				style={styles.blurView}
				pointerEvents={isOpen ? "handled" : "none"}
			/>
		</RNGestureHandlerRootView>
	);
}

const styles = RNStyleSheet.create({
	upperPortion: {
		backgroundColor: "#fff",
		shadowRadius: 3,
		shadowColor: "#171717",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 0 },
		zIndex: 75,
	},
	searchBar: {
		zIndex: 99,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		shadowRadius: 4,
		shadowColor: "#171717",
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 0 },
		paddingVertical: 16,
		paddingHorizontal: 24,
		backgroundColor: "#fff",
		alignSelf: "center",
	},
	searchBarText: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		position: "absolute",
	},
	popUpSearchBarViewContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 99,
		gap: 16,
		justifyContent: "space-between",
	},
	searchOverlayTopSection: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 99,
		width: "100%",
		paddingHorizontal: 16,
	},
	closeSearchOverlayButton: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "darkgray",
		borderRadius: 24,
		padding: 6,
	},
	searchOverlayTopButtonSelected: {
		borderBottomWidth: 2,
		borderBottomColor: "#000",
	},
	searchOverlayTopButton: {
		paddingBottom: 2,
	},
	searchOverlayTopText: {
		fontSize: 16,
		fontWeight: "500",
	},
	popUpSearchBarContainer: {
		borderRadius: 20,
		backgroundColor: "#fff",
		paddingVertical: 16,
		paddingHorizontal: 20,
		marginHorizontal: 12,
		gap: 16,
		shadowColor: "#171717",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 8 },
		shadowRadius: 3,
		zIndex: 99,
	},
	searchInput: {
		borderWidth: 1,
		borderColor: "lightgray",
		borderRadius: 8,
		paddingVertical: 20,
		paddingHorizontal: 48,
	},
	searchIcon: {
		position: "absolute",
		left: 16,
		top: "50%",
		transform: [{ translateY: "-50%" }],
	},
	smallHeader: {
		marginTop: 8,
		fontSize: 12,
		color: "#000",
		fontWeight: "300",
	},
	suggestedDestination: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	suggestedDestinationIcon: {
		borderRadius: 8,
		width: 56,
		height: 56,
		justifyContent: "center",
		alignItems: "center",
	},
	suggestedDestinationDesc: {
		color: "gray",
	},
	closedContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		borderRadius: 16,
		marginHorizontal: 12,
		backgroundColor: "#fff",
		shadowColor: "#171717",
		shadowOpacity: 0.3,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 4,
		zIndex: 99,
	},
	categoriesListContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 32,
		marginTop: 20,
		backgroundColor: "#fff",
		paddingHorizontal: 24,
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
		marginTop: 56,
		marginBottom: 8,
	},
	labelTitle: {
		fontSize: 16,
		fontWeight: "500",
	},
	labelSubtitle: {
		color: "gray",
	},
	listingItem: {
		gap: 10,
	},
	guestFavoriteContainer: {
		position: "absolute",
		top: 16,
		left: 16,
		backgroundColor: "#fff",
		paddingVertical: 4,
		paddingHorizontal: 12,
		borderRadius: 20,
		zIndex: 99,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	heartIcon: {
		position: "absolute",
		top: 16,
		right: 16,
		zIndex: 99,
	},
	overHeart: {
		zIndex: 3,
	},
	underHeart: {
		position: "absolute",
		zIndex: 2,
	},
	listingItemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	listingItemSubtitle: {
		color: "gray",
	},
	mapButton: {
		position: "absolute",
		bottom: 48,
		left: "50%",
		transform: [{ translateX: "-50%" }],
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 50,
		backgroundColor: "#000",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 24,
	},
	bottomPartContainer: {
		zIndex: 99,
		gap: 8,
	},
	bottomOverlayContainer: {
		position: "absolute",
		bottom: 0,
		height: 100,
		padding: 20,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "lightgray",
		zIndex: 99,
	},
	bottomOverlayButtonsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 8,
		width: "100%",
	},
	clearAllButton: {
		fontWeight: "600",
		textDecorationLine: "underline",
		fontSize: 16,
	},
	searchButton: {
		backgroundColor: "#ff375d",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	blurView: {
		...RNStyleSheet.absoluteFillObject,
		zIndex: 90,
	},
});
