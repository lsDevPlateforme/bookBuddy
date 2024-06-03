import { getSession } from "@/utils/auth";
import { client } from "@/utils/http";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const ModalBook = ({ children, book }) => {
  const session = getSession();
  if (!session) {
    throw new Error("L'utilisateur n'est pas connecter");
  }
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newBook) =>
      client(`http://localhost:8000/api/book/${book._id}`, {
        data: newBook,
        method: "PUT",
        session: session,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries("myBook");
    },
  });
  const [currentPage, setCurrentPage] = useState(book.currentPage);
  const [favorite, setFavorite] = useState(book.favorite);

  const handleClickCurrentPage = (type) => {
    if (type === "+") {
      setCurrentPage((prev) => (prev < book.numberOfPages ? prev + 1 : prev));
    } else {
      setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    }
    mutation.mutate({ currentPage });
  };

  const handleInputChangeCurrentPage = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      value = 0;
    } else if (value > book.numberOfPages) {
      value = book.numberOfPages;
    }
    setCurrentPage(value);
    mutation.mutate({ currentPage: value });
  };

  const handleFavorite = (favorite) => {
    setFavorite(!favorite);
    mutation.mutate({ favorite: !favorite });
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{book.title}</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Avatar className="w-44 h-60 rounded-lg">
            <AvatarImage src={book.image} />
            <AvatarFallback>{book.title[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <Select name="status" defaultValue={book.status}>
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
              <Button onClick={() => handleFavorite(book.favorite)}>
                {favorite ? <StarFilledIcon /> : <StarIcon />}
              </Button>
            </div>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Nombre de Page:</strong> {book.numberOfPages}
            </p>
            <h3 className="font-bold">Description</h3>
            <ScrollArea className="h-36">
              <p>{book.description}</p>
            </ScrollArea>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <progress
            className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
            value={currentPage}
            max={Number(book.numberOfPages)}
          />
          <div className="flex gap-4 items-center">
            <Button onClick={() => handleClickCurrentPage("-")}>
              <Minus />
            </Button>
            <Input
              type="number"
              value={currentPage}
              className="border-none text-center"
              onChange={handleInputChangeCurrentPage}
              min="0"
              max={book.numberOfPages}
            />
            <Button onClick={() => handleClickCurrentPage("+")}>
              <Plus />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
