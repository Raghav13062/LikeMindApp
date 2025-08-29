  import ChooseLocation from "../helper/ChooseLocation";
import PaidExpertTab from "../navigators/PaidExpertTab.tsx/PaidExpertTab";
import SharedTabNavigator from "../navigators/SharedTabNavigator/SharedTabNavigator";
import TabNavigator from "../navigators/UserTabNavigator.tsx/TabNavigator";
import ProfileSetup from "../screen/ Profile/ProfileSetup/ ProfileSetup";
import AddProfilePicture from "../screen/auth/AddProfilePicture";
 import CreatePassword from "../screen/auth/CreateNewPassword";
import LetGetYouStarted from "../screen/auth/LetGetYouStarted";
import Login from "../screen/auth/Login";
import OnboardingScreen from "../screen/auth/Onboarding";
import OtpScreen from "../screen/auth/OtpScreen";
import PasswordReset from "../screen/auth/PasswordReset";
 import SignUp from "../screen/auth/SignUp";
import Splash from "../screen/auth/Splash";
import UserTypeSelection from "../screen/auth/UserTypeSelection";
import ChooseRole from "../screen/chooseRole/ChooseRole";
import EditEventForm from "../screen/PaidExpert/EditEventForm/EditEventForm";
import EventForm from "../screen/PaidExpert/EventForm/EventForm";
 import ChangePasswordScreen from "../screen/privay/ChangePassword";
import HelpSupportScreen from "../screen/privay/HelpSupport";
import LegalPoliciesScreen from "../screen/privay/LegalPoliciesScreen";
import NotificationsSetting from "../screen/privay/NotificationsSetting";
import Creategroup from "../screen/SharedInterest/Creategroup/Creategroup";
import SharedChatDetails from "../screen/SharedInterest/SharedChat/SharedChatDetails/SharedChatDetails";
 import ChatDetails from "../screen/userHome/Chat/ChatDetails/ChatDetails";
import CommunitiesScreen from "../screen/userHome/CommunitiesScreen/CommunitiesScreen";
import EditProfile from "../screen/userHome/EditProfile/EditProfile";
import ExpertMarkertPlace from "../screen/userHome/ExpertMarkertPlace/ExpertMarkertPlace";
import FindAParter from "../screen/userHome/FindAParter/FindAParter";
import FindAParterDetils from "../screen/userHome/FindAParter/FindAParterDetils/FindAParterDetils";
import JoinSessions from "../screen/userHome/JoinSessions/JoinSessions";
import MarketProfileDetails from "../screen/userHome/MarketProfileDetails/MarketProfileDetails";
import BasicInformation from "../screen/userHome/ProfieStep/BasicInformation/BasicInformation";
import FAQ from "../screen/userHome/ProfieStep/FAQ/FAQ";
import InformationStep from "../screen/userHome/ProfieStep/InformationStep/InformationStep";
 import InformationStepFour from "../screen/userHome/ProfieStep/InformationStepFour/InformationStepFour";
import InformationStepSecond from "../screen/userHome/ProfieStep/InformationStepSecond/InformationStepSecond";
import InformationStepThird from "../screen/userHome/ProfieStep/InformationStepThird/InformationStepThird";
import ProfilePhots from "../screen/userHome/ProfieStep/ProfilePhots/ProfilePhots";
 
  import ScreenNameEnum from "./screenName.enum";

const _routes:any = {
  REGISTRATION_ROUTE: [
    {
      name: ScreenNameEnum.SPLASH_SCREEN,
      Component: Splash,
    },
  
    {
      name: ScreenNameEnum.SignUpScreen,
      Component: SignUp,
    },

    {
      name: ScreenNameEnum.LoginScreen,
      Component: Login,
    },
  
    {
      name: ScreenNameEnum.OnboardingScreen,
      Component: OnboardingScreen,
    },
    {
      name: ScreenNameEnum.EventForm,
      Component: EventForm,
    },
    {
      name: ScreenNameEnum.EditEventForm,
      Component: EditEventForm,
    },
    // {
    //   name: ScreenNameEnum.ChooseRoleScreen,
    //   Component: ChooseRoleScreen,
    // },
 
    {
      name: ScreenNameEnum.CommunitiesScreen,
      Component: CommunitiesScreen,
    },
 
    {
      name: ScreenNameEnum.ChooseRole,
      Component: ChooseRole,
    },
    {
      name: ScreenNameEnum.PasswordReset,
      Component: PasswordReset,
    },
    {
      name: ScreenNameEnum.CreatePassword,
      Component: CreatePassword,
    },
    {
      name: ScreenNameEnum.OtpScreen,
      Component: OtpScreen,
    },
    {
      name: ScreenNameEnum.UserTypeSelection,
      Component:UserTypeSelection,
    },
    {
      name: ScreenNameEnum.SharedChatDetails,
      Component:SharedChatDetails,
    },
    {
      name: ScreenNameEnum.ProfileSetup,
      Component:ProfileSetup,
    },
    {
      name: ScreenNameEnum.LetGetYouStarted,
      Component:LetGetYouStarted,
    },
    
    {
      name: ScreenNameEnum.AddProfilePicture,
      Component:AddProfilePicture,
    },
    
    {
      name: ScreenNameEnum.TabNavigator,
      Component:TabNavigator,
    },
    
    {
      name: ScreenNameEnum.PaidExpertTab,
      Component:PaidExpertTab,
    },
    
    
    {
      name: ScreenNameEnum.SharedTabNavigator,
      Component:SharedTabNavigator,
    },
    
    
  
   
    {
      name: ScreenNameEnum.LegalPoliciesScreen,
      Component:LegalPoliciesScreen,
    },
    {
      name: ScreenNameEnum.HelpSupportScreen,
      Component:HelpSupportScreen,
    },
    {
      name: ScreenNameEnum.NotificationsSetting,
      Component:NotificationsSetting,
    },
     
    {
      name: ScreenNameEnum.ChangePasswordScreen,
      Component:ChangePasswordScreen,
    },
   
     
    {
      name: ScreenNameEnum.ChatDetails,
      Component:ChatDetails,
    },
    {
      name: ScreenNameEnum.ExpertMarkertPlace,
      Component:ExpertMarkertPlace,
    },
    {
      name: ScreenNameEnum.FindAParter,
      Component:FindAParter,
    },
    {
      name: ScreenNameEnum.FindAParterDetils,
      Component:FindAParterDetils,
    },
  
 
    {
      name: ScreenNameEnum.MarketProfileDetails,
      Component:MarketProfileDetails,
    },
    {
      name: ScreenNameEnum.BasicInformation,
      Component:BasicInformation,
    },
    {
      name: ScreenNameEnum.InformationStep,
      Component:InformationStep,
    },
    {
      name: ScreenNameEnum.InformationStepThird,
      Component:InformationStepThird,
    },
    {
      name: ScreenNameEnum.InformationStepFour,
      Component:InformationStepFour,
    },
    {
      name: ScreenNameEnum.ProfilePhots,
      Component:ProfilePhots,
    },
    {
      name: ScreenNameEnum.Creategroup,
      Component:Creategroup,
    },
    {
      name: ScreenNameEnum.FAQ,
      Component:FAQ,
    },
    {
      name: ScreenNameEnum.JoinSessions,
      Component:JoinSessions,
    },
    {
      name: ScreenNameEnum.EditProfile,
      Component:EditProfile,
    },
    // {
    //   name: ScreenNameEnum.BasicInformation,
    //   Component:InformationStepThird,
    // },
 

    {
      name: ScreenNameEnum.InformationStepSecond,
      Component:InformationStepSecond,
    },
 

 
       {
      name:'chooseLocation',
      Component:ChooseLocation,
    },

   
 
  ],

 
};

export default _routes;
