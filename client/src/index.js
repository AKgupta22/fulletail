import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Component/App'
import CartContextProvider from './Store/CartContextProvider'
import WishlistContextProvider from './Store/WishlistContextProvider'
import CheckoutContext from './Store/CheckoutContextProvider'
import MainCategoryContext from './Store/MainCategoryContext'
import SubCategoryContext from './Store/SubCategoryContext'
import BrandContext from './Store/BrandContext'
import ProductContextProvider from './Store/ProductContextProvider'
import UserContextProvider from './Store/UserContextProvider'
import ContactContextProvider from './Store/ContactContextProvider'
let root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

    <>
        <CartContextProvider>
            <WishlistContextProvider>
                <CheckoutContext>
                    <MainCategoryContext>
                        <SubCategoryContext>
                            <BrandContext>
                                <ProductContextProvider>
                                    <UserContextProvider>
                                        < ContactContextProvider>
                                            <App />
                                        </ContactContextProvider>
                                    </UserContextProvider>
                                </ProductContextProvider>

                            </BrandContext>
                        </SubCategoryContext>
                    </MainCategoryContext>
                </CheckoutContext>
            </WishlistContextProvider>
        </CartContextProvider>

    </>


)