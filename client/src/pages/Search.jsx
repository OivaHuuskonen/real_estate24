import SearchForm from "../components/forms/SearchForm";
import { useSearch } from "../context/search";
import AdCard from "../components/cards/AdCard";

export default function Search() {
  const [search, setSearch] = useSearch();

  return (
    <div className='w-full pb-10'>
      <div className="flex justify-center py-10">
      <SearchForm />
      </div>
      <div name="seacrh">
        <div className="row">
          {search.results?.length > 0 ? (
            <div className="col-md-12 text-center p-5">
              Found {search.results?.length} results
            </div>
          ) : (
            <div className="col-md-12 text-center p-5">No properties found yet</div>
          )}
        </div>

        {/*<div className="row">
          {search.results?.map((item) => (
            <AdCard ad={item} key={item._id} />
          ))}
        </div>*/}

        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-0 gap-y-10 place-items-center px-20 py-10 bg-[#F5F5F5]">
          {search.results?.map((item, index) => (
            <AdCard 
              ad={item} 
              key={item._id} 
              className={index % 3 === 0 ? 'justify-self-end' :
                         index % 3 === 1 ? '' :
                         'justify-self-start'}
              />
          ))}
        </div>

      </div>
    </div>

  );
}