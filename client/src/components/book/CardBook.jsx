import Book from "../../assets/book.jpg";
export const CardBook = () => {
  return (
    <div className="w-24 rounded-md">
      <img className="w-full object-cover rounded-md" src={Book} alt="book" />
    </div>
  );
};
