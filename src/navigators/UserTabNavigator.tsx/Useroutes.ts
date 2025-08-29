import imageIndex from "../../assets/imageIndex";
import ScreenNameEnum from "../../routes/screenName.enum";
import Chat from "../../screen/userHome/Chat/Chat";
import ExpertMarkertPlace from "../../screen/userHome/ExpertMarkertPlace/ExpertMarkertPlace";
import FindAParter from "../../screen/userHome/FindAParter/FindAParter";
import Home from "../../screen/userHome/Home/Home";
import Likedyou from "../../screen/userHome/Likedyou/Likedyou";
import Profile from "../../screen/userHome/Profile/Profile";
import Standout from "../../screen/userHome/Standout/Standout";

const Useroutes = [
  {
    name: ScreenNameEnum.Home,
    Component: Home,
    label: "Home",
    logo: imageIndex.Home,
    logo1: imageIndex.HomeActive,
  },
 
  {
    name: ScreenNameEnum.Standout,
    Component: Standout,
    label: "Standouts",
    logo: imageIndex.discovers,
    logo1: imageIndex.discoverActive,
  },
  {
    name: ScreenNameEnum.Likedyou,
    Component: Likedyou,
    label: "Liked you",
    logo: imageIndex.Favorite,
    logo1: imageIndex.heart,
  },
  
  {
    name: ScreenNameEnum.Chat,
    Component: Chat,
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

export default Useroutes;
