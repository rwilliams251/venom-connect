import { getValueByKey } from ".";
import { ProviderOptions } from "../../types";
import { everWalletName } from "../connectors/everwallet";
import Apple from "../logos/Apple.svg";
import ChromeExtension from "../logos/ChromeExtensionEver.svg";
import FirefoxExtension from "../logos/FirefoxExtensionEver.svg";
import EverWalletLogo from "../logos/EverWalletLogo.svg";
import MobileApp from "../logos/MobileAppEver.svg";
import PlayMarket from "../logos/PlayMarket.svg";

export { EverWalletLogo };

// for ever
const everDefaultLink = "/";
const everIosDeepLink =
  "https://apps.apple.com/ru/app/ton-crystal-wallet/id1581310780";
const everAndroidDeepLink =
  "https://play.google.com/store/apps/details?id=com.broxus.crystal.app";
const everExtensionLinkChrome =
  "https://chrome.google.com/webstore/detail/ever-wallet/cgeeodpfagjceefieflmdfphplkenlfk";
const everExtensionLinkFirefox = "https://everwallet.net";
export const everDefaultLinks = {
  ios: everIosDeepLink !== null ? everIosDeepLink || everDefaultLink : null,
  android:
    everAndroidDeepLink !== null
      ? everAndroidDeepLink || everDefaultLink
      : null,
  qr:
    everIosDeepLink !== null
      ? everIosDeepLink || everAndroidDeepLink || everDefaultLink
      : null,

  extension: [
    {
      browser: "chrome",
      link:
        everExtensionLinkChrome !== null
          ? everExtensionLinkChrome || everDefaultLink
          : null,
    },
    {
      browser: "firefox",
      link:
        everExtensionLinkFirefox !== null
          ? everExtensionLinkFirefox || everDefaultLink
          : null,
    },
  ],
};
//

export const getEverQr = () => {
  return "";
};

const EverWalletLogos = {
  wallet: EverWalletLogo,
  connectors: {
    chromeExtension: ChromeExtension,
    firefoxExtension: FirefoxExtension,
    // mobile: logos.MobileApp?.() || MobileApp,
    mobile: MobileApp,
    // ios: logos.Apple?.() || Apple,
    ios: MobileApp,
    // android: logos.Android?.() || Android,
    android: MobileApp,
    apple: Apple,
    playMarket: PlayMarket,
  },
};

export const everwallet: ProviderOptions = {
  id: "everwallet",
  wallet: {
    name: everWalletName,
    description: "The official wallet of the Everscale network",
    logo: EverWalletLogos.wallet,
  },
  walletWaysToConnect: [
    {
      id: "extension",
      type: "extension",
      logo: {
        chrome: EverWalletLogos.connectors.chromeExtension,
        firefox: EverWalletLogos.connectors.firefoxExtension,
      },
      name: "Ever Extension",
      options: {
        isCurrentBrowser: [
          ["isChrome", "isDesktop"],
          ["isFirefox", "isDesktop"],
        ],
        installExtensionLink: (links: typeof everDefaultLinks | undefined) =>
          getValueByKey("everwallet", "extension")(links),
        checkIsProviderExist: () => !!window.__ever, // todo
      },
    },
    {
      id: "mobile",
      type: "mobile",
      logo: EverWalletLogos.connectors.mobile,
      name: "Ever Mobile App",
      options: {
        qr: (links: typeof everDefaultLinks | undefined) =>
          getValueByKey("everwallet", "qr")(links),
        devises: [
          {
            type: "ios",
            img: EverWalletLogos.connectors.apple,
            text: "iOS App",

            deepLink: (links: typeof everDefaultLinks | undefined) =>
              getValueByKey("everwallet", "ios")(links),
            alt: "iOS",
            storeId: "ios",
          },
          {
            type: "android",
            img: EverWalletLogos.connectors.playMarket,
            text: "Android App",

            deepLink: (
              links: typeof everDefaultLinks | undefined = everDefaultLinks
            ) => getValueByKey("everwallet", "android")(links),
            alt: "Android",
            storeId: "android",
          },
        ],
      },
    },
    {
      id: "ios",
      type: "ios",
      logo: EverWalletLogos.connectors.ios,
      name: "Ever Mobile App",
      options: {
        text: "Click here to open App Store",

        deepLink: (
          links: typeof everDefaultLinks | undefined = everDefaultLinks
        ) => getValueByKey("everwallet", "ios")(links),
      },
    },
    {
      id: "android",
      type: "android",
      logo: EverWalletLogos.connectors.android,
      name: "Ever Mobile App",
      options: {
        text: "Click here to open Google Play",

        deepLink: (
          links: typeof everDefaultLinks | undefined = everDefaultLinks
        ) => getValueByKey("everwallet", "android")(links),
      },
    },
  ],
};
