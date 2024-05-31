import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const ModalBook = ({ children, book }) => {
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
            <Select name="status" defaultValue={book.status}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="à lire">📚 A lire</SelectItem>
                <SelectItem value="en cours de lecture">📖 En cours</SelectItem>
                <SelectItem value="fini">✅ Fini</SelectItem>
              </SelectContent>
            </Select>
            <p>
              <strong>Auteur:</strong> {book.author}
            </p>
            <p>
              <strong>Nombre de Pages:</strong> {book.numberOfPages}
            </p>
            <h3 className="font-bold">Description</h3>
            <ScrollArea className="h-36">
              <p>{book.description}</p>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
