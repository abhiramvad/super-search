// src/components/ResultsView.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { CSSTransition } from 'react-transition-group';

interface ResultProps {
    data: any[];
}

const ResultsView: React.FC<ResultProps> = ({ data }) => {
    return (
        <div className="results-view">
            {data.length > 0 ? (
                data.map((item: any) => (
                    <CSSTransition key={item._id} timeout={500} classNames="results-view">
                        <Card className="result-card">
                            <CardContent>
                                <Typography variant="body1" component="div">
                                    {item.content}
                                </Typography>

                                <Typography variant="body2" component="div">
                                    <a href={item.URL}>{item.URL}</a>
                                </Typography>
                            </CardContent>
                        </Card>
                    </CSSTransition>
                ))
            ) : (
                <>
                    <Skeleton height={80} count={5} />
                    <Skeleton height={80} count={5} />
                </>
            )}
        </div>
    );
};

export default ResultsView;
