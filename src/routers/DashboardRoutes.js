import { Redirect, Route, Switch } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { HeroPage } from "../components/heroes/HeroPage";
import { MarvelPage } from "../components/marvel/MarvelPage";
import { DcPage } from "../components/dc/DcPage";
import { SearchPage } from "../components/search/SearchPage";

export const DashboardRoutes = () => {

    return (
        <div>
            <Navbar />

            <div className="container mt-3">
                <Switch>
                    <Route exact path="/marvel">
                        <MarvelPage />
                    </Route>
                    <Route exact path="/dc">
                        <DcPage />
                    </Route>
                    <Route exact path="/hero/:heroId">
                        <HeroPage />
                    </Route>
                    <Route exact path="/search">
                        <SearchPage />
                    </Route>

                    <Redirect to="/marvel" />
                </Switch>
            </div>
        </div>
    );

};
