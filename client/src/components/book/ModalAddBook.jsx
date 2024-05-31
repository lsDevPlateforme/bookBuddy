import { getSession } from "@/utils/auth";
import { client } from "@/utils/http";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export const ModalAddBook = () => {
  const session = getSession();
  if (!session) {
    throw new Error("L'utilisateur n'est pas connecter");
  }
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newBook) =>
      client("http://localhost:8000/api/addBook", {
        data: newBook,
        method: "POST",
        session: session,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries("myBook");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const [results, setResults] = useState([]);
  const [autocoplite, setAutocoplite] = useState(false);
  const [value, setValue] = useState({
    title: "",
    description: "",
    imageLinks: "https://fakeimg.pl/100x200",
    pageCount: 1,
    authors: [],
    categories: [],
  });

  const handleClickAutocomplite = (infoBook) => {
    setValue({
      title: infoBook.title,
      description: infoBook.description,
      imageLinks:
        infoBook?.imageLinks?.smallThumbnail || "https://fakeimg.pl/100x200",
      pageCount: Number(infoBook.pageCount),
      authors: infoBook.authors,
      categories: infoBook.categories,
    });
  };

  const handleAutocomplite = (state) => {
    if (state) {
      setAutocoplite(true);
    } else {
      setTimeout(() => {
        setAutocoplite(false);
      }, 200);
    }
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setValue({ ...value, title: query });
    if (query.length > 2) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=5&key=AIzaSyAmJjDBjk107C8ol7r8VDvgTsdkOitLJA0`;
      try {
        const data = await client(url);
        setResults(data.items || []);
      } catch (e) {
        console.error(e);
      }
    } else {
      setResults([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataForm = new FormData(e.target);
    const newBook = {
      title: dataForm.get("title"),
      author: dataForm.get("author"),
      image: value.imageLinks,
      description: dataForm.get("description"),
      status: dataForm.get("status"),
      numberOfPages: dataForm.get("pages"),
      category: dataForm.get("category"),
    };
    mutation.mutate(newBook);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className={buttonVariants({ variant: "default" })}>
          Ajouter un livre
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau livre</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Label>Titre du livre</Label>
              <Input
                type="text"
                name="title"
                value={value.title}
                onChange={handleInputChange}
                onFocus={() => handleAutocomplite(true)}
                onBlur={() => handleAutocomplite(false)}
              />
              {autocoplite && results.length > 0 && (
                <div className="rounded-b-md cursor-pointer absolute bg-background border border-gray-300 w-full z-10">
                  {results.length >= 0 &&
                    results.map((book) => {
                      let imgSrc = "";
                      if (!book.volumeInfo?.imageLinks?.smallThumbnail) {
                        imgSrc = "https://fakeimg.pl/20x50";
                      } else {
                        imgSrc = book.volumeInfo?.imageLinks?.smallThumbnail;
                      }
                      return (
                        <div
                          className="flex justify-between items-center p-2  hover:bg-primary"
                          key={book.id}
                          onClick={() =>
                            handleClickAutocomplite(book.volumeInfo)
                          }
                        >
                          <p>{book.volumeInfo.title}</p>
                          <Avatar className="h-10 w-10 rounded-lg">
                            <AvatarImage src={imgSrc} />
                            <AvatarFallback>
                              {book.volumeInfo.title[0]}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="col-span-full flex items-center gap-8 mt-4">
              <Avatar className="w-24 h-32 rounded-lg">
                <AvatarImage src={value.imageLinks} />
                <AvatarFallback>{value.title[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Input
                  name="img"
                  className={buttonVariants({ variant: "default" })}
                  type="file"
                />
                <p className="mt-2 text-sm">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            <ScrollArea className="h-[300px] p-4 rounded-md border">
              <div>
                <Label>Categorie:</Label>
                <Input
                  name="category"
                  defaultValue={value.categories.join(", ")}
                />
              </div>
              <div>
                <Label>Auteur:</Label>
                <Input name="author" defaultValue={value.authors.join(", ")} />
              </div>
              <div>
                <Label>Description:</Label>
                <Textarea
                  name="description"
                  defaultValue={value.description}
                  rows="6"
                />
              </div>
              <div>
                <Label>Nombre de pages:</Label>
                <Input
                  name="pages"
                  type="number"
                  value={value.pageCount}
                  onChange={(e) =>
                    setValue({ ...value, pageCount: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label>Etat:</Label>
                <Select name="status" defaultValue="fini">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="à lire">📚 A lire</SelectItem>
                    <SelectItem value="en cours de lecture">
                      📖 En cours
                    </SelectItem>
                    <SelectItem value="fini">✅ Fini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ScrollArea>
            <Button>Ajouter</Button>
            {mutation.isSuccess ? <p>Livre ajouté !</p> : null}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
