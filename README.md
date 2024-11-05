**Settings**

- nodejs version 20.11.1
- npm version 10.2.4

---

**Default folders**

- App.tsx: main entry point for my App (it is a single file .tsx)

- app.json : config file for my App

---

**Set up theme.ts**

- theme.ts : using for global styles (color, padding, margin....)

---

**What I've done**

_Genearal commands_

- node -v
- nmp -v
- npm create-expo-app taskly --template -> (Blank (TypeScript) template)
- mpx expo lint -> ESLint statically analyzes your code to quickly find common problems.
- npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier -> Prettier is an opinionated code formatter. So you wouldn't have to keep track of all the spaces and brackets when writing code.
- npx expo install -- --save-dev eslint-plugin-react-native : It lets inspect for unused styles in a file to let you delete them.

- eslint . --fix : to fix prettier
- @expo/vector-icons : Icons used for project https://icons.expo.fyi/Index .
- Expo Router (Navigation): npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
- npx expo start --reset-cache : this command clears all existing cache. Expo and React Native often maintain a cache to speed up the development process, but sometimes this cache can contain stale data or error-causing configurations.

- all the screen you create in the app folder get created as a screen in the app, even if they don't have a \_layout file.

- With Expo Router, all the screen and \_layout have a DEFAULT export.

- npx expo install @react-native-async-storage/async-storage : AsyncStorage for Data Persistence.
     *        We use AsyncStorage for Data Persistence so, what we wont is GET(get from storage) and SET (save to storage)

- npx expo install expo-haptics: Haptics for vibration feedback.

---

**Components**

- Button: TouchableOpacity - Pressable

---

**Notes**

_General notes_

- PixelRatio (es. <Text style={styles.itemText}>{PixelRatio.get()}Pasta</Text>) :it gives you the number of pixels that corrisponds to the 1 unit value in the styles for your device. It cames from react-native. It can give you an idea of the images sizes you need for the device you are using for testing and the devices you are developing for.

- StyleSheet.create: Simply check the style you are using. You can create styles with or without StyleSheet.create, but by default styles come with this. So let's keep it! It has some utility methods you can use.

- SVGs are not the most optimal way to render thing on native apps (in particular Android). Small PNGs would, for example, actually be preferred.

- If you install with npx expo will install then if the library thet you are installing is something that we have records of, this checks and make sure that you are installing an SDK compatible version. If a new SDK is released and you haven't upgraded yet and you run npx expo install, it make sure that the library you are installing is compatible with SDK you have installed, compared to if you just did yan install or npm install which by defoult would install the latest version of the package.

_Images_

- Icons ad Images References : https://icons.expo.fyi/Index/AntDesign/closecircle, https://docs.expo.dev/versions/latest/sdk/image/, https://docs.expo.dev/versions/latest/sdk/svg/

_Navigation_

- Navigation on mobile look differnet than navigation on web. On mobile we have bottom tabs, modals, stack navigator. React Native doesn't come with a navigation library built in, so we need to install one. In this project we're going to use Expo Router (Expo Router is a file system-based navigation for React Native). It can match dynamic path (es: app>[user].tsx - https://docs.expo.dev/router/create-pages/). \* \_layout file: it is only one for folder and it tells you how the screens in that folder should be laid out (as tab, modal, stack....) and for example where you wont to add additional header...

       * the main field in the package.json tells you which is the entry point of you app.

       * The main entry poin has to be index.tsx

- _.layout.tsx: all the navigation works even though the screens aren't defined in this file. The only reason we really define them is to add additional properties as, for example, presentation={modal} (it works for iOS)  or animation: "fade_from_bottom".

- Stack Navigation: the mobile default way to navigate is displaynig screens in Stack. It means that when you navigate to a new screen, it is rendered on top of the current screen.

- Ways to navigate between screens:

       * <Link> fronm expo-router gives different animation between iOS and Android.
       * Programmatically way: with the Hook useRouter() (es:  onPress={() => router.navigate("/screen")})
       * Header button (like this one: >) that cames by default when a Stack is done.

- Modal: rendering a screen as a modal means rendering it on top of the content. The modal scrren must be defined above or adiacent to the other screens it's being rendered on top of.

- Tabs Navigation: screenOptions={{ tabBarActiveTintColor: theme.colorAzzurroTeal }} let change default color for Tabs text and icons.

- Nested Navigator: to convert a screen into a Stack of screens you have to create a folder with the same name as the screen and move the screen inside it. Than you have to rename the screen from its original name to index. Than you have to add a _layout.tsx file in the new folder, defining a stack with a single screen. Than you can add as many screens you want to. 
Converting the index screen into a stack is quite different -> Create a folder called for example group and move idex file inside it. Than the name of index file stys the same. Than, as before, add _layout file and add many screen as you want to.

_TextInput_

- By focusing on the TextInput the Keyboard opens. The keyboard is controlled in a lot of ways by the TextInput Component.

- The keyboardType Prop allows TextInput to choose between various keyboards

- TextInput has various Porps, for example autoComplete Prop....

_Ways to how to create a unique id_

- UUID library,
- NanoID library

In this case, the id has to be unique within our phone I will use Time Stamp:   id: new Date().toTimeString()

_ScrollView_

-ScrollView Component : to 

_Mirroring My Android Mobile_

- scrcpy: Download from https://github.com/Genymobile/scrcpy/blob/master/doc/windows.md -> scrcpy-win64-v2.7.zip and open the scrcpy terminal by double-clicking on open_a_terminal_here.bat. Check from terminal that your device is in the list of adb devices. Then command scrcpy. (Android devices must enable Developer Options > USB Debugging and ADB Debugging Enabled). I didn't use the scrcpy library because I'm using the npm package, just follow the instructions and official documentation -> https://github.com/Genymobile/scrcpy/blob/master/doc/windows.md.

_ScrollView_

- View component don't scroll by default. Let's using ScrollView.

- The scrollable elements style prop should not contain any margins or padding. We should pass these in with the contentContainer Prop. By adding this contentContainer Prop by putting the padding that I had set before in the styles.container, the last element of the list is not cut.

- stickyHeaderIndices Prop allows an elements of the list, be sticky.

_FlatList_

- It is useful to map an arry of items (it is better than ScrollView) and if you are rendering a full screen list. The most important future is that it is optimized for rendering large lists. In particular it does not render the components that are nowhere near being seen on the screen. It has several props (pull-ti-refresh, scroll-to-index-, header and footer support, data, renderItem, keyExtractor). 

FlatList Props description:

* data: where you pass in your array of items to map over,
* renderItem: it is a function to define how each item is rendered,
* keyExtractor: if the ype you passed in the FlatList doesn't have id, you will need keyExtractor to generate the unique id in the FlatList Component. It let you define a function to extract the unique key from your data(but, if your data consists of objects that have either a key on an id field, than that is used automatically)

_Data Persistence_

- AsyncStorage: This is a storage device. It is an unencrypted key-value store for React Native. It's very similar to localStorage on the web, except in this case the calls are asynchronous.
         *useEffect() is Synchronous, we use a way to execute an asynchronous function inside useEffect().
         * Note: As an application cas grows , it usefull to reaching up for a state management library instead of managing this data storag steps myself. Most javascript State management libraries work in React Native, and they almost include an adapter of sorts that allows me to use AsyncStorget to persist the data offline.

_Layout Animation_

- LayoutAnimation is a full-page animation library. Import LayoutAnimation from react-native and call configureNext just before evry time I do state update that change a list item. configureNext impacts directly the next UI just after the line in the code.

_Haptics_

- Haptic feedback is a vibration the phone makes in response to certain actions.



- ` : backtick

---
**What's Next**

Andrpoid Mobile: Enable Developer Options->Debug USB and Debug ADB for mirroring 


