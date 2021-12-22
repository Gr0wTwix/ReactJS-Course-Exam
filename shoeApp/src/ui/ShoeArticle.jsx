import React, {useState} from 'react';

import { Card, CardMedia, CardContent, Typography, CardActions, Button, Collapse } from '@material-ui/core';

const ShoeArticle = (props) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <Card sx={{ maxWidht: 345 }} style={{ width: '345px', marginRight: '3rem', marginBottom: '2rem'}}>
            <CardMedia
                component="img"
                height="140"
                image={props.image}
                alt={props.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" to='/' >Share</Button>
                <Button size="small" onClick={() => setExpanded(prev => !prev)}>Actions</Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Button>Delete</Button>
                <Button>Edit</Button>
            </Collapse>
        </Card>
    )
}

export default ShoeArticle;