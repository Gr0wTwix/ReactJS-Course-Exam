import React, { useEffect } from 'react';

import { Button, ButtonGroup, Card, CardMedia, CardContent, Typography, CardActions, Grid } from '@material-ui/core';
import ShoesLogic from '../components/ShoesLogic';

import ShoeArticle from '../ui/ShoeArticle';

const Shoes = (props) => {
    const { 
        setSortingAsc, 
        setSortingDesc, 
        shoes,
        isLoading,
        isInitialLoad
    } = ShoesLogic();

    if (isLoading || isInitialLoad) {
        return <h1 style={{ textAlign: 'center', fontSize: '2vw'}}>Loading...</h1>
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
            <ButtonGroup style={{ margin: '2rem 0'}} variant="outlined" color="primary" aria-label="outlined button group">
                <Button color="primary" onClick={setSortingAsc}>Asc</Button>
                <Button color="primary" onClick={setSortingDesc}>Desc</Button>
            </ButtonGroup>
            <Grid container spacing={1} style={{padding: '0 5rem'}}>
                {shoes.data?.map(shoe => (
                    <Grid item xs={4}>
                        <ShoeArticle
                            key={shoe.id}
                            title={shoe.title}
                            description={shoe.description}
                            image={shoe.image} 
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Shoes;