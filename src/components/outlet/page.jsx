import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Outlet, useNavigate} from 'react-router-dom'
import Navbar from '../navbar';
import Sidebar from '../sidebar';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import RightSidebar from '../rightSidebar';

const OutletPage = () => {
    const {isAuth} = useStoreState(state => state.auth)
    const navigate = useNavigate()

    const [isRes, setIsRes] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (window.innerWidth < 600) {
                setIsRes(true);
            } else if (window.innerWidth > 600) {
                setIsRes(false);
            }
        });

        if (window.innerWidth < 600) {
            setIsRes(true);
        } else if (window.innerWidth > 600) {
            setIsRes(false);
        }
    }, []);

    useEffect(() => {
        if(!isAuth) {
            navigate('/login')
        }
    }, [isAuth])
    return (
        <>
            <Navbar />
            <Container maxWidth="lg">
                <Grid container spacing={isRes ? 0 : 2}>
                    <Grid item lg={2} md={3} sm={4} xs={12}>
                        <Sidebar />
                    </Grid>

                    <Grid item lg={7} md={9} sm={8} xs={12}>
                        <Outlet />
                    </Grid>

                    <Grid item lg={3} xs={12}>
                        <RightSidebar />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default OutletPage