import { StyleSheet, Platform } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const lightTheme = {
  black: "#303030",
  darkGrey: "#505050",
  notSoDarkGrey: "rgba(80,80,80,.75)",
  notSoLightGrey: "#C4C4C4",
  kindOfLightGrey: "#EBEBEB",
  ligthGrey: "#F9F9F9",
  white: "#FFFFFF",
  red: "#BF2E2E",
  green: "#2DCC54",
  yellow: "#D9B225"
}

export const styles = StyleSheet.create({
  authHeader: {
    fontFamily: 'Poppins_700Bold',
    color: lightTheme.black,
    fontSize: wp("7%"),
    marginBottom: wp("2.5%")
  },
  authSubheader: {
    fontFamily: 'Poppins_600SemiBold',
    color: lightTheme.notSoLightGrey,
    fontSize: wp("5%"),
    letterSpacing: wp("0.625%")
  },
  authTitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: wp("4.5%"),
    color: lightTheme.darkGrey
  },
  authSubtitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: wp("4%"),
    color: lightTheme.notSoLightGrey,
    marginBottom: wp("1%")
  },
  authGreenSubtitle: {
    fontFamily: "Roboto_500Medium",
    fontSize: wp("4%"),
    color: lightTheme.green,
    marginBottom: wp("1%")
  },

  headerText: {
    fontFamily: "Poppins_700Bold",
    fontSize: wp("4.5%"),
    color: lightTheme.darkGrey
  },
  bodyText: {
    fontFamily: "Roboto_500Medium",
    fontSize: wp("4%"),
    color: lightTheme.notSoDarkGrey,

    lineHeight: 20
  },
  headerText2: {
    fontFamily: "Poppins_700Bold",
    fontSize: wp("4%"),
    color: lightTheme.notSoDarkGrey
  },
  bodyText2: {
    fontFamily: "Roboto_500Medium",
    fontSize: wp("4%"),
    color: lightTheme.notSoLightGrey
  },
  headerText3: {
    fontFamily: "Poppins_700Bold",
    fontSize: wp("5.5%"),
    color: lightTheme.darkGrey
  },
  headerCardText: {
    fontFamily: "Poppins_700Bold",
    fontSize: wp("4.5%")
  },
  cardText: {
    fontFamily: "Roboto_500Medium",
    fontSize: wp("4%"),

    lineHeight: 20
  },
  rateText: {
    fontFamily: "Roboto_700Bold",
    fontSize: wp("4.5%")
  },

  authInput: {
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("4%"),
    marginTop: wp("1%"),
    marginBottom: wp("2.5%"),
    borderRadius: wp("2.5%"),
    borderWidth: wp("0.25%"),
    
    fontFamily: "Roboto_400Regular",
    fontSize: wp("4.5%"),

    backgroundColor: lightTheme.kindOfLightGrey,
    borderColor: lightTheme.notSoLightGrey,
    color: lightTheme.darkGrey
  },

  authContainer: {
    flex: 1,
    paddingHorizontal: wp("7.5%"),
    alignItems: 'center',
    backgroundColor: lightTheme.ligthGrey
  },
  authTopCard: {
    position: 'absolute',
    width: "100%",
    top: 0
  },
  authCard: {
    position: 'absolute',
    width: "100%",
    bottom: wp("20%")
  },
  card: {
    //marginHorizontal: wp("5%"),
    //marginVertical: wp("2.5%"),
    borderColor: lightTheme.ligthGrey,
    //borderWidth: wp("0.5%"),
    borderTopWidth: wp("0.5%"),
    borderBottomWidth: wp("0.5%"),
    backgroundColor: lightTheme.white,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  card2: {
    backgroundColor: lightTheme.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
  },
  options: {
    paddingRight: wp("5%"),
    paddingLeft: wp("4%"),
    paddingVertical: wp("5%"),
    
    backgroundColor: lightTheme.white,

    borderColor: lightTheme.kindOfLightGrey,
    borderWidth: 1,
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  authButton: {
    width: wp("15%"),
    padding: wp("2.5%"),
    borderRadius: wp("2.5%")
  },
  iButton: {
    flexDirection: "row",
    alignItems: "center",

    paddingTop: wp("2.5%"),
    paddingBottom: wp("2.5%"),
    paddingLeft: wp("2.5%"),
    paddingRight: wp("2.5%"),

    marginLeft: wp("2.5%"),

    borderRadius: 10,

    borderWidth: wp(".5%"),
    borderLeftWidth: 0,
    
    borderColor: lightTheme.ligthGrey,
    backgroundColor: lightTheme.white,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

    position: "absolute",
    bottom: wp("5%")
  }
});