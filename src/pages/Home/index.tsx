import { useState, useEffect } from "react";

import { FaInstagram, FaLinkedin } from "react-icons/fa";

import Social from "../../components/Social";

import { db } from "../../services/firebaseConnection";

import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

import { LinkProps } from "../Admin";

interface SocialLinksProps {
  instagram: string;
  linkedin: string;
}

const Home = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    const loadLinks = () => {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
        const list = [] as LinkProps[];

        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            bg: doc.data().bg,
            color: doc.data().color,
            name: doc.data().name,
            url: doc.data().url,
          });
        });

        setLinks(list);
      });
    };

    loadLinks();
  }, []);

  useEffect(() => {
    const loadSocialLinks = () => {
      const docRef = doc(db, "social", "links");
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setSocialLinks({
              instagram: snapshot.data()?.instagram,
              linkedin: snapshot.data()?.linkedin,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    loadSocialLinks();
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className=" md:text-4xl text-3xl font-bold text-white mt-20">
        Gabriel Costa Toledo
      </h1>

      <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

      <main className="flex flex-col w-11/12 max-w-xl text-center">
        {links.map((link) => (
          <section
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform duration-200 hover:scale-105 cursor-pointer"
            style={{ backgroundColor: link.bg }}
          >
            <a href={link.url} target="_blank">
              <p className="text-base md:text-lg" style={{ color: link.color }}>
                {link.name}
              </p>
            </a>
          </section>
        ))}

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>

            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
};

export default Home;
