import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import pic from '../asset/images/noimage.png'
import { UserContext } from '../Store/UserContextProvider';
const pages = ['Home', 'Shop', 'Contact'];
const settings = ['Profile', 'Cart', 'Logout', 'LogoutAll'];
const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let navigate = useNavigate()
    const { UserLogoutAll, UserLogout, getOneuser } = useContext(UserContext)
    const [user, setuser] = useState({})
    async function Logout() {
        let item = {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token")
        }
        let response = await UserLogout(item)
        if (response.result === "Done") {
            localStorage.clear()
            navigate("/Login")
        }
        else
            alert(response.message)


    }

    async function LogoutAll() {
        let item = {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("token")
        }
        let response = await UserLogoutAll(item)
        if (response.result === "Done") {
            localStorage.clear()
            navigate("/Login")
        }
        else
            alert(response.message)
    }

    let Getapidata = async () => {
        let response = await getOneuser()
        setuser(response.data)
    }
    const userchange = localStorage.getItem("username")
    useEffect(() => {
        if (localStorage.getItem("username"))
            Getapidata()
    }, [userchange])

    return (
        <>
            <AppBar position="static" className="bgcol">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            className="link"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            EtailCom

                        </Typography>



                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (

                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography
                                            textAlign="center"
                                            component={Link}
                                            className="Link"
                                            to={page === "Home" ? "/" : page === "Shop" ? "Shop/All/All/All/None" : `/${page}`}
                                        >
                                            {page}

                                        </Typography>
                                    </MenuItem>

                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            className="link"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >


                            EtailCom
                        </Typography>



                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    component={Link}
                                    to={page === "Home" ? "/" : page === "Shop" ? "Shop/All/All/All/None" : `/${page}`}
                                    className="link"
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>

                            ))}
                        </Box>

                        {localStorage.getItem("login") ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="User" src={user?.profile ? `/public/upload/product/${user?.profile}` : pic} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu} >

                                            <Typography

                                                textAlign="center"
                                                onClick={() => {
                                                    if (setting === "Logout")
                                                        Logout()
                                                    else if
                                                        (setting === "LogoutAll")
                                                        LogoutAll()
                                                    else
                                                        navigate(`/${setting}`)
                                                }}
                                            >
                                                {
                                                    setting === "Cart" ?

                                                        <IconButton aria-label="cart">
                                                            <ShoppingCartIcon />
                                                        </IconButton> :
                                                        setting

                                                }
                                            </Typography>



                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box> : <Button style={{ margin: "0px 10px" }}><Link to="/Login" style={{ color: "white", textDecoration: "none" }}> Login </Link></Button>}
                    </Toolbar>
                </Container>
            </AppBar>



        </>
    );
};
export default Navbar;
