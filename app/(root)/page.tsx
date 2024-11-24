"use client";
import Home from "@/components/shared/MainHome";
import { useRouter } from "next/navigation";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/shared/Loader";
import PostCardSkeleton from "@/components/cards/PostCardSkeleton";
import { PostData } from "@/lib/actions/post.actions";
import {
  UserData,
  currentUserFun,
  fetchUser,
} from "@/lib/actions/user.actions";
import { setUser } from "@/lib/redux/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import ReloadButton from "@/components/shared/reload";

interface redirectType {
  redirect: string;
}
interface FetchPostsResponse {
  posts: PostData[];
  hasMore: boolean;
  nextPage: number;
}

const fetchPosts = async ({ pageParam = 0 }): Promise<FetchPostsResponse> => {
  const PAGE_SIZE = 4;
  const response = await axios.get(
    `/api/posts/fetch?pageNum=${pageParam}&pageSize=${PAGE_SIZE}`
  ); // Debugging statement
  return response.data;
};

export default function HOME() {
  const router = useRouter();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [action, setAction] = useState();
  const dispatch = useDispatch<AppDispatch>();
  // Fetch user information
  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => currentUserFun(),
  });

  // Fetch posts using useInfiniteQuery
  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error: postsError,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined;
    },
    initialPageParam: 0,
  });

  const loadMorePosts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    dispatch(setUser(userInfo as UserData));
  }, [userInfo]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      {
        root: null,
        rootMargin: "200px", // Increased margin for better user experience
        threshold: 1.0,
      }
    );

    const sentinelElement = sentinelRef.current;
    if (sentinelElement) {
      observer.observe(sentinelElement);
    }

    return () => {
      if (sentinelElement) {
        observer.unobserve(sentinelElement);
      }
    };
  }, [loadMorePosts, hasNextPage, isFetchingNextPage]);

  if (userError || postsError) return <ReloadButton />;
  if (userLoading || !postsData) return <PostCardSkeleton is />;

  // Explicitly cast postsData.pages to FetchPostsResponse[]
  const posts = postsData.pages.flatMap(
    (page) => (page as FetchPostsResponse).posts
  );
  if (!userInfo) return <Loader is />;
  if ((userInfo as redirectType).redirect) {
    router.replace((userInfo as redirectType).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }

  if (!user) router.replace("/sign-in");
  return (
    <>
      <div>
        <Home
          FPosts2={JSON.stringify(posts)}
          userInfo2={JSON.stringify(userInfo)}
          setAction={setAction}
        />
        {hasNextPage && !isFetchingNextPage && (
          <div ref={sentinelRef} style={{ height: "1px" }} />
        )}
        {isFetchingNextPage && (
          <div className="p-16 pt-0 flex flex-col gap-8 max-sm:p-0">
            <h1 className="hidden">SPORTON - The Ultimate Sports Community in Egypt</h1>
            <PostCardSkeleton is />
          </div>
        )}
      </div>
    </>
  );
}
