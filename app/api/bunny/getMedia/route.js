import { headers } from "next/headers";

export async function GET(request) {
  console.log("dsdf");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // const basicAuthToken = Buffer.from(
  //   `${process.env.TC_API_LOGIN}:${process.env.TC_API_PASSWORD}`
  // ).toString("base64");

  // const resImg = await fetch("https://storage.bunnycdn.com/angelamore/%5C/", {
  //   headers: {
  //     accept: "application/json",
  //     AccessKey: process.env.BUNNY_STORAGE_ZONE_PASSWORD,
  //   },
  // });
  const resVid = await fetch(
    "https://video.bunnycdn.com/library/172976/videos?page=1&itemsPerPage=100&orderBy=date",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        AccessKey: process.env.BUNNY_TOKEN_SECURITY_KEY_PULL_ZONE,
      },
    }
  );
  //   get the bundles from database
  // let imgsRes = await resImg.json();
  let vidRes = await resVid.json();
  vidRes = vidRes.items;
  console.log(vidRes, "res res res res ");

  // imgsRes = imgsRes.map((obj) => {
  //   // This creates a new object, assigns all properties from the original object
  //   const newObj = { ...obj };

  //   // Rename the key by assigning the value to the new key and deleting the old key
  //   newObj.dataUploaded = newObj.DateCreated;
  //   newObj.title = newObj.ObjectName;
  //   newObj.type = "img";
  //   delete newObj.DateCreated;
  //   delete newObj.ObjectName;

  //   // Return the new object with the updated key
  //   return newObj;
  // });

  vidRes = vidRes.map((obj) => {
    obj.type = "vid";
    return obj;
  });

  // const fullMedia = [...imgsRes, ...vidRes];
  // console.log();
  // console.log();
  // console.log(imgsRes, "res res");
  console.log();
  console.log();
  console.log(vidRes, "res vid");
  console.log();
  console.log();
  // console.log(fullMedia);

  return Response.json({ data: vidRes });
}
