import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ICardArticle {
    path: string;
    articleData: IData;
}

interface IData {
    thumbnailUrl: string;
    mainTitle: string;
    author: string;
    description: string;
    date: string;
}

function CardArticle({ path, articleData }: ICardArticle) {
    const { thumbnailUrl, mainTitle, author, description, date } = articleData;

    return (
        <Link href={path}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={thumbnailUrl}
                    title="thumbnail"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {mainTitle}
                    </Typography>
                    <Typography
                        variant="body2"
                        paragraph
                        color="text.secondary"
                    >
                        {description}
                    </Typography>
                    <Typography variant="body2" color="#999">
                        {author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {date}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
}

export default CardArticle;
