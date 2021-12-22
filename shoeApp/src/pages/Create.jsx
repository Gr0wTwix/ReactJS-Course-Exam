import React from 'react';

import {  Typography, Grid, TextField, CardContent, Card, Button } from '@material-ui/core';
import CreateLogic from '../components/CreateLogic';

const Create = (props) => {
    const { 
        createState, 
        onCreateSubmitHandler, 
        createInputChangeHandler,
        isLoading
    } = CreateLogic();

    return (
        <div> 
          <Grid>
            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "2rem auto" }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                Create New Shoe Article
              </Typography> 
                <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                  Fill up the form and our customers will be able to see your article.
              </Typography> 
                <form onSubmit={onCreateSubmitHandler} style={{ overflow: 'hidden'}}>
                  <Grid container spacing={1}>
                    <Grid xs={12} item>
                      <TextField 
                        placeholder="Enter shoe title" 
                        label="Shoe title" 
                        variant="outlined"
                        name="title"
                        fullWidth 
                        required
                        onChange={createInputChangeHandler}
                        value={createState.title.value}
                      />
                    </Grid>
                    <Grid xs={12} item>
                      <TextField 
                        placeholder="Enter shoe image" 
                        label="Shoe Image" 
                        variant="outlined"
                        name="image"
                        fullWidth 
                        required
                        onChange={createInputChangeHandler}
                        value={createState.image.value}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        type="number" 
                        placeholder="Enter shoe price" 
                        label="Shoe price" 
                        variant="outlined"
                        name="price"
                        fullWidth 
                        required
                        onChange={createInputChangeHandler}
                        value={createState.price.value}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        label="Shoe Description"
                        multiline 
                        rows={4} 
                        placeholder="Shoe description" 
                        variant="outlined"
                        name="description"
                        fullWidth 
                        required
                        onChange={createInputChangeHandler}
                        value={createState.description.value}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary" fullWidth>{isLoading ? 'Fetching...' : 'Submit'}</Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </div>
    );
}

export default Create;