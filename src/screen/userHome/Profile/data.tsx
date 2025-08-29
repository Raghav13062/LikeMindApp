import imageIndex from "../../../assets/imageIndex";
import ScreenNameEnum from "../../../routes/screenName.enum";

 
const menuItems = [
    { title: "Profile", icon: imageIndex.ProfileYellow, screen: ScreenNameEnum.EditProfile },
    { title: "Change Password ", icon: imageIndex.delite, screen: ScreenNameEnum.ChangePasswordScreen },

    { title: "Notifications ", icon: imageIndex.NotificationsYellow,isSwitch:true, screen: ScreenNameEnum.NotificationScreen },
    { title: "Support", icon: imageIndex.Support, screen: ScreenNameEnum.HelpSupportScreen },

     { title: "Terms and Condition", icon: imageIndex.delite, screen: ScreenNameEnum.LegalPoliciesScreen },
    // { title: "Privacy Policy", icon: imageIndex.PrivacyPolic,screen: ScreenNameEnum.AboutFootb },
    { title: "Logout", icon: imageIndex.Logouts, screen: "Feedback" },
  ];
 

// Export all as a default object
 
export { menuItems}  