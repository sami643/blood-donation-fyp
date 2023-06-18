import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home/.";
import About from "./Pages/About";
import BloodInfo from "./Pages/BloodInfo";
import FinancialSupport from "./Pages/FinancialSupport";
import Partner from "./Pages/Partners";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import OrgSign from "./Pages/OrgSignup";
import ForgotPassword1 from "./Pages/ForgotPassword";
import ForgotPasswordVerify from "./Pages/ForgotPasswordVerify";
import NewPassword from "./Pages/NewPassword";
import VerifyEmail from "./Pages/SignUpVerify";

// Navbar Component
import "bootstrap/dist/css/bootstrap.min.css";
//Admin
import OrgSignUp from "./AdminScreen/OrgSignUp";
import Camping from "./AdminScreen/Camping";
import FeedBack from "./AdminScreen/FeedBack";
import ChangePassword from "./AdminScreen/ChangePasssword";
import Donor from "./AdminScreen/Donor";
import Recipient from "./AdminScreen/Recipient";
import NewCamp from "./AdminScreen/NewCamp";
import ExistingCamp from "./AdminScreen/ExistingCamps";
import EditCamp from "./AdminScreen/EditCamp";
import AAbout from "./AdminScreen/About";
import UpdateBloodInfo1 from "./AdminScreen/UpdateBloodInfo";
import CContact from "./AdminScreen/Contact";

// Donor
import DHome from "./Donor/Donor";
import WhoNeedBlood from "./Donor/WhoNeedBlood";
import SearchResult from "./Donor/SearchResult";
import DonateBloodSaveLife from "./Donor/DonateBloodSaveLife";
import Message from "./Donor/NewDonorPost";
import ViewDonationRecord from "./Donor/ViewDonationRecord";
import EditRecord from "./Donor/EditRecord";
import MessagesDonor from "./Donor/Messenger";
import ChangePasswordDonor from "./Donor/ChangePasssword";
// Recipent
import RHome from "./Recipent/Recipent";
import NeedBlood from "./Recipent/NeedBlood";
import RSearchResult from "./Recipent/RecipentsSearchResult";
import RDonateBloodSaveLife from "./Recipent/DonateBloodSaveLife";
import RMessage from "./Recipent/NewBloodReq";
import RecipentMessage from "./Recipent/Messenger";
import RViewDonationRecord from "./Recipent/ViewDonationRecord";
import REditRecord from "./Recipent/EditRecord";
import ChanggePasswordRecipent from "./Recipent/ChangePasssword";
// Super Admin
import Admin_SignUp from "./SuperAdmin/Adminsignup";
import Admin_list from "./SuperAdmin/Adminlist";
import Super_feedback from "./SuperAdmin/FeedBack";
import Super_donor from "./SuperAdmin/Donor";
import Super_recipent from "./SuperAdmin/Recipient";
import Super_newcamp from "./SuperAdmin/NewCamp";
import Super_existing from "./SuperAdmin/ExistingCamps";
import SuperContact from "./SuperAdmin/Contact";
import Super_about from "./SuperAdmin/About";
import Super_easypaisa from "./SuperAdmin/WithEasyPaisa";
import Super_jazzcash from "./SuperAdmin/WithJazzCash";
import Super_password from "./SuperAdmin/ChangePasssword";
import UpdateBloodInfo12 from "./SuperAdmin/UpdateBloodInfo";
import Super_OrgSignup from "./SuperAdmin/OrgSignUp";
import Super_camping from "./SuperAdmin/Camping";
import ChangeJazzCashNo from "./SuperAdmin/ChangeJazzCashNo";
import ChangeEasyPaisaNo from "./SuperAdmin/ChangeEasyPaisaNo";

//user
import UserHome from "./User/Home";
import BloodInfo1 from "./User/BloodInfo";
import FinancialSupport_user from "./User/FinancialSupport";
import Changepassword_user from "./User/ChangePasssword";
import Donate_blood_user from "./User/WhoNeedBlood";
import SearchResult_user from "./User/SearchResult";
// Organization
import ExistingCamps from "./Organization/ExistingCamps";
import EditCampOrg from "./Organization/EditCamp";
import NewCampOrg from "./Organization/NewCamp";
import DeleteCampOrg from "./Organization/DeleteCamp";
import PasswordOrg from "./Organization/ChangePasssword";
import AuthContext from "./auth/context";
import { ProtectedRoute } from "./redirect-to-dashboard";

export default function AllComponet() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blood-info" element={<BloodInfo />} />
        <Route path="/financial-support" element={<FinancialSupport />} />
        <Route path="/home" element={<Home />} />
        <Route path="/partner" element={<Partner />} />
        <Route
          path="/sign-in"
          element={
            <ProtectedRoute>
              {" "}
              <SignIn />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/user/sign-up" element={<SignUp />} />
        <Route path="/orgsign-up" element={<OrgSign />} />
        <Route path="/forgot-password" element={<ForgotPassword1 />} />
        <Route
          path="/forgot-password/verify"
          element={<ForgotPasswordVerify />}
        />
        <Route path="/set-new-password" element={<NewPassword />} />
        {/* Admin panel here */}
        <Route path="/admin/orgsignup" element={<OrgSignUp />} />
        <Route path="/admin/" element={<Camping />} />
        <Route path="/admin/camping" element={<Camping />} />
        <Route path="/admin/feedback" element={<FeedBack />} />
        <Route path="/admin/update-password" element={<ChangePassword />} />
        <Route path="/admin/donor" element={<Donor />} />
        <Route path="/admin/recipient" element={<Recipient />} />
        <Route path="/admin/new-camp" element={<NewCamp />} />
        <Route path="/admin/existing-camp" element={<ExistingCamp />} />
        <Route path="/admin/edit-camp" element={<EditCamp />} />
        <Route path="/admin/about" element={<AAbout />} />
        <Route path="/admin/update-blood-info" element={<UpdateBloodInfo1 />} />
        <Route path="/admin/contact" element={<CContact />} />
        <Route path="/user/donor" element={<DHome />} />
        <Route path="/user/donor/needblood" element={<WhoNeedBlood />} />
        <Route path="/user/donor/needblood/result" element={<SearchResult />} />
        <Route
          path="/user/donor/needblood/checkdonation"
          element={<DonateBloodSaveLife />}
        />
        <Route path="/user/donor/needblood/donor" element={<Message />} />
        <Route
          path="/user/donor/donationrecord"
          element={<ViewDonationRecord />}
        />
        <Route path="/user/donor/Editrecord" element={<EditRecord />} />
        <Route path="/user/donor/messenger" element={<MessagesDonor />} />
        <Route
          path="/user/donor/change-password"
          element={<ChangePasswordDonor />}
        />
        {/* Recipents */}
        <Route path="/user/recipent" element={<RHome />} />
        <Route path="/user/recipent/needblood" element={<NeedBlood />} />

        <Route path="/recipent/needblood/results" element={<RSearchResult />} />
        <Route
          path="/recipent/needblood/checkdonation"
          element={<RDonateBloodSaveLife />}
        />
        <Route path="/user/recipent/NewBloodReq" element={<RMessage />} />
        <Route path="/user/recipent/messenger" element={<RecipentMessage />} />
        <Route
          path="/user/recipent/change-password"
          element={<ChanggePasswordRecipent />}
        />

        <Route
          path="/user/recipent/donationrecord"
          element={<RViewDonationRecord />}
        />
        <Route path="/recipent/Editrecord" element={<REditRecord />} />
        {/* Super Admin Starts here */}
        <Route path="/super-admin/" element={<Admin_SignUp />} />
        <Route path="/super-admin/admin-list" element={<Admin_list />} />
        <Route path="/super-admin/admin-singup" element={<Admin_SignUp />} />
        <Route path="/super-admin/feedback" element={<Super_feedback />} />
        <Route path="/super-admin/donor" element={<Super_donor />} />
        <Route path="/super-admin/recipent" element={<Super_recipent />} />
        <Route path="/super-admin/new-camp" element={<Super_newcamp />} />
        <Route path="/super-admin/existing-camp" element={<Super_existing />} />
        <Route path="/super-admin/contact" element={<SuperContact />} />
        <Route path="/super-admin/about" element={<Super_about />} />
        <Route
          path="/super-admin/update-blood-info"
          element={<UpdateBloodInfo12 />}
        />
        <Route path="/super-admin/easypaisa" element={<Super_easypaisa />} />
        <Route path="/super-admin/jazzcash" element={<Super_jazzcash />} />
        <Route path="/super-admin/password" element={<Super_password />} />
        <Route path="/super-admin/orgsignup" element={<Super_OrgSignup />} />
        <Route path="/super-admin/camping" element={<Super_camping />} />
        <Route
          path="/super-admin/changejazzcash"
          element={<ChangeJazzCashNo />}
        />
        <Route
          path="/super-admin/change_easypaisa"
          element={<ChangeEasyPaisaNo />}
        />
        {/* User */}
        <Route path="/user" element={<UserHome />} />
        <Route path="/user/blood-info" element={<BloodInfo1 />} />
        <Route
          path="/user/finacial-support"
          element={<FinancialSupport_user />}
        />
        <Route path="/user/change-password" element={<Changepassword_user />} />
        <Route path="/user/donate-blood" element={<Donate_blood_user />} />
        <Route path="/user/search-result" element={<SearchResult_user />} />
        {/* Organization */}
        <Route path="/organization" element={<NewCampOrg />} />
        <Route path="/organization/existing-camp" element={<ExistingCamps />} />
        <Route path="/organization/editcamp" element={<EditCampOrg />} />
        <Route path="/organization/newcamp" element={<NewCampOrg />} />
        <Route path="/organization/delete-camp" element={<DeleteCampOrg />} />
        <Route path="/organization/change-password" element={<PasswordOrg />} />
      </Routes>
    </div>
  );
}
