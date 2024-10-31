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

********************************

**Components**

- Button: TouchableOpacity - Pressable

********************************

**Notes**

- PixelRatio (es.  <Text style={styles.itemText}>{PixelRatio.get()}Pasta</Text>) :it gives you the number of pixels that corrisponds to the 1 unit value in the styles for your device. It cames from react-native. It can give you an idea of the images sizes you need for the device you are using for testing and the devices you are developing for.

- StyleSheet.create: Simply check the style you are using. You can create styles with or without StyleSheet.create, but by default styles come with this. So let's keep it! It has some utility methods you can use.

- ` : backtick