import styled from "styled-components";
import { ConnectorType, Theme, WalletDisplay, WayToConnect } from "../types";
import { Browsers, notSupported } from "./NotSupported";

type Wrapper = {};
const SWrapper = styled.div<Wrapper>`
  position: relative;
  width: 100%;
`;

type ProviderContainerWrapper = {
  item: Theme["item"];
  popup: Theme["popup"];
  isShowCheckWarnings: boolean;
};
const SProviderContainerWrapper = styled.div<ProviderContainerWrapper>`
  width: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  background: transparent;

  /* ========================= */
  margin-top: ${({ isShowCheckWarnings }) =>
    isShowCheckWarnings ? 0 : `10px`};
  border-radius: ${({
    popup: {
      border: { borderRadius },
    },
  }) => `${borderRadius / 2 + 1}px`};
  padding: ${({
    item: {
      border: { width },
    },
  }) => `${width}px`};
  background: ${({
    item: {
      border: { color },
    },
  }) => color};
  border-width: ${({
    item: {
      border: { borderWidth },
    },
  }) => `${borderWidth}px`};
  border-color: transparent;
  border-style: solid;
  /* ========================= */

  @media (hover: hover) {
    :hover {
      border-color: ${({
        item: {
          border: { borderHoverColor },
        },
      }) => borderHoverColor};

      /* ========================= */
      padding: ${({
        item: {
          border: { width },
        },
      }) => `${width}px`};
      background: ${({
        item: {
          border: { hoverColor },
        },
      }) => hoverColor};
      /* ========================= */
    }
    :active {
      border-width: 0;

      /* ========================= */
      padding: ${({
        item: {
          border: { width },
        },
      }) => `${width}px`};
      background: ${({
        item: {
          border: { pressedColor },
        },
      }) => pressedColor};
      /* ========================= */

      & > div > div {
        user-select: none;
        filter: contrast(0%) brightness(0%) blur(0.1px) opacity(0.3); // ?
      }
    }
  }
`;

type ProviderContainer = {
  item: Theme["item"];
  borderRadius: Theme["popup"]["border"]["borderRadius"];
};
const SProviderContainer = styled.div<ProviderContainer>`
  width: 100%;
  height: 100%;
  flex-grow: 1;

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s ease-in-out;

  /* ========================= */
  border-radius: ${({ borderRadius }) => `${borderRadius / 2}px`};
  background: ${({
    item: {
      background: { color },
    },
  }) => color};
  /* ========================= */

  background-position: center;
`;

type IconSection = {
  item: Theme["item"];
};
const SIconSection = styled.div<IconSection>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* ========================= */
  width: ${({
    item: {
      border: { width },
    },
  }) => `${56 - width}px`};
  padding-left: ${({
    item: {
      border: { width },
    },
  }) => `${8 - width}px`};
  /* ========================= */
`;

type MainSection = {
  item: Theme["item"];
};
const SMainSection = styled.div<MainSection>`
  box-sizing: border-box;

  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;

  min-height: 60px;

  text-align: left;

  /* ========================= */
  padding: ${({
    item: {
      border: { width },
    },
  }) => `${14 - width}px`};
  padding-left: 0;
  /* ========================= */
`;

const STitle = styled.div`
  font-size: 18px;
  line-height: 20px;
`;

type SubTitleText = {
  letterSpacing?: number | string;
};
const SSubTitleText = styled.div<SubTitleText>`
  font-size: 10px;
  line-height: 10px;

  letter-spacing: ${({ letterSpacing }) =>
    typeof letterSpacing === "number" ? `${letterSpacing}px` : letterSpacing};

  text-align: start;
`;

const SSubTextList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const SSubTextItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  line-height: 10px;

  > span {
    margin-top: 0.3em;
  }
`;

type Img = {
  color?: string;
  maxHeight: number | string;

  children: any;
};
const SImg = styled.div<Img>`
  max-height: ${({ maxHeight }) =>
    typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight};

  svg,
  svg path {
    fill: ${({ color }) => color};
  }

  svg {
    height: ${({ maxHeight }) =>
      typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight};
  }
`;

export type ProviderCardProps = WalletDisplay & {
  isProviderExist: boolean;
  isCurrentBrowser: boolean;
  themeObject: Theme;
  onClick?: () => void; // todo ?
  connectorType?: ConnectorType;
  browser?: string; // lowercase
  options?: WayToConnect["options"];
  isFirst?: boolean;
};
export const ProviderCard = ({
  name,
  logo,
  description,
  isProviderExist,
  isCurrentBrowser,
  themeObject,
  onClick,
  connectorType,
  browser,
  options,
  isFirst,
}: ProviderCardProps) => {
  const isShowBadBrowserWarning = !!isFirst;

  const NotSupportedBadge = (
    <>
      {!isCurrentBrowser && (
        <notSupported.browser.Badge
          themeObject={themeObject}
          browserName={Browsers.googleChrome}
        />
      )}
      {isCurrentBrowser && (
        <notSupported.provider.Badge
          themeObject={themeObject}
          providerName={name}
          isVisualHide={true}
        />
      )}
    </>
  );

  // это плашка под экстеншенами в случае их отсутствия
  const NotSupportedText = (
    <>
      {!isCurrentBrowser && (
        <SSubTitleText>
          <notSupported.browser.Text browserName={Browsers.googleChrome} />
        </SSubTitleText>
      )}
      {isCurrentBrowser && !isProviderExist && (
        <SSubTitleText>
          <notSupported.provider.Text providerName={name} />
        </SSubTitleText>
      )}
    </>
  );

  const getOptionsSubText = () => {
    switch (connectorType) {
      case "mobile":
        const list = options?.devises;
        const elements = Array.isArray(list)
          ? list.map(({ img, text, type }) => {
              return (
                type !== "apk" && (
                  <SSubTextItem>
                    {!!logo && (
                      <>
                        {typeof img === "string" ? (
                          <img src={img} alt={type || ""} height={12} />
                        ) : (
                          <SImg
                            color={themeObject.item.icon.subTitle.color}
                            maxHeight={12}
                          >
                            {img}
                          </SImg>
                        )}
                      </>
                    )}
                    <span>{text}</span>
                  </SSubTextItem>
                )
              );
            })
          : null;
        return elements?.length ? (
          <SSubTextList>{elements}</SSubTextList>
        ) : null;

      case "ios":
      case "android":
        return typeof options?.text === "string" ? options.text : null;

      default:
        break;
    }
  };

  const optionsSubText = getOptionsSubText();

  const getLinkFromArr = (
    arr: { browser: string; link: string | null }[] | undefined | string
  ) => {
    if (!Array.isArray(arr)) return undefined;

    const current = arr?.find(
      (extensionObj) => extensionObj.browser === browser
    );
    const fallback = arr?.find(
      (extensionObj) => extensionObj.browser === "chrome"
    );

    return current || fallback;
  };

  const getCardLink = () => {
    // чужой браузер, вернём ссылку на установку
    console.log(`connectorType::`, connectorType);
    console.log(`isCurrentBrowser::`, isCurrentBrowser);
    console.log(`isProviderExist::`, isProviderExist);
    console.log(`options::`, options);
    if (connectorType === "extension" && !isCurrentBrowser) {
      return getLinkFromArr(options?.installExtensionLink)?.link as
        | string
        | undefined;
    } else if (
      connectorType === "extension" &&
      isCurrentBrowser &&
      !isProviderExist
    ) {
      return getLinkFromArr(options?.installExtensionLink)?.link as
        | string
        | undefined;
    } else if (connectorType === "ios" || connectorType === "android") {
      return options?.deepLink as string | undefined;
    }
  };

  const cardLink = getCardLink();

  // список способов подключения
  return (
    <SWrapper>
      <pre>cardLink: {String(cardLink)}</pre>
      {isShowBadBrowserWarning && NotSupportedBadge}
      <a
        {...(cardLink
          ? {
              href: cardLink,
            }
          : {})}
        target="_blank"
        rel="noopener noreferrer"
      >
        <SProviderContainerWrapper
          item={themeObject.item}
          popup={themeObject.popup}
          isShowCheckWarnings={isShowBadBrowserWarning}
        >
          <SProviderContainer
            item={themeObject.item}
            borderRadius={themeObject.popup.border.borderRadius}
            onClick={onClick}
          >
            <SIconSection item={themeObject.item}>
              {!!logo && (
                <>
                  {typeof logo === "string" ? (
                    <img src={logo} alt={name} style={{ maxHeight: "24px" }} />
                  ) : (
                    <SImg
                      color={themeObject.item.icon.main.color}
                      maxHeight={24}
                    >
                      {logo}
                    </SImg>
                  )}
                </>
              )}
            </SIconSection>
            <SMainSection item={themeObject.item}>
              <STitle>{name}</STitle>
              {!!description && <SSubTitleText>{description}</SSubTitleText>}
              {!!optionsSubText && (
                <SSubTitleText letterSpacing={1.02}>
                  {optionsSubText}
                </SSubTitleText>
              )}
              {NotSupportedText}
            </SMainSection>
          </SProviderContainer>
        </SProviderContainerWrapper>
      </a>
    </SWrapper>
  );
};
