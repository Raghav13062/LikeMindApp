import imageIndex from "../../assets/imageIndex";
import ScreenNameEnum from "../../routes/screenName.enum";
import Clients from "../../screen/PaidExpert/Clients/Clients";
import Earnings from "../../screen/PaidExpert/Earnings/Earnings";
import HomePaid from "../../screen/PaidExpert/HomePaid/HomePaid";
import Sessions from "../../screen/PaidExpert/Sessions/Sessions";
import Chat from "../../screen/userHome/Chat/Chat";
import ExpertMarkertPlace from "../../screen/userHome/ExpertMarkertPlace/ExpertMarkertPlace";
import FindAParter from "../../screen/userHome/FindAParter/FindAParter";
import Home from "../../screen/userHome/Home/Home";
import Likedyou from "../../screen/userHome/Likedyou/Likedyou";
import Profile from "../../screen/userHome/Profile/Profile";
import Standout from "../../screen/userHome/Standout/Standout";

const UsePaidExpert = [
  {
    name: ScreenNameEnum.Home,
    Component: HomePaid,
    label: "Home",
    logo: imageIndex.Home,
    logo1: imageIndex.HomeActive,
  },
 
  {
    name: ScreenNameEnum.Clients,
    Component: Clients,
    label: "Clients",
    logo: imageIndex.Clientsgray,
    logo1: imageIndex.client,
  },
  {
    name: ScreenNameEnum.Sessions,
    Component: Sessions,
    label: "Sessions",
    logo: imageIndex.Sessions,
    logo1: imageIndex.SessionsAtive,
  },
  
  {
    name: ScreenNameEnum.Earnings,
    Component: Earnings,
    label: "Earnings",
    logo: imageIndex.Earnings,
    logo1: imageIndex.EarningsAtive,
  },
  {
    name: ScreenNameEnum.Profile,
    Component: Profile,
    label: "Profile",
    logo: imageIndex.profileGray,
    logo1: imageIndex.profileActive,
  },
  
  
];

export default UsePaidExpert;
