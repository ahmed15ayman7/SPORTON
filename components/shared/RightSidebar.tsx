"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { UserData, fetchAllUser } from "@/lib/actions/user.actions";
import { SugCard } from "../cards/sugCard";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import UserCardSkeleton from "../cards/UserCardSkeleton";
import { GuestEmail } from "@/constants/data";
import { fetchAllRooms } from "@/lib/actions/room.actions";

const useFetchUsers = () => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllUser({
        searchString: "",
        pageNum: pageParam,
        pageSize: 15,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.isNext ? lastPage.pageNum + 1 : undefined;
    },
    initialPageParam: 1, // Start from the first page
  });
};
const useFetchUsersChat = (userId: string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetchAllRooms({
        searchString: "",
        pageNum: 1,
        pageSize: 100,
        sortBy: -1,
        userId,
      }),
  });
};
interface Props {
  isChat?: boolean;
  Ids?: string;
  isxl?: boolean;
  islg?: boolean;
  setChat?: any;
  refetchData?: number;
  userInfo: UserData;
}

const RightSidebar = ({
  isChat,
  userInfo,
  Ids,
  isxl,
  islg,
  setChat,
  refetchData,
}: Props) => {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    isChat
      ? {
          data: undefined,
          fetchNextPage: undefined,
          hasNextPage: undefined,
          isFetchingNextPage: undefined,
          refetch: undefined,
        }
      : useFetchUsers();
  const { data: usersDataChat, refetch: refetch2 } = isChat
    ? useFetchUsersChat(userInfo._id)
    : { data: undefined, refetch: undefined };
  useEffect(() => {
    refetch2 && refetch2();
  }, [refetchData]);
  useEffect(() => {
    if (!hasNextPage) return; // Stop observing if there's no more pages

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 1.0, // Trigger when 100% of the element is visible
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if ("redirect" in userInfo!) {
    router.replace(userInfo.redirect);
    return null; // Ensure no content is returned during redirection
  }

  const users = data?.pages.flatMap((page) => page.users) || [];
  let isGuest = (userInfo as UserData).email === GuestEmail;
  let usersChat: UserData[] = [];
  if (usersDataChat) {
    usersDataChat?.Rooms?.forEach((e) =>
      e.users.forEach((a: UserData) => {
        if (a._id !== (userInfo as UserData)._id) {
          usersChat.push(a);
        }
      })
    );
  }
  return (
    <section
      className={`rightsidebar custom-scrollbar ${
        isxl ? "w-full" : "max-xl:hidden"
      } ${isChat ? ` p-0 ${!Ids && " px-1"} w-96` : "p-3 pt-28 w-72"}`}
    >
      <div className="flex flex-1 flex-col justify-start">
        {!isChat && (
          <h1 className="text-body-bold head-text text-[25px] text-white mb-6">
            Player
          </h1>
        )}
        <div id="right">
          {userInfo && (
            <SugCard
              isGuest={isGuest}
              result2={
                isChat && usersChat
                  ? JSON.stringify(usersChat)
                  : users.length > 0
                  ? JSON.stringify(users)
                  : JSON.stringify([])
              }
              userInfo2={JSON.stringify(userInfo as UserData)}
              type={"users"}
              isChat={isChat}
              Ids={Ids || ""}
              islg={islg}
              refrish={fetchNextPage} // Trigger next page fetch on refresh
              setChat={setChat}
            />
          )}
        </div>

        {isFetchingNextPage && (
          <div className="mt-4">
            <UserCardSkeleton is />
          </div>
        )}
        <div ref={loadMoreRef} className="mt-4"></div>
        {/* This div triggers the next page load */}
      </div>
    </section>
  );
};

export default RightSidebar;
