import { FormEvent, useEffect, useState } from "react";

import Header from "../../components/Header";
import Input from "../../components/Input";

import { db } from "../../services/firebaseConnection";

import { setDoc, doc, getDoc } from "firebase/firestore";

const Networks = () => {
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "links");

      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.data() !== undefined) {
            setInstagram(snapshot.data()?.instagram);
            setLinkedin(snapshot.data()?.linkedin);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    loadLinks();
  }, []);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    setDoc(doc(db, "social", "links"), {
      instagram: instagram,
      linkedin: linkedin,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO");
      })
      .catch((e): void => {
        console.log(e);
      });
  };

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas redes sociais
      </h1>

      <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
        <label className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          placeholder="Digite a url do Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">
          Link do Linkedin
        </label>
        <Input
          placeholder="Digite a url do Linkedin"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button
          type="submit"
          className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium w-full max-w-xl"
        >
          Salvar links
        </button>
      </form>
    </div>
  );
};

export default Networks;
