**Settings**
- nodejs version 20.11.1
- npm version 10.2.4

********************************

**Default folders**

- App.tsx: main entry point for my App (it is a single file .tsx)

- app.json : config file for my App

********************************
**Set up theme.ts**
- theme.ts : using for global styles (color, padding, margin....)

********************************

**What I have done**
- node -v
- nmp -v
- npm create-expo-app taskly --template -> (Blank (TypeScript) template)
- mpx expo lint -> ESLint statically analyzes your code to quickly find common problems.
- npx expo install -- --save-dev prettier eslint-config-prettier eslint-plugin-prettier -> Prettier is an opinionated code formatter. So you wouldn't have to keep track of all the spaces and brackets when writing code. 
- npx expo install -- --save-dev eslint-plugin-react-native : It lets inspect for unused styles in a file to let you delete them.

- eslint . --fix : to fix prettier 
- @expo/vector-icons : Icons used for project https://icons.expo.fyi/Index .

********************************

**Components**

- Button: TouchableOpacity - Pressable

********************************

**Notes**

- PixelRatio (es.  <Text style={styles.itemText}>{PixelRatio.get()}Pasta</Text>) :it gives you the number of pixels that corrisponds to the 1 unit value in the styles for your device. It cames from react-native. It can give you an idea of the images sizes you need for the device you are using for testing and the devices you are developing for.

- StyleSheet.create: Simply check the style you are using. You can create styles with or without StyleSheet.create, but by default styles come with this. So let's keep it! It has some utility methods you can use.

- SVGs are not the most optimal way to render thing on native apps (in particular Android). Small PNGs would, for example, actually be preferred.

- If you install with npx expo will install then if the library thet you are installing is something that we have records of, this checks and make sure that you are installing an SDK compatible version. If a new SDK is released and you haven't upgraded yet and you run npx expo install, it make sure that the library you are installing is compatible with SDK you have installed, compared to if you just did yan install or npm install which by defoult would install the latest version of the package.

- Icons ad Images References : https://icons.expo.fyi/Index/AntDesign/closecircle, https://docs.expo.dev/versions/latest/sdk/image/, https://docs.expo.dev/versions/latest/sdk/svg/

- ` : backtick