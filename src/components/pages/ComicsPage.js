import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
// import SingleComic from "../singleComic/SingleComic";

const ComicsPage = () => {
    // const [selectedComics, setSelectedComics] = useState(109205);

    // const onComicsSelected = (id) => {
    //     setSelectedComics(id);
    // }

    return (
        <>
            <AppBanner />
            {/* <ComicsList onComicsSelected={onComicsSelected}/> */}
            <ComicsList />
            {/* <SingleComic comicsId={selectedComics}/> */}

        </>
    );
}

export default ComicsPage;