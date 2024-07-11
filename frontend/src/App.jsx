import { useEffect, useState } from 'react'
import './App.css'
import ReactRouterDOM

function AllYarnsPage(props) {
  const { yarns , favoritingYarn} = props;
  const yarnCards = [];

  for (const yarn of Object.values(yarns)) {
    const yarnCard = (
      <yarnCard
        yarnName= {yarn.yarn_name}
        yarnPrice={yarn.yarn_price}
        yarnPhoto={yarn.yarn_photo}
        yarnFavorite = {favoritingYarn}

      />
    );

    yarnCards.push(yarnCard);
    

  }
  return (
    <React.Fragment>
      <h1>All Yarns</h1>
      <div id="shopping">
        <div className="col-12 col-md-9 d-flex flex-wrap">{yarnCards}</div>
      </div>
    </React.Fragment>
  );
}

function YarnCard(props) {
  const { id, name, photo, price, favoritingYarn } = props;

  return (
    <div className="card yarn-card">
        <img src={photo} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
      <div className="card-body pt-0 container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <span className="lead price d-inline-block">${price.toFixed(2)}</span>
          </div>
          <div className="col-12 col-lg-6">
            <button
              type="button"
              className="btn btn-sm btn-success d-inline-block"
              onClick={() => favoritingYarn(code)}
            >
              Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [yarns, setYarn] = useState({})
  useEffect(() =>
    fetch("/api/yarns")
      .then((response) => response.json())
      .then((yarnData) => {
        setYarn(yarnData.yarns);
      })
);

  return (    <ReactRouterDOM.BrowserRouter>
    <Navbar logo="/src/assets/react.svg" />
    <div className="container-fluid">
      <ReactRouterDOM.Route exact path="/">
        <Homepage />
      </ReactRouterDOM.Route>
      <ReactRouterDOM.Route exact path="/yarns">
        <AllYarnsPage yarns={yarns} />
      </ReactRouterDOM.Route>

    </div>
  </ReactRouterDOM.BrowserRouter> );

}

export default App
