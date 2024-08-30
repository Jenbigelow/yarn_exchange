<h1>Yarn Stash Exchange</h1>

<p>Yarn Stash Exchange is a secondhand marketplace that uses data from Ravelry, the most popular knitting and crocheting website, to gather yarns that Ravelry users want to sell. Ravelry’s stash feature allows users to track their yarns, but when they want to sell, they can only tag the yarn as “will trade or sell” and the price is hidden in the notes component. By using Ravelry’s API, the relevant pricing data is extracted using a custom search algorithm. The webapp allows users to filter the yarns by price and yarn weight and uses React for a fast and responsive user experience. Users can find yarns that fit their needs quickly, and find out all yarns available for sale by a seller and the sellers location. By signing in, the user can store favorited yarns, which show up on a convenient list on the user’s favorites page.</p>
<h2>Contents</h2>

<ul>
<li><a href="#tech-stack">Tech Stack</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#installation">Installation</a></li>
<li><a href="#future-work">Future Work</a></li>
<li><a href="#about-me">About me</a></li>
</ul>
<h2>Tech Stack</h2>

<ul>
<li>PostgreSQL</li>
<li>SQLAlchemy</li>
<li>SQLAlchemy</li>
<li>Flask</li>
<li>AJAX</li>
<li>React</li>
<li>React-Bootstrap</li>
<li>JavaScript</li>
<li>Python</li>
<li>CSS</li>
<li>Ravelry API </li>
</ul>
<a href=https://dbdiagram.io/d/Yarn-Stash-Exchange-MVP-667b87599939893dae45a90c>Data Model for App </a>

<h2>Features</h2>
<p>Users can see yarns for sale from Ravelry</p>
<img src = screenshots/yarn_page.png alt="Yarn Page"/>
<p>Users can sort by yarn weight and price</p>
<img src = screenshots/filter_by_weight.png alt="Filter By Yarn Weight"/>
<img src = screenshots/sort_by_price.png alt="Sort by Price"/>
<p>Users can favorite yarns they are interested once the login. The login uses a useContext hook to keep users logged in on the frontend without multiple queries to the back, and allows features like navbars to update in response to user login state.</p>
<img src = screenshots/login.png alt="Login"/>
<img src = screenshots/favorites.png alt="Favorites"/>
<p>The main yarn page changes upon user login, using useContext to show a like button dependent on the current state of user's favorites.</p>
<img src = screenshots/yarn_page_after_login.png alt="Yarn Page After Login"/>
<p>Individual yarn pages retain the like or unlike button.</p>
<img src = screenshots/individual_yarn.png alt="Individual Yarn Not Yet Liked"/>
<img src = screenshots/individual_yarn_already_liked.png alt="Individual Yarn Already Liked"/>
<p>Seller pages give all the yarn by a particular seller along with general location.</p>
<img src = screenshots/seller_page.png alt="Seller Page"/>

<h2>Installation</h2>
To run Yarn Stash Exchange locally:
Install Python 3.9.6
Install PostgreSQL
Install Vite

Clone the repo:
```
https://github.com/Jenbigelow/yarn_exchange.git
```
Create a virtual environment:
```
virtualenv env
source env/bin/activate
```
Install the requirements file:
```
pip3 install -r requirements.txt
```
Sign up for <a href=https://www.ravelry.com/api>Ravelry API</a>

Save your API keys to a secrets.sh file in this format:
```
export R_USERNAME="YOUR_USERNAME_HERE"
export R_PASSWORD="YOUR_PASSWORD_HERE"
```
Source the secrets:
```
source secrets.sh
```
Setup the initial databases:
```
python3 api.py
```
Run both the frontend and the backend:
```
python3 server.py
npm run dev
``


<h2>Future Work</h2>
<ul>
<li>Set up so that yarns are continually updated from Ravelry</li>
<li>More filters for sorting yarn by fiber, original yarn company, dye lot, color</li>
<li>Connect to Ravelry with OAuth 2.0 API</li>
<li>Allow users to add yarns and create bundles</li>
</ul>

<h2>About Me</h2>
<p> Jen Bigelow created Yarn Stash Exchange - for more information, connect on <a href =https://www.linkedin.com/in/jen-bigelow>LinkedIn </a>

