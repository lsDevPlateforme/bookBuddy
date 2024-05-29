import { CardBook } from "@/components/book/CardBook";
import { HeaderBook } from "@/components/book/HeaderBook";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/utils/auth";
import { client } from "@/utils/http";
import { useQuery } from "react-query";

export const MyBookPage = () => {
  const session = getSession();
  if (!session) {
    throw new Error("L'utilisateur n'est pas connecter");
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["myBook"],
    queryFn: () =>
      client("http://localhost:8000/api/books", { session: session }),
    staleTime: Infinity, // 1 minute
    cacheTime: Infinity, // 5 minutes
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>No data available</span>;
  }

  return (
    <>
      <HeaderBook />
      <h2 className="text-lg">Livre en cours:</h2>
      <Separator />
      <div className="flex gap-4 flex-wrap">
        {data.map((book) => {
          if (book.status === "en cours de lecture") {
            return <CardBook key={book._id} img={book.image} />;
          }
        })}
      </div>
      <h2 className="text-lg mt-4">Tous mes livres:</h2>
      <Separator />
      <div className="flex gap-4 flex-wrap">
        {data.map((book) => (
          <CardBook key={book._id} img={book.image} />
        ))}
      </div>
    </>
  );
};
