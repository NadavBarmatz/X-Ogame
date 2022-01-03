import Board from "../../GameArea/Board/Board";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<header><Header /></header>
            <main><Board /></main>
            <footer><Footer /></footer>
        </div>
    );
}

export default Layout;
