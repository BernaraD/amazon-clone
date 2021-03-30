import React from 'react';
import './Home.css'
import Product from "../Products/Product";


function Home() {
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image"
                     src="https://images-na.ssl-images-amazon.com/images/G/01/US-hq/2021/img/Events/Easter/Homepage/T3_2021_Easter_GW_HomepageHero_Desktop_Party_1x_1500x600._CB658924860_.jpg"
                     alt="amazon-banner"
                />

                <div className="home__row">
                    <Product id="12321341"
                             title="Brother Compact Monochrome Laser Printer, HLL2390DW"
                             price={29.99}
                             image="https://m.media-amazon.com/images/I/41f68gHsN+L._AC_SY200_.jpg"
                             rating={5}
                    />
                    <Product id="49538094"
                             title="Samsung Galaxy Buds Live, True Wireless Earbuds"
                             price={139.99}
                             image="https://images-na.ssl-images-amazon.com/images/I/71LcAql4%2BaL._AC_SL1500_.jpg"
                             rating={5}
                    />
                    <Product id="4903850"
                             title="New Apple iPhone 12 Pro Max (128GB, Graphite)"
                             price={1154.00}
                             image="https://m.media-amazon.com/images/I/71XXJC7V8tL._FMwebp__.jpg"
                             rating={4}
                    />

                </div>

                <div className="home__row">
                    <Product id="23445930"
                             title="Women’s Button Down Cardigan Sweaters Open Front Cable Knit"
                             price={31.99}
                             image="https://images-na.ssl-images-amazon.com/images/I/51PzX5bdYML._SX160_QL100_AC_SCLZZZZZZZ_.jpg"
                             rating={4}/>
                    <Product id="5568841"
                             title="All-new Echo Dot (4th Gen, 2020 release) | Smart speaker with Alexa | Charcoal"
                             price={49.99}
                             image="https://images-na.ssl-images-amazon.com/images/I/714Rq4k05UL._AC_SL1000_.jpg"
                             rating={5}/>
                    <Product id="62355854"
                             title="New Apple iPad (10.2-inch, Wi-Fi, 32GB) - Gold (Latest Model, 8th Generation)"
                             price={329.00}
                             image="https://images-na.ssl-images-amazon.com/images/I/71xP2cB-HjL._AC_SL1500_.jpg"
                             rating={4}/>
                </div>

                <div className="home__row">
                    <Product id="758686"
                             title="HP VH240a 23.8-Inch Full HD 1080p IPS LED Monitor with Built-In Speakers and VESA Mounting, Rotating Portrait & Landscape, Tilt, and HDMI"
                             price={124.00}
                             image="https://images-na.ssl-images-amazon.com/images/I/71trhuzbhML._AC_SL1500_.jpg"
                             rating={4}/>
                </div>

            </div>
        </div>
    )
}

export default Home;