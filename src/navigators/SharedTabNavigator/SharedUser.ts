import imageIndex from "../../assets/imageIndex";
import ScreenNameEnum from "../../routes/screenName.enum";
import Explore from "../../screen/SharedInterest/Explore/Explore";
import HoneShared from "../../screen/SharedInterest/HoneShared/HoneShared";
import Meetups from "../../screen/SharedInterest/Meetups/Meetups";
import SharedChat from "../../screen/SharedInterest/SharedChat/SharedChat";
  import Profile from "../../screen/userHome/Profile/Profile";
 
const SharedUser = [
  {
    name: ScreenNameEnum.HoneShared,
    Component: HoneShared,
    label: "Home",
    logo: imageIndex.Home,
    logo1: imageIndex.HomeActive,
  },
 
  {
    name: ScreenNameEnum.Explore,
    Component: Explore,
    label: "Explore",
    logo: imageIndex.discovers,
    logo1: imageIndex.discoverActive,
  },
  {
    name: ScreenNameEnum.Meetups,
    Component: Meetups,
    label: "Meetups",
    logo: imageIndex.Clientsgray,
    logo1: imageIndex.client,
  },
  
  {
    name: ScreenNameEnum.SharedChat,
    Component: SharedChat,
    label: "Chat",
    logo: imageIndex.message,
    logo1: imageIndex.messageaActive,
  },
  {
    name: ScreenNameEnum.Profile,
    Component: Profile,
    label: "Profile",
    logo: imageIndex.profileGray,
    logo1: imageIndex.profileActive,
  },
  
  
];

export default SharedUser;
