import HeaderMenu from "./headerMenu";
import Logo from "./logo";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <div className="flex justify-end my-3 mr-20">
      {/* <div>
        <SearchBar />
      </div> */}
      <HeaderMenu />

    </div>
  )
}
