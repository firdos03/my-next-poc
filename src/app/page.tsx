// import SignInPage from "./components/SignInPage";
// import SignUpPage from "./components/SignUpPage";
// import UserTypeSelector from "./components/UserTypeSelector";

// import WorkExperienceBar from "./components/WorkExperienceBar";

import EducationForm from "./components/EducationForm";
import ProfileForm from "./components/ProfileForm";
import SkillSetForm from "./components/SkillSetForm";
import UserProfile from "./components/UserProfile";
import WorkExperienceForm from "./components/WorkExperienceForm";
// import EducationDisplay from "./components/EducationDisplay";
// import SkillBubbles from "./components/SkillSet";
// import SkillProgressBar from "./components/SkillSet";
// import SkillSet from "./components/SkillSet";
// import UserProfile from "./components/UserProfile";

export default function Home() {
  return (
    <>
      {/* <SignInPage /> */}
      {/* <SignUpPage /> */}
      {/* <UserTypeSelector /> */}
      {/* <ProfileForm /> */}
      {/* <SkillBubbles /> */}
      <UserProfile />
      {/* <EducationDisplay /> */}
      {/* <SkillBubbles
        skills={[
          { name: 'React', percent: 20 },
          { name: 'TypeScript', percent: 15 },
          { name: 'Node.js', percent: 10 },
          // you can pass fewer than 10, it will auto-fill "No Data" circles
        ]}
      /> */}
      {/* <SkillSetForm /> */}
    </>
  );
}
