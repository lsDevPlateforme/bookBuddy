export const CardBook = ({ img }) => {
  return (
    <div className="w-24 rounded-md relative">
      <img className="w-full object-cover rounded-md" src={img} alt="book" />
    </div>
  );
};
