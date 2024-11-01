"use client";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadToS3 } from "@/lib/aws"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import FileUploader from "@/components/shared/FileUploader";
import Loader from "@/components/shared/Loader";
import { PostValidation2 } from "../../lib/validations/post";
import { createPost, fetchPostById } from "@/lib/actions/post.actions";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useQuery } from "@tanstack/react-query";
import CardPost from "../cards/CardPost";
import { Howl } from "howler";
import AWS from "aws-sdk";

type PostFormProps = {
  post?: any;
  isGuest: boolean;
  action?: "Create" | "Update";
  id: string;
  _id: string;
  image: string;
  name: string;
  username: string;
  friends: {
    _id: string;
    id: string;
    name: string;
    username: string;
    image: string;
  }[];
};

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

const PostForm = ({
  post,
  action,
  id,
  _id,
  image,
  isGuest,
  name,
  username,
  friends,
}: PostFormProps) => {
  const doneSound = new Howl({
    src: ["/sounds/done.mp3"],
    volume: 0.5,
  });
  let SearchParams = useSearchParams();
  let sh = SearchParams.get("sh");
  let idPost = SearchParams.get("id");
  let repost = SearchParams.get("repost");
  const { data: PostInfo, error: Posterror, isLoading: PostisLoading } = useQuery({
    queryKey: ["user", repost],
    queryFn: () => fetchPostById(repost!),
  });

  const navigate = useRouter();
  const { toast } = useToast();
  const [fileType, setFileType] = useState<string>("");
  const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PostValidation2>>({
    resolver: zodResolver(PostValidation2),
    defaultValues: {
      post: "",
      file: [],
      accountId: id,
      isAchievement: post ? post?.isAchievement : "0",
    },
  });

  let [show, setShow] = useState(sh ? true : false);
  const [files, setFiles] = useState<File[]>([]);

  function handleImageChange(e: File[], fieldChange: (value: string) => void) {
    let readfile = new FileReader();
    if (e && e.length > 0) {
      const file = e[0];
      setFiles(Array.from(e));
      readfile.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      readfile.readAsDataURL(file);
    }
  }

  const uploadFileToS3 = async (file: File): Promise<string> => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: `${file.name}-${Date.now()}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };
    const { Location } = await s3.upload(params).promise();
    return Location;
  };

  const onSubmit = async (value: z.infer<typeof PostValidation2>) => {
    if (isGuest) return;
    setIsLoadingCreate(true);
    navigate.push("/");
    let post_photo = "";
    const ImageFileName = `img_${Date.now()}.jpeg`; 
    if (fileType.length > 0 && files.length > 0) {
      await uploadToS3(files[0] , ImageFileName,`posts-${_id}`);
       post_photo = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/posts-${_id}/${ImageFileName}`; 
    }
    
    let isvideo =
    fileType === "video"
    ? { video: post_photo }
    : fileType === "image"
    ? { image: post_photo }
    : {};
    const newPost = await createPost({
      ...isvideo,
      text: value.post,
      author: _id,
      repost: PostInfo ? PostInfo._id : undefined,
      isAchievement: value.isAchievement,
    });
    if (!newPost) {
      toast({
        title: `${action} post failed. Please try again.`,
      });
    } else {
      toast({
        title: `Successfully ${action} post`,
      });
      doneSound.play();
    }
    setIsLoadingCreate(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex -translate-y-24 flex-col gap-6 w-full text-white max-w-5xl"
      >
        <div className="flex gap-4 items-center justify-between">
          <Button
            type="button"
            className="h-8 bg-dark-4 text-light-1 flex gap-2"
            onClick={() => navigate.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isGuest}
            className="bg-primary-500 h-8 hover:bg-primary-500 text-[#ffffff] flex gap-2 whitespace-nowrap"
          >
            {isLoadingCreate && <Loader />}
            Post
          </Button>
        </div>
        <div className={`border-white ${PostInfo ? "bg-dark-2 " : ""} border rounded-xl p-2 flex flex-col gap-6`}>
          <div className="flex gap-4">
            <Image
              src={image}
              alt={""}
              height={48}
              width={48}
              className={"rounded-full object-contain"}
            />
            <div className="flex flex-col gap-1">
              <h4 className="text-white text-body-bold">{name}</h4>
              <p className="text-gray-500 text-small-regular">@{username}</p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="post"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="What are you thinking?"
                    className={`${
                      show ? "h-20" : "h-40"
                    } bg-transparent text-white rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-transparent custom-scrollbar`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          {PostInfo ? (
            <div className={`border-white border rounded-xl`}>
              <CardPost
                isGuest={isGuest}
                setAction={() => {}}
                Team={friends}
                isAchievement={PostInfo?.isAchievement}
                id={PostInfo?._id}
                repost={PostInfo?.repost}
                video={PostInfo?.video}
                image={PostInfo?.image}
                parentId={PostInfo?.parentId}
                react={[]}
                currentId={id}
                userId={_id}
                author={PostInfo?.author}
                content={PostInfo?.text}
                createdAt={PostInfo?.createdAt}
                comments={[]}
              />
            </div>
          ) : (
            <div className="">
              <FormField
                control={form.control}
                name="isAchievement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Add to Achievements</FormLabel>
                    <RadioGroup
                      className="flex"
                      onChange={field.onChange}
                      name={field.name}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      disabled={field.disabled}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"1"} id="option-one" />
                        <Label htmlFor="option-one">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={"0"} id="option-two" />
                        <Label htmlFor="option-two">No</Label>
                      </div>
                    </RadioGroup>
                  </FormItem>
                )}
              />

              {show && (
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUploader
                          name={field.name}
                          setFileType={setFileType}
                          fileType={fileType}
                          fieldChange={(e: File[]) => handleImageChange(e, field.onChange)}
                          mediaUrl={post ? post?.imageUrl : ""}
                        />
                      </FormControl>
                      <FormMessage className="text-red" />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

// "use client";
// import * as z from "zod";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter, useSearchParams } from "next/navigation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
//   FormLabel,
// } from "@/components/ui/form";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import FileUploader from "@/components/shared/FileUploader";
// import Loader from "@/components/shared/Loader";
// import { PostValidation2 } from "../../lib/validations/post";
// import { createPost, fetchPostById } from "@/lib/actions/post.actions";
// import { useUploadThing } from "@/uploadthing";
// import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
// import { Label } from "../ui/label";
// import { useQuery } from "@tanstack/react-query";
// import CardPost from "../cards/CardPost";
// import { Howl } from "howler";
// type PostFormProps = {
//   post?: any;
//   isGuest:boolean;
//   action?: "Create" | "Update";
//   id: string;
//   _id: string;
//   image: string;
//   name: string;
//   username: string;
//   friends: {
//     _id: string;
//     id: string;
//     name: string;
//     username: string;
//     image: string;
// }[];
// };

// const PostForm = ({
//   post,
//   action,
//   id,
//   _id,
//   image,
//   isGuest,
//   name,
//   username,
//   friends,
// }: PostFormProps) => {
//   const doneSound = new Howl({
//     src: ["/sounds/done.mp3"], // استبدل هذا بمسار ملف الصوت الخاص بك
//     volume: 0.5,
//   });
//   let SearchParams = useSearchParams();
//   let sh = SearchParams.get("sh");
//   let idPost = SearchParams.get("id");
//   let repost = SearchParams.get("repost");
//   const { data: PostInfo, error: Posterror,isLoading: PostisLoading } = useQuery({
//     queryKey: ["user",repost],
//     queryFn: () => fetchPostById(repost!),
//   });
  
//   const navigate = useRouter();
//   const { toast } = useToast();
//   const [fileType, setFileType] = useState<string>("");
//   const [isLoadingCreate, setIsLoadingCreate] = useState<boolean>(false);
//   const form = useForm<z.infer<typeof PostValidation2>>({
//     resolver: zodResolver(PostValidation2),
//     defaultValues: {
//       post: "",
//       file: [],
//       // location: post ? post.location : "",
//       // tags: post ? post.tags.join(",") : "",
//       accountId: id,
//       isAchievement: post ? post?.isAchievement : "0",
//     },
//   });
//   let { startUpload } = useUploadThing("mediaPost");

//   let [show, setShow] = useState(sh ? true : false);
//   const [files, setFiles] = useState<File[]>([]);
//   // Query
//   function handleImageChange(e: File[], fieldChange: (value: string) => void) {
//     let readfile = new FileReader();
//     if (e && e.length > 0) {
//       const file = e[0];
//       setFiles(Array.from(e));
//       readfile.onload = async (e) => {
//         const imageDataUrl = e.target?.result?.toString() || "";
//         fieldChange(imageDataUrl);
//       };
//       console.log(
//         "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
//       );
//       readfile.readAsDataURL(file);
//     }
//   }
//   const onSubmit = async (value: z.infer<typeof PostValidation2>) => {
//     if (isGuest) return
//     setIsLoadingCreate(true);
//     navigate.push("/");
//     console.log("-------ohgfdfghjhg--------");
//     let post_photo = "";
//     if (fileType.length > 0) {
//       const imageRes = await startUpload(files);
//       console.log(imageRes);

//       if (imageRes && imageRes[0].fileUrl) {
//         post_photo = imageRes[0].fileUrl;
//       }
//     }

//     let isvideo =
//       fileType === "video"
//         ? { video: post_photo }
//         : fileType === "image"
//         ? { image: post_photo }
//         : {};
//     const newPost = await createPost({
//       ...isvideo,
//       text: value.post,
//       author: _id,
//       repost:PostInfo?PostInfo._id:undefined,
//       isAchievement: value.isAchievement,
//     });

//     if (!newPost) {
//       toast({
//         title: `${action} post failed. Please try again.`,
//       });
//     }
//     toast({
//       title: `successfully to ${action} post`,
//     });
//     doneSound.play();
//     setIsLoadingCreate(false);
//   };
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="flex -translate-y-24 flex-col gap-6 w-full text-white  max-w-5xl">
//         <div className="flex gap-4 items-center justify-between">
//           <Button
//             type="button"
//             className="h-8 bg-dark-4  text-light-1 flex gap-2"
//             onClick={() => navigate.back()}>
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             disabled={isGuest}
//             className="bg-primary-500 h-8 hover:bg-primary-500 text-[#ffffff] flex gap-2 whitespace-nowrap">
//             {isLoadingCreate && <Loader />}
//             Post
//           </Button>
//         </div>
//         <div className={`border-white ${PostInfo?"bg-dark-2 ":""} border rounded-xl p-2 flex flex-col gap-6`}>
//         <div className=" flex  gap-4">
//           <Image
//             src={image}
//             alt={""}
//             height={48}
//             width={48}
//             className={"rounded-full object-contain"}
//           />
//           <div className=" flex flex-col gap-1">
//             <h4 className=" text-white text-body-bold">{name}</h4>
//             <p className=" text-gray-500 text-small-regular">@{username}</p>
//           </div>
//         </div>
//         <FormField
//           control={form.control}
//           name="post"
//           render={({ field }) => (
//             <FormItem>
//               {/* <FormLabel className="text-white">Caption</FormLabel> */}

//               <FormControl>
//                 <Textarea
//                   placeholder="What are you thinking?"
//                   className={`${
//                     show ? "h-20" : "h-40"
//                   } bg-transparent text-white rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-transparent custom-scrollbar`}
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage className="text-red" />
//             </FormItem>
//           )}
//         />
//        {PostInfo?
//        <div className={`border-white  border rounded-xl  `}>
//        <CardPost
//        isGuest={isGuest}
//        setAction={()=>{}}
//        Team={friends}
//        isAchievement={PostInfo?.isAchievement}
//        id={PostInfo?._id}
//        repost={PostInfo?.repost}
//        video={PostInfo?.video}
//        image={PostInfo?.image}
//        parentId={PostInfo?.parentId}
//        react={[]}
//        currentId={id}
//        userId={_id}
//        author={PostInfo?.author}
//        content={PostInfo?.text}
//        createdAt={PostInfo?.createdAt}
//        comments={[]}
//        />
//        </div>
//        : <div className="">

   
//         <FormField
//           control={form.control}
//           name="isAchievement"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-white">Add to Achievements</FormLabel>
//               <RadioGroup
//                 className="flex"
//                 onChange={field.onChange}
//                 name={field.name}
//                 onBlur={field.onBlur}
//                 ref={field.ref}
//                 disabled={field.disabled}
//                 defaultValue={field.value}>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value={"1"} id="option-one" />
//                   <Label htmlFor="option-one">Yes</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value={"0"} id="option-two" />
//                   <Label htmlFor="option-two">No</Label>
//                 </div>
//               </RadioGroup>
//             </FormItem>
//           )}
//         />

//         {show && (
//           <FormField
//             control={form.control}
//             name="file"
//             render={({ field }) => (
//               <FormItem>
//                 <FormControl>
//                   <FileUploader
//                     name={field.name}
//                     setFileType={setFileType}
//                     fileType={fileType}
//                     fieldChange={(e: File[]) =>
//                       handleImageChange(e, field.onChange)
//                     }
//                     mediaUrl={post ? post?.imageUrl : ""}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red" />
//               </FormItem>
//             )}
//           />
//         )}
//         <div className="flex justify-end p-0 items-center">
//           <Button
//             type="button"
//             className="bg-transparent hover:bg-[#ffffff] hover:outline-primary-500 hover:outline  "
//             onClick={() => setShow(!show)}>
//             <Image
//               src={"/assets/createimg.svg"}
//               alt={""}
//               height={30}
//               width={30}
//               className={"rounded-full object-contain"}
//             />
//           </Button>
//         </div>
//         </div>}
//         </div>
//         {/* <FormField
//           control={form.control}
//           name="location"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-white">Add Location</FormLabel>
//               <FormControl>
//                 <Input type="text" className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3" {...field} />
//               </FormControl>
//               <FormMessage className="text-red" />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="tags"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-white">
//                 Add Tags (separated by comma " , ")
//               </FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Art, Expression, Learn"
//                   type="text"
//                   className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage className="text-red" />
//             </FormItem>
//           )}
//         /> */}
//       </form>
//     </Form>
//   );
// };

// export default PostForm;
