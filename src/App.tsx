import * as React from "react";

import "./App.css";
import {
  AmplifyProvider,
  Button,
  Card,
  Collection,
  Flex,
  Heading,
  IconBookmark,
  IconBookmarkBorder,
  IconFavorite,
  IconFavoriteBorder,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  SwitchField,
  Text,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const stories = [
  {
    title: "Wadi Rum, Aqaba, Jordan",
    description:
      "This national park includes the famous fjords of Milford, Dusky and Doubtful Sounds.",
    image:
      "https://images.unsplash.com/photo-1547234935-80c7145ec969?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80",
    location: "",
    user: "Juli Kosolapova",
  },
  {
    title: "Sandwich Harbour Historic, Namibia",
    description:
      "Three hours north of Auckland, this area features over 144 islands to explore.",
    image:
      "https://images.unsplash.com/photo-1515581247767-d78687bf2254?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
    user: "Ryan Cheng",
  },
  {
    title: "Ocean waves",
    description:
      "This hopping town is New Zealand's adventure capital and is located right on Lake Wakatipu.",
    image:
      "https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    user: "Christoffer Engström",
  },
];

const ProfileImage = ({
  index,
  src,
  size,
}: {
  index: number;
  src: string;
  size?: "small" | "large";
}) => (
  <View key={index} height="5rem" width="5rem">
    <Image
      borderRadius="50%"
      border="1px solid black"
      alt="wadi rum village"
      width="100%"
      height="100%"
      draggable="false"
      src={src}
    />
  </View>
);

interface IconSwitchProps {
  label: string;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
}

const IconSwitch = ({ iconOn, iconOff, label }: IconSwitchProps) => {
  const [checked, setChecked] = React.useState(false);
  return checked && iconOn ? (
    <Text as="span" onClick={() => setChecked(false)} tabIndex={0}>
      {iconOn}
    </Text>
  ) : (
    <Text
      as="span"
      tabIndex={0}
      aria-label={label}
      onClick={() => setChecked(true)}
    >
      {iconOff}
    </Text>
  );
};

function App() {
  const theme = useTheme();

  return (
    <AmplifyProvider>
      <header>
        <Heading level={1} className="App-header">
          <Text>Mettagram</Text>
        </Heading>
      </header>
      <Collection type="list" items={stories} direction="row">
        {(item, index) => <ProfileImage src={item.image} index={index} />}
      </Collection>

      <Collection
        type="list"
        items={stories}
        direction={{ base: "column", large: "row" }}
      >
        {(item, index) => (
          <Card
            as="section"
            key={index}
            padding="1rem"
            maxWidth="500px"
            minWidth="380px"
            boxShadow={`4px 4px 10px -4px ${theme.tokens.colors.neutral["60"]}`}
            border={`1px solid ${theme.tokens.colors.neutral["60"]}`}
          >
            <Flex
              padding={`${theme.tokens.space.xs} ${theme.tokens.space.xs}`}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="center">
                <ProfileImage src={item.image} index={index} />
                <Heading level={5} fontSize={theme.tokens.fontSizes.medium}>
                  {item.title}
                </Heading>
              </Flex>
              <Menu
                trigger={
                  <MenuButton variation="link" size="small">
                    ...
                  </MenuButton>
                }
              >
                <MenuItem>More like this...</MenuItem>
                <MenuItem>Hide</MenuItem>
                <MenuItem>Unfollow</MenuItem>
              </Menu>
            </Flex>
            <Text>{item.description}</Text>
            <View height="400px">
              <View height="100%" backgroundColor="black">
                <Image
                  alt="wadi rum village"
                  objectFit="contain"
                  objectPosition="center"
                  height="100%"
                  width="100%"
                  src={item.image}
                />
              </View>
            </View>
            <Flex className="actions" fontSize={theme.tokens.fontSizes.xxl}>
              <IconSwitch
                label="favorite"
                iconOn={<IconFavorite />}
                iconOff={<IconFavoriteBorder />}
              />
              <IconSwitch
                label="favorite"
                iconOff={<IconBookmarkBorder />}
                iconOn={<IconBookmark />}
              />
            </Flex>
          </Card>
        )}
      </Collection>
    </AmplifyProvider>
  );
}

export default App;
