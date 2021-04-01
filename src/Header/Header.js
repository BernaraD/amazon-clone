import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from "react-router-dom";
import {useStateValue} from "../StateProvider/StateProvider";
import {auth} from '../firebase/firebase'


function Header() {

    const [{basket, user}, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }


    return (
        <div className="header">
            <Link to="/" className="link__style">
                <img className="header__logo"
                     src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"
                />
            </Link>


            <div className="header__search">
                <input type="text" className="header__searchInput"/>
                <SearchIcon className="header__searchIcon"/>
                {/*Logo*/}
            </div>


            <div className="header__nav">
                <Link to={!user && "/login"} className="link__style">
                    <div onClick={handleAuthentication}
                         className="header__option">
                        <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
                        <span className="header__optionLineTwo">{user ? "Sign out" : "Sign In"}</span>
                    </div>
                </Link>

                <Link to={'/orders'} className="link__style">
                    <div className="header__option">
                         <span className="header__optionLineOne">
                       Returns
                   </span>
                        <span className="header__optionLineTwo">
                      & Orders
                   </span>
                    </div>
                </Link>

                <div className="header__option">
                   <span className="header__optionLineOne">
                      Your
                   </span>
                    <span className="header__optionLineTwo">
                      Prime
                   </span>
                </div>

                <Link to="/checkout" className="link__style">
                    <div className="header__optionBasket">
                        <ShoppingCartIcon/>
                        <span className="header__optionLineTwo header__basketCount">
                            {basket?.length}
                        </span>
                    </div>
                </Link>


            </div>

        </div>
    )
}

export default Header;

