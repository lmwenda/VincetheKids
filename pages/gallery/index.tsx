import type { NextPage } from "next";
import React, { Attributes, useState } from "react";
import withAuth from "../../components/ProtectedURL";
import { database } from "../../utils/firebase";
import Image from "next/image";
import { motion } from "framer-motion";
import { NextRouter, useRouter } from "next/router";
import firebase from "firebase/compat/app";

const GalleryPage: NextPage = (): JSX.Element => {
  const navigate: NextRouter = useRouter();

  const [ albums, setAlbums ] = useState<firebase.firestore.DocumentData[]>([]);

  React.useEffect((): void => {
    const token: string | null = localStorage.getItem("vtc-token");
    const notLoggedIn = () => {
      if(typeof token !== "string") return navigate.push("/login");
    } 

    const getAlbums = async() => {
      const snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await database.collection("albums").get();
      
      let data: firebase.firestore.DocumentData[] = snapshot.docs.map((doc): firebase.firestore.DocumentData => doc.data())
      console.log(":", data);

      setAlbums(data);
  
    }

    notLoggedIn();
    getAlbums();
  }, [setAlbums]);

  return(
    <div className="flex flex-col space-y-14">
      <div className="mx-10 my-3 flex flex-col space-y-10 justify-center items-center md:justify-start md:space-y-0 md:flex-row md:space-x-5">
        {
          albums.map((album: firebase.firestore.DocumentData) => (
            <motion.div className="flex flex-col cursor-pointer  w-96 rounded justify-center items-center" whileHover={{
              position: "relative",
              zIndex: 1,
              background: "white",
              scale: 1.2,
              transition: {
                duration: .2
              }
            }}>
                <div>
                  <Image src={album.image} className="rounded hover:opacity-90" height={200} width={400} />
                </div>
        
                <div>
                  <h1 className="text-2xl hover:text-gray-500">{album.title}</h1>
                </div>
            </motion.div>
          ))
        }

      </div>
      <h1 className="text-center text-2xl">More coming soon...</h1>
    </div>
  );
}

export default withAuth(GalleryPage, true);
