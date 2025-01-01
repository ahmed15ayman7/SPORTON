"use client";
import StoreCard from "@/components/cards/StoreCard";
import React, { useState } from "react";
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
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString();
};

// Example usage:
const exampleAuthor: Author = {
  _id: "author1",
  id: "author1",
  name: "ahmed ayman",
  image:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZmFjZWJvb2svaW1nXzJmeTN5RnJLWjBHZEh0c2tMTXNmaTFTNXVGQyJ9",
  sport: "Football",
};

const exampleAuthor2: Author = {
  _id: "author1",
  id: "author1",
  name: "Ziad Deep",
  image:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZ3BVNXF5UkVVRGVENHFLZTU5N3RRVU41amIifQ",
  sport: "Football",
};
const exampleAuthor3: Author = {
  _id: "author1",
  id: "author1",
  name: "Shaza",
  image:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZmFjZWJvb2svaW1nXzJoSGtiR0p1TEhmZmlxSHQ4NE9iSjhQVUc1VCJ9",
  sport: "Football",
};

const exampleParms: Parms = {
  id: "1",
  userId: "user123",
  author: exampleAuthor,
  content: "  جزمه كوره نايك المقاس 43/44 سعره ٤٠٠ جنيه",
  image:
    "https://mimg6cdn.haraj.com.sa/userfiles30/2024-04-28/1350x1800_8D0C2732-4604-431B-AEA1-9F95E48316B2.jpg",
  createdAt: getRandomDate(new Date(2024, 7, 5), new Date()), // Random date between Jan 1, 2020 and now
};
const exampleParms2: Parms = {
  id: "2",
  userId: "user123",
  author: exampleAuthor2,
  content: "مضرب بابولا كوميت مقاس ٢٥ وزن ٢٣٠ سعر ٣٠٠",
  image: "https://images.dubizzle.com.eg/thumbnails/6888202-240x180.webp",
  createdAt: getRandomDate(new Date(2024, 7, 5), new Date()), // Random date between Jan 1, 2020 and now
};
const exampleParms3: Parms = {
  id: "3",
  userId: "user123",
  author: exampleAuthor3,
  content: "جنيه 950 أدوات كيك بوكس كاملة",
  image: "https://images.dubizzle.com.eg/thumbnails/59484978-240x180.webp",
  createdAt: getRandomDate(new Date(2024, 7, 5), new Date()), // Random date between Jan 1, 2020 and now
};
let arr = [exampleParms, exampleParms2, exampleParms3];

const Page = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
        {arr.map((page) => (
          <StoreCard key={page.id} {...page} />
        ))}
      </div>
    </>
  );
};

export default Page;
