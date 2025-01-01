"use client";
import UserCard from "@/components/cards/UserCard";
import PostTab from "@/components/shared/PostTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import Chart from "@/components/chart/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants/icons";
import {
  UserData,
  fetchUser,
  fetchUserPosts,
} from "@/lib/actions/user.actions";
import Image from "next/image";
import Loader from "@/components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import ReloadButton from "@/components/shared/reload";
import { GuestEmail } from "@/constants/data";
const Profile = ({ params }: { params: { id: string } }) => {
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    error: userInfoError,
  } = useQuery({
    queryKey: ["user", params.id],
    queryFn: () => fetchUser(params.id),
  });

  const {
    data: MyInfo,
    isLoading: isMyInfoLoading,
    error: myInfoError,
  } = useQuery({
    queryKey: ["myUser"],
    queryFn: () => fetchUser(),
  });

  const {
    data: result,
    isLoading: isPostsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => fetchUserPosts(params.id),
    enabled: !!userInfo, // Fetch posts only if userInfo is available
  });

  const friends =
    params.id === (MyInfo as UserData)?._id
      ? (MyInfo as UserData)?.friends
      : (userInfo as UserData)?.friends;

  const postsAchievements = result?.posts?.filter(
    (e) => e?.isAchievement === "1"
  );

  const result2 = {
    ...result,
    posts: postsAchievements || [],
  };

  if (isUserInfoLoading || isMyInfoLoading || isPostsLoading) {
    return <Loader is />;
  }

  if (userInfoError || myInfoError || postsError) {
    console.error(
      "Error fetching data:",
      userInfoError || myInfoError || postsError
    );
    // Handle error, perhaps show a message to the user
    return <ReloadButton />;
  }
  let isGuest = (userInfo as UserData).email === GuestEmail;
  return userInfo &&
    MyInfo &&
    friends &&
    result &&
    result2 &&
    postsAchievements ? (
    <section className="">
      <h1 className="hidden">{(userInfo as UserData).name}</h1>
      <ProfileHeader
        isGuest={isGuest}
        accountId={(userInfo as UserData)._id}
        userId={(userInfo as UserData).id}
        myId={(MyInfo as UserData)?._id}
        userAuthId={(MyInfo as UserData).id}
        friends={friends}
        sport={(userInfo as UserData).sport}
        name={(userInfo as UserData).name}
        username={(userInfo as UserData).username}
        image={(userInfo as UserData).image}
        bio={(userInfo as UserData).bio}
        type={"User"}
      />
      <div className="mt-8">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab1">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  height={24}
                  width={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label !== "Analytics" && (
                  <p className="bg-dark-3 border border-light-1 rounded-full px-2 text-base-regular">
                    {tab.label === "Posts"
                      ? (userInfo as UserData).posts?.length
                      : tab.label === "Team"
                      ? friends?.length
                      : tab.label === "Achievements"
                      ? postsAchievements?.length
                      : null}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full mt-8 text-light-1"
            >
              {tab.value === "friends" ? (
                <section className="flex flex-col gap-10">
                  {(userInfo as UserData).friends.map((friend: any) => (
                    <UserCard key={friend.id} person={JSON.stringify(friend)} />
                  ))}
                </section>
              ) : tab.value === "posts" ? (
                result && (
                  <PostTab
                    isGuest={isGuest}
                    userId={(userInfo as UserData)._id}
                    result2={JSON.stringify(result)}
                    currentUserId={(MyInfo as UserData).id}
                    Team={friends ? friends : []}
                    accountType="User"
                  />
                )
              ) : tab.value === "analytics" ? (
                <Chart />
              ) : (
                result2 && (
                  <PostTab
                    isGuest={isGuest}
                    userId={(userInfo as UserData)._id}
                    result2={JSON.stringify(result2)}
                    currentUserId={(MyInfo as UserData).id}
                    Team={friends ? friends : []}
                    accountType="User"
                  />
                )
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  ) : (
    <Loader is />
  );
};

export default Profile;
