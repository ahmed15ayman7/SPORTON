
import CardPost from "@/components/cards/CardPost";

import StoreCard from '@/components/cards/StoreCard'
import React from 'react'
interface Author {
    _id: string;
    id: string;
    name: string;
    image: string;
    sport: string;
  }
  
  interface Parms {
    id: string;
    image?: string;
    video?: string;
    userId: string | undefined;
    author: Author;
    content: string;
    createdAt: string;
  }
  
  const getRandomDate = (start: Date, end: Date): string => {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
  };
  
  // Example usage:
  const exampleAuthor: Author = {
    _id: "author1",
    id: "author1",
    name: "ahmed ayman",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZmFjZWJvb2svaW1nXzJmeTN5RnJLWjBHZEh0c2tMTXNmaTFTNXVGQyJ9",
    sport: "Football",
  };
  
  const exampleAuthor2: Author = {
    _id: "author1",
    id: "author1",
    name: "Ziad Deep",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ3BVNXF5UkVVRGVENHFLZTU5N3RRVU41amIifQ",
    sport: "Football",
  };
  const exampleAuthor3: Author = {
    _id: "author1",
    id: "author1",
    name: "Shaza",
    image: "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZmFjZWJvb2svaW1nXzJoSGtiR0p1TEhmZmlxSHQ4NE9iSjhQVUc1VCJ9",
    sport: "Football",
  };
  
  const exampleParms: Parms = {
    id: "1",
    userId: "user123",
    author: exampleAuthor,
    content: "  جزمه كوره نايك المقاس 43/44 سعره ٤٠٠ جنيه",
    image:"https://postcdn.haraj.com.sa/userfiles30/2024-07-16/1350x1800_415802F2-119B-4DDA-9DBC-B65E513B7A53.jpg/900/webp",
    createdAt: getRandomDate(new Date(2020, 0, 1), new Date()), // Random date between Jan 1, 2020 and now
  };
  const exampleParms2: Parms = {
    id: "2",
    userId: "user123",
    author: exampleAuthor2,
    content: "مضرب بابولا كوميت مقاس ٢٥ وزن ٢٣٠ سعر ٣٠٠",
    image:"https://images.dubizzle.com.eg/thumbnails/6888202-240x180.webp",
    createdAt: getRandomDate(new Date(2020, 0, 1), new Date()), // Random date between Jan 1, 2020 and now
  };
  const exampleParms3: Parms = {
    id: "3",
    userId: "user123",
    author: exampleAuthor3,
    content: "جوانتي بوكس",
    image:"",
    createdAt: getRandomDate(new Date(2020, 0, 1), new Date()), // Random date between Jan 1, 2020 and now
  };
  let arr=[exampleParms, exampleParms2,exampleParms3]
  
  
  const Page = async({params}:{params:{id:string}}) => {
    if (!params.id) return null;
      let product= arr.filter(e=>e.id === params.id)[0]
  return (

      <section className=" relative">
      <h1 className="hidden">{product?.content}</h1>
     

      <div className="my-7">
          <StoreCard  {...product} />
        </div>

        </section>

  )
}
export default Page;