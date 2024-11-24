"use client";
import ChatBox from "@/components/shared/ChatBox";
import Loader from "@/components/shared/Loader";
import RightSidebar from "@/components/shared/RightSidebar";
import ReloadButton from "@/components/shared/reload";
import { UserData, fetchUser } from "@/lib/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface redirectType {
  redirect: string;
}
const ChatPage = ({ params }: { params: { id: string } }) => {
  let router = useRouter();
  const {
    data: userInfo,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
  const [refetchData, setRefetchData] = useState<number>();
  if ((userInfo as redirectType)?.redirect) {
    router.replace((userInfo as redirectType).redirect);
    return null; // تأكد من عدم إرجاع أي محتوى أثناء التوجيه
  }
  if (userError) return <ReloadButton />;
  if (userLoading) return <Loader is />;

  return (
    <div className="flex relative justify-center items-center overflow-hidden h-[100vh]  lg:h-[100vh] bg-[url(/assets/bg.jpg)] bg-center max-sm:bg-cover bg-[length:100%_100%] bg-no-repeat">
      <RightSidebar
        refetchData={refetchData}
        userInfo={(userInfo as UserData)!}
        isChat
        Ids={params.id}
      />
      <ChatBox Ids={params.id} setRefetchData={setRefetchData} />
    </div>
  );
};

export default ChatPage;
