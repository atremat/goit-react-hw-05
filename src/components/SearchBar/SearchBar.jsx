import css from "./SearchBar.module.css";

const SearchBar = ({ value, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputQuery = e.target.elements.query.value;
    if (inputQuery === "") {
      return;
    }
    onSubmit(inputQuery);
    e.target.reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          name="query"
          type="text"
          defaultValue={value}
          autoFocus
          placeholder="Search movie"
        />
        <button type="submit" className={css.submitBtn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
