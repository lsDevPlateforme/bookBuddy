import { CardBook } from "@/components/book/CardBook";
import { HeaderBook } from "@/components/book/HeaderBook";
import { Separator } from "@/components/ui/separator";

export const MyBookPage = () => {
  return (
    <>
      <HeaderBook />
      <h2 className="text-lg">Livre en cours:</h2>
      <Separator />
      <CardBook />
      <h2 className="text-lg mt-4">Tous mes livres:</h2>
      <Separator />
      <CardBook />
    </>
  );
};
