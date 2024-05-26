import { client } from "@/utils/http";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const ModalAddBook = () => {
  const [results, setResults] = useState([]);
  const [autocoplite, setAutocoplite] = useState(false);
  const [value, setValue] = useState({
    title: "",
    description: "",
    imageLinks: "https://fakeimg.pl/100x200",
  });

  const handleClickAutocomplite = (infoBook) => {
    setValue({
      title: infoBook.title,
      description: infoBook.description,
      imageLinks:
        infoBook?.imageLinks?.smallThumbnail || "https://fakeimg.pl/100x200",
    });
  };

  const handleAutocomplite = (state) => {
    if (state) {
      setAutocoplite(true);
    } else {
      setTimeout(() => {
        setAutocoplite(false);
      }, 500);
    }
  };

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setValue({ ...value, title: query });
    if (query.length > 2) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&maxResults=5&key=AIzaSyAmJjDBjk107C8ol7r8VDvgTsdkOitLJA0`;
      try {
        const data = await client(url);
        console.log(data.items[0].volumeInfo);
        setResults(data.items || []);
      } catch (e) {
        console.error(e);
      }
    } else {
      setResults([]);
    }
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
          <Form>
            <div className="relative">
              <Label>Titre du livre</Label>
              <Input
                type="text"
                value={value.title}
                onChange={handleInputChange}
                onFocus={() => handleAutocomplite(true)}
                onBlur={() => handleAutocomplite(false)}
              />
              {autocoplite && results.length > 0 && (
                <div className="cursor-pointer absolute bg-white border border-gray-300 mt-2 w-full z-10">
                  {results.map((book) => {
                    let imgSrc = "";
                    if (!book.volumeInfo?.imageLinks?.smallThumbnail) {
                      imgSrc = "https://fakeimg.pl/20x50";
                    } else {
                      imgSrc = book.volumeInfo?.imageLinks?.smallThumbnail;
                    }
                    return (
                      <div
                        className="flex justify-between p-2  hover:bg-primary"
                        key={book.id}
                        onClick={() => handleClickAutocomplite(book.volumeInfo)}
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
                <Button>Change Avatar</Button>
                <p className="mt-2 text-sm">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            <div>
              <Label>Description:</Label>
              <Textarea defaultValue={value.description} rows="6" />
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
