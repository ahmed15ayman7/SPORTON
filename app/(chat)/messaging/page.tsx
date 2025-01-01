"use client";
import ChatBox from "@/components/shared/ChatBox";
import RightSidebar from "@/components/shared/RightSidebar";
import { useEffect, useState, Suspense } from "react";
// import { Metadata } from "next";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { UserData, fetchUser } from "@/lib/actions/user.actions";
import ReloadButton from "@/components/shared/reload";
import Loader from "@/components/shared/Loader";

// export const metadata: Metadata = {
//   title: "SPORTEN | Messaging",
// };
interface redirectType {
  redirect: string;
}
export const dynamic = "force-dynamic";
const ChatPage = () => {
  let router = useRouter();
  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
  if ((userInfo as redirectType)?.redirect) {
    router.replace((userInfo as redirectType).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }

  let searchParams = useSearchParams();
  let ids = searchParams.get("ids");
  let hasIds = searchParams.has("ids");
  const [size, setSize] = useState<number>();
  const [refetchData, setRefetchData] = useState<number>();
  const [openChat, setChat] = useState<string>(hasIds ? ids! : "");
  useEffect(() => {
    setSize(window.innerWidth);
    window.addEventListener("resize", () => {
      setSize(window.innerWidth);
    });
  }, [size]);
  if (userError) return <ReloadButton />;
  if (userLoading) return <Loader is />;
  return (
    <div className=" bg-[url(/assets/bg.jpg)] bg-center max-sm:bg-cover bg-[length:100%_100%] bg-no-repeat">
      {/* sm and md */}
      {size && size < 1280 && (
        <div className="flex relative justify-center items-center overflow-hidden h-[100vh] ">
          <RightSidebar
            isChat
            isxl
            islg={false}
            userInfo={(userInfo as UserData)!}
          />
        </div>
      )}
      {/* lg */}
      {size && size >= 1280 && (
        <div className="flex relative justify-center items-center overflow-hidden h-[100vh] ">
          <RightSidebar
            isChat
            islg={true}
            refetchData={refetchData}
            userInfo={(userInfo as UserData)!}
            setChat={setChat}
            Ids={openChat}
          />
          <ChatBox Ids={openChat} setRefetchData={setRefetchData} />
        </div>
      )}
    </div>
  );
};

const Page = () => {
  <Suspense>
    <ChatPage />
  </Suspense>;
};
export default Page;
