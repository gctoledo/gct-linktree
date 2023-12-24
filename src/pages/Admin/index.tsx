import { FormEvent, useState, useEffect } from "react";

import Header from "../../components/Header";
import Input from "../../components/Input";

import { FiTrash } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

const Admin = () => {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  const [links, setLinks] = useState<LinkProps[]>([]);

  const [updating, setUpdating] = useState(false);
  const [updatingID, setUpdatingID] = useState("");

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const list: LinkProps[] = [];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(list);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos");
      return;
    }

    if (updating) {
      const docRef = doc(db, "links", updatingID);

      updateDoc(docRef, {
        name: nameInput,
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
      })
        .then(() => {
          console.log("Atualizado com sucesso");
          setNameInput("");
          setUrlInput("");
          setUpdating(false);
          setUpdatingID("");
        })
        .catch((e) => {
          console.log("ERRO AO ATUALIZAR: " + e);
        });
    } else {
      addDoc(collection(db, "links"), {
        name: nameInput,
        url: urlInput,
        bg: backgroundColorInput,
        color: textColorInput,
        created: new Date(),
      })
        .then(() => {
          console.log("Cadastrado com sucesso");
          setNameInput("");
          setUrlInput("");
        })
        .catch((e) => {
          console.log("ERRO AO CADASTRAR: " + e);
        });
    }
  };

  const deleteLink = async (id: string) => {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  };

  const editLink = (link: LinkProps) => {
    setNameInput(link.name);
    setUrlInput(link.url);
    setTextColorInput(link.color);
    setBackgroundColorInput(link.bg);
    setUpdating(true);
    setUpdatingID(link.id);
  };

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do link</label>
        <Input
          placeholder="Digite o nome do link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">URL do link</label>
        <Input
          type="url"
          placeholder="Digite a URL do link"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className="flex my-4 gap-5">
          <div className="flex gap-4">
            <label className="text-white font-medium mt-2 mb-2">
              Fundo do link
            </label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
              className="rounded"
            />
          </div>
          <div className="flex gap-4">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
              className="rounded"
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-2">
              Pré-visualização:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}

        <button
          type="submit"
          className={`${
            updating ? "bg-green-600" : "bg-blue-600"
          } h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7`}
        >
          {updating ? "Atualizar" : "Cadastrar"}
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map((link) => (
        <article
          key={link.id}
          className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
          style={{ backgroundColor: link.bg, color: link.color }}
        >
          <p>{link.name}</p>
          <div className="flex gap-2">
            <button
              className="border border-dashed p-1 rounded bg-neutral-800"
              onClick={() => editLink(link)}
            >
              <MdEdit size={18} color="#fff" />
            </button>
            <button
              className="border border-dashed p-1 rounded bg-neutral-800"
              onClick={() => deleteLink(link.id)}
            >
              <FiTrash size={18} color="#fff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Admin;
