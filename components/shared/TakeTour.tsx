"use client";
import React from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

const TakeTour: React.FC = () => {
  const steps: Step[] = [
    {
      target: "#home",
      content:
        "Welcome to sporton home page! Here, you can explore posts and see the players around you.",
    },
    {
      target: "#new-post",
      content:
      "Create new posts with content, images, or videos to share with the community.",
    },
    {
      target: "#post",
      content: "View posts from players, ads, clubs, and agents!",
    },
    {
      target: "#right",
      content: "On the right, view players, message them, or add friends.",
    },
    {
      target: "#Home",
      content:
        "Welcome to the home page! Here, you can explore posts and see the players around you.",
    },
    {
      target: "#Search",
      content:
        "Looking for a specific player or sport? Simply use the search bar!",
    },
    {
      target: "#Notifications",
      content:
        "Stay in the loop with notifications. You’ll see updates about new posts, messages, and more!",
    },
    {
      target: "#Store",
      content:
        "Check out old products in the store! Whether it’s memorabilia or something new, it’s all here!",
    },
    {
      target: "#Profile",
      content:
        "Update your profile, share details about your favorite sports, and more.",
    },
    {
      target: "#Settings",
      content: "Go to settings to customize your account and preferences!",
    },
    {
      target: "#logout",
      content: "Click here to log out safely and securely.",
    },
   
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status as "skipped" | "finished")) {
      // يمكنك هنا التحكم إذا أردت إيقاف أي شيء عند انتهاء الجولة
    }
  };

  return (
    <div className="z-[10000000000000]">
      <Joyride
        steps={steps}
        run={true} // تشغيل الجولة تلقائيًا
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#333333",
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#877eff",
            textColor: "#fff",
            zIndex: 1000,
          },
        }}
      />
    </div>
  );
};

export default TakeTour;
